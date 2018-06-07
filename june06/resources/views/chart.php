<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>June07 test</title>
        <link href="./css/chart.css" rel="stylesheet" type="text/css">

        <link rel="stylesheet" href="./amcharts/style.css"	type="text/css">

    </head>
    <body>
        <div class="flex-center position-ref full-height">
            <div class="content" style="position:relative;">

                <div id="chartdiv" style="width:100%; height:600px;"></div>
            </div>
        </div>

        <script src="./js/react.min.js" type="text/javascript"></script>
        <script src="./js/react-dom.min.js" type="text/javascript"></script>
        <script src="./js/axios.min.js" type="text/javascript"></script>
        <script src="./amcharts/amcharts.js" type="text/javascript"></script>
        <script src="./amcharts/serial.js" type="text/javascript"></script>
        <script src="./amcharts/amstock.js" type="text/javascript"></script>

        <script src="./js/stock.js" type="text/babel"></script>
        <script src="./js/babel.min.js"></script>

        <script type="text/babel">

            var myChart = ReactDOM.render(
                <ChartControl />,
                document.getElementById('chartdiv')
            );

            myChart.draw();

        </script>

    </body>
</html>
