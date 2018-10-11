window.onload = function () {

    $(document).ready(function () {
        piechart()
        userid = ""

        // 抓取userid
        $.get("/on_account/catch/", function (data) {
            userid = data
        })

        $("#chartsel").change(function () {
            var sel = $(this).val()
            if (sel == "piechart") {
                piechart()
            }
            else if (sel == "columnchart") {
                columnchart()
            }
        })

        // 圓餅圖
        function piechart() {
            console.log(`is piechart`)

            // 取得資料
            $.getJSON('/api/on_accountapi/', function (datas) {
                // var incomeMoney = 0;
                // var outlayMoney = 0;
                var foodMoney = 0;
                var clothesMoney = 0;
                var liveMoney = 0;
                var trafficMoney = 0;
                var educateMoney = 0;
                var recreationMoney = 0;
                var otherMoney = 0;
                var date;

                console.log(datas)
                console.log(userid)

                for (var i = 0, max = datas.length; i < max; i++) {
                    if (userid == datas[i].userid) {
                        if (datas[i].spendtype == "食") {
                            foodMoney += parseInt(datas[i].money)
                        }
                        else if (datas[i].spendtype == "衣") {
                            clothesMoney += parseInt(datas[i].money)
                        }
                        else if (datas[i].spendtype == "住") {
                            liveMoney += parseInt(datas[i].money)
                        }
                        else if (datas[i].spendtype == "行") {
                            trafficMoney += parseInt(datas[i].money)
                        }
                        else if (datas[i].spendtype == "育") {
                            educateMoney += parseInt(datas[i].money)
                        }
                        else if (datas[i].spendtype == "樂") {
                            recreationMoney += parseInt(datas[i].money)
                        }
                        else if (datas[i].spendtype == "其他") {
                            otherMoney += parseInt(datas[i].money)
                        }
                    }
                }

                // 圓餅圖參數設定
                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light1", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: "各類消費統計表"
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: NT${y}",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - NT${y}",
                        dataPoints: [
                            { y: foodMoney, label: "食" },
                            { y: clothesMoney, label: "衣" },
                            { y: liveMoney, label: "住" },
                            { y: trafficMoney, label: "行" },
                            { y: educateMoney, label: "育" },
                            { y: recreationMoney, label: "樂" },
                            { y: otherMoney, label: "其他" },
                        ]
                    }]
                });
                chart.render();
            })
        }

        // 長條圖
        function columnchart() {
            console.log(`is columnchart`)

            // 取得資料
            $.getJSON('/api/on_accountapi/', function (datas) {
                // var incomeMoney = 0;
                // var outlayMoney = 0;

                var foodMoney = 0;
                var clothesMoney = 0;
                var liveMoney = 0;
                var trafficMoney = 0;
                var educateMoney = 0;
                var recreationMoney = 0;
                var otherMoney = 0;
                for (var i = 0, max = datas.length; i < max; i++) {
                    if (userid == datas[i].userid) {
                        if (datas[i].spendtype == "食") {
                            foodMoney += parseInt(datas[i].money)
                        }
                        else if (datas[i].spendtype == "衣") {
                            clothesMoney += parseInt(datas[i].money)
                        }
                        else if (datas[i].spendtype == "住") {
                            liveMoney += parseInt(datas[i].money)
                        }
                        else if (datas[i].spendtype == "行") {
                            trafficMoney += parseInt(datas[i].money)
                        }
                        else if (datas[i].spendtype == "育") {
                            educateMoney += parseInt(datas[i].money)
                        }
                        else if (datas[i].spendtype == "樂") {
                            recreationMoney += parseInt(datas[i].money)
                        }
                        else if (datas[i].spendtype == "其他") {
                            otherMoney += parseInt(datas[i].money)
                        }
                    }
                }

                // 長條圖參數設定
                var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    theme: "light2", // "light1", "light2", "dark1", "dark2"
                    title: {
                        text: "各類消費統計表"
                    },
                    axisY: {
                        title: "金額"
                    },
                    data: [{
                        type: "column",
                        showInLegend: true,
                        legendMarkerColor: "grey",
                        legendText: "消費類型",
                        toolTipContent: "<b>{label}</b>: NT${y}",
                        dataPoints: [
                            { y: foodMoney, label: "食" },
                            { y: clothesMoney, label: "衣" },
                            { y: liveMoney, label: "住" },
                            { y: trafficMoney, label: "行" },
                            { y: educateMoney, label: "育" },
                            { y: recreationMoney, label: "樂" },
                            { y: otherMoney, label: "其他" },
                        ]
                    }]
                });
                chart.render();
            })
        }
    })
}