$(document).ready(function () {
   
    date = { "s_date": "2000-01-01", "e_date": "9999-12-31" }
    colorList = ["#DDDDDD", "#AAAAAA", "#888888", "#666666", "#444444",
        "#FFB7DD", "#FF88C2", "#FF44AA", "#FF0088", "#C10066", "#A20055", "#8C0044",
        "#FFCCCC", "#FF8888", "#FF3333", "#FF0000", "#CC0000", "#AA0000", "#880000",
        "#FFC8B4", "#FFA488", "#FF7744", "#FF5511", "#E63F00", "#C63300", "#A42D00",
        "#FFDDAA", "#FFBB66", "#FFAA33", "#FF8800", "#EE7700", "#CC6600", "#BB5500",
        "#FFEE99", "#FFDD55", "#FFCC22", "#FFBB00", "#DDAA00", "#AA7700", "#886600",
        "#FFFFBB", "#FFFF77", "#FFFF33", "#FFFF00", "#EEEE00", "#BBBB00", "#888800",
        "#EEFFBB", "#DDFF77", "#CCFF33", "#BBFF00", "#99DD00", "#88AA00", "#668800",
        "#CCFF99", "#BBFF66", "#99FF33", "#77FF00", "#66DD00", "#55AA00", "#227700",
        "#99FF99", "#66FF66", "#33FF33", "#00FF00", "#00DD00", "#00AA00", "#008800",
        "#BBFFEE", "#77FFCC", "#33FFAA", "#00FF99", "#00DD77", "#00AA55", "#008844",
        "#AAFFEE", "#77FFEE", "#33FFDD", "#00FFCC", "#00DDAA", "#00AA88", "#008866",
        "#99FFFF", "#66FFFF", "#33FFFF", "#00FFFF", "#00DDDD", "#00AAAA", "#008888",
        "#CCEEFF", "#77DDFF", "#33CCFF", "#00BBFF", "#009FCC", "#0088A8", "#007799",
        "#CCDDFF", "#99BBFF", "#5599FF", "#0066FF", "#0044BB", "#003C9D", "#003377",
        "#CCCCFF", "#9999FF", "#5555FF", "#0000FF", "#0000CC", "#0000AA", "#000088",
        "#CCBBFF", "#9F88FF", "#7744FF", "#5500FF", "#4400CC", "#2200AA", "#220088",
        "#D1BBFF", "#B088FF", "#9955FF", "#7700FF", "#5500DD", "#4400B3", "#3A0088",
        "#E8CCFF", "#D28EFF", "#B94FFF", "#9900FF", "#7700BB", "#66009D", "#550088",
        "#F0BBFF", "#E38EFF", "#E93EFF", "#CC00FF", "#A500CC", "#7A0099", "#660077",
        "#FFB3FF", "#FF77FF", "#FF3EFF", "#FF00FF", "#CC00CC", "#990099", "#770077"]
    
        
    // function desc. :初始化運動時間區間查詢的日期選擇器並建立事件
    // parameter : 
    // create user : Luffy Lin
    // modify user : Luffy Lin
    // modify date : 2018/10/05
    $(".date").datepicker({
        showOn: "button",
        buttonImage: "/static/images/calender.png",
        buttonImageOnly: true,
        dateFormat: "yy-mm-dd",

    }).change(function () {
        if($(this).val()){date[$(this).attr("id")] = $(this).val()}
        else{
            if($(this).attr("id") == "s_date")
                date["s_date"]= "2000-01-01"
            else if($(this).attr("id") == "e_date")  
                date["e_date"]= "9999-12-31"
        }
        getChartData();
    })


    // function desc. :初始化運動時間區間查詢的日期選擇器並建立事件
    // parameter : 
    // create user : Luffy Lin
    // modify user : Luffy Lin
    // modify date : 2018/10/05
    function getChartData() {
        var clabels = ['待辦事項','完成','封存','過期'];
        var cdata = [];
        var colors = [];

        $.get(`../chartdata/${date.s_date}/${date.e_date}/`, function (datas) {
            
            datas = $.parseJSON(datas)

            $.each(datas, function (idx, data) {
                    // clabels.push(data["memoState"])
                    cdata.push(data)
                    a = Math.floor(Math.random() * (145 - 1)) + 1;
                colors.push(colorList[a])
        })
       
        // Set new default font family and font color to mimic Bootstrap's default styling
        // Set new default font family and font color to mimic Bootstrap's default styling
        Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#292b2c';
    
        // Pie Chart Example
        var ctx = $("#myPieChart");
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: clabels,
                datasets: [{
                    data: cdata,
                    backgroundColor: colors
                }],
            },
        });
    })
    
        
    }
    getChartData();
    

})

   

