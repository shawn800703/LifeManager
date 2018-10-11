$(function(){
//出入允许拖拽节点的父容器，一般是ul外层的容器
    drag.init('body');
    });

//拖拽
var drag = {

    class_name : null,  //允许放置的容器
    permitDrag : false, //是否允许移动标识

    _x : 0,             //节点x坐标
    _y : 0,             //节点y坐标
    _left : 0,          //光标与节点坐标的距离
    _top : 0,           //光标与节点坐标的距离

    old_elm : null,     //拖拽原节点
    tmp_elm : null,     //跟随光标移动的临时节点
    new_elm : null,     //拖拽完成后添加的新节点

    //初始化
    init : function (className){

        //允许拖拽节点的父容器的classname
        drag.class_name = className;

        //监听鼠标按下事件，动态绑定要拖拽的节点（因为节点可能是动态添加的）
        $('.' + drag.class_name).on('mousedown', '.card', function(event){
            //当在允许拖拽的节点上监听到点击事件，将标识设置为可以拖拽
            drag.permitDrag = true;
            //获取到拖拽的原节点对象
            drag.old_elm = $(this);
            //执行开始拖拽的操作
            drag.mousedown(event);
            return false;
        });

        //监听鼠标移动
        $(document).mousemove(function(event){
            //判断拖拽标识是否为允许，否则不进行操作
            if(!drag.permitDrag) return false;
            //执行移动的操作
            drag.mousemove(event);
            return false;
        });

        //监听鼠标放开
    //   $(document).mouseup(function(event){
        $(document).on('mouseup', function(event){
        //判断拖拽标识是否为允许，否则不进行操作
        if(!drag.permitDrag) return false;
        //拖拽结束后恢复标识到初始状态
        drag.permitDrag = false;
        //执行拖拽结束后的操作
        drag.mouseup(event);
        return false;
        });
    },

    //按下鼠标 执行的操作
    mousedown : function (event){

    //1.克隆临时节点，跟随鼠标进行移动
    drag.tmp_elm = $(drag.old_elm).clone();

    //2.计算 节点 和 光标 的坐标
    drag._x = $(drag.old_elm).offset().left;
    drag._y = $(drag.old_elm).offset().top;

    var e = event || window.event;
    drag._left = e.pageX - drag._x;
    drag._top = e.pageY - drag._y;

    //3.修改克隆节点的坐标，实现跟随鼠标进行移动的效果
    $(drag.tmp_elm).css({
        'position' : 'fixed',
        'width':'392px',
        'left' : drag._x,
        'top' : drag._y,
        'background-color' : '#d2e9ff'
    });
    

    //4.添加临时节点
    tmp = $(drag.old_elm).parent().append(drag.tmp_elm);
    drag.tmp_elm = $(tmp).find(drag.tmp_elm);
    $(drag.tmp_elm).css('cursor', 'move');

    },

    //移动鼠标 执行的操作
    mousemove : function (event){

    //2.计算坐标
    var e = event || window.event;
    var x = e.pageX - drag._left;
    var y = e.pageY - drag._top;
    var maxL = $(document).width() - $(drag.old_elm).outerWidth();
    var maxT = $(document).height() - $(drag.old_elm).outerHeight();
    //不允许超出浏览器范围
    x = x < 0 ? 0: x;
    x = x > maxL ? maxL: x;
    y = y < 0 ? 0: y;
    y = y > maxT ? maxT: y;

    //3.修改克隆节点的坐标
    $(drag.tmp_elm).css({
        'left' : x,
        'top' : y,
    });

    //判断当前容器是否允许放置节点
    $.each($('.' + drag.class_name + ' .inBlock'), function(index, value){
        //获取容器的坐标范围 (区域)
        var box_x = $(value).offset().left;     //容器左上角x坐标
        var box_y = $(value).offset().top;      //容器左上角y坐标
        var box_width = $(value).outerWidth();  //容器宽
        var box_height = $(value).outerHeight();//容器高

        //给可以放置的容器加背景色
        if(e.pageX > box_x && e.pageX < box_x+box_width && e.pageY > box_y && e.pageY < box_y+box_height){
            
            //判断是否不在原来的容器下（使用坐标进行判断：x、y任意一个坐标不等于原坐标，则表示不是原来的容器）
            
            if($(value).offset().left !== drag.old_elm.offset().left 
                || $(value).offset().top !== drag.old_elm.offset().top){

                $(value).css('background-color', '#d0d0d0');
            }
        }else{
            //恢复容器原背景色
            $(value).css('background-color', '#dfe3e6');
        }

        });

    },

    //放开鼠标 执行的操作
    mouseup : function (event){
    //移除临时节点
    $(drag.tmp_elm).remove();

    //判断所在区域是否允许放置节点
    var e = event || window.event;

    $.each($('.' + drag.class_name + ' .inBlock'), function(index, value){
        //获取容器的坐标范围 (区域)
        var box_x = $(value).offset().left;     //容器左上角x坐标
        var box_y = $(value).offset().top;      //容器左上角y坐标
        var box_width = $(value).outerWidth();  //容器宽
        var box_height = $(value).outerHeight();//容器高

        //判断放开鼠标位置是否想允许放置的容器范围内
        if(e.pageX > box_x && e.pageX < box_x-0+box_width && e.pageY > box_y && e.pageY < box_y-0+box_height){
            
            //判断是否不在原来的容器下（使用坐标进行判断：x、y任意一个坐标不等于原坐标，则表示不是原来的容器）
            if($(value).offset().left !== drag.old_elm.parent().offset().left 
                || $(value).offset().top !== drag.old_elm.parent().offset().top){
                var st = $(value).attr('id')
                $.ajax({
                    type:'put',
                    url:'/api/memorf/'+drag.old_elm.attr('id').substring(4,)+'/',
                    data:{'memoState':st}
                }).done(function(datas){
                    var cb = $(drag.old_elm).parent('.cardblock')
                    $('#bc'+st).prepend(cb.clone())
                    cb.remove()
                    $(value).css('background-color', '#dfe3e6');
                    });

                }
            }

        });

    },

    };