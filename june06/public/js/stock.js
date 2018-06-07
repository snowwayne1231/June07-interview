class ChartControl extends React.Component {
    
    constructor(props) {
      super(props);
      
    }
  
    
    render() {
        const divStyle = {
            width: '100%',
            height: 600,
        };
        return (
            <div className="main-chart">
            <div id="main-chart" style={divStyle}></div>
            </div>
        );
    }

    generateChartData(data) {
        for ( var i = 0; i < data.length ; i++ ) {
            data[i].date = new Date( data[i].date );
        }
        data.sort(function(a,b){
            return a.date.getTime() - b.date.getTime();
        });
        return data;
    }

    getMostGapData(data){
        var color1 = "#22fc33";
        var color2 = "#cc2200";
        var newData = [], gap_object={};
        var min = 0, max = 0, mostGap = 0;
        for(var i =0; i < data.length; i++){
            var loc = data[i].value;
            var gap = data[max].value-data[min].value;
            if(gap>mostGap){
                gap_object.min=min;
                gap_object.max=max;
                mostGap=gap;
            }
            if(loc < data[min].value){ 
                min=i;max=i; 
            }else if(loc>data[max].value){ 
                max=i; 
            }
        }
        var min_o = data[gap_object.min];
        var max_o = data[gap_object.max];
        newData.push( min_o );
        newData.push( max_o );

        data[0].lineColor = color1;
        data[min].lineColor = color2;
        data[max+1].lineColor = color1;
        
        return data;
    }

    draw(){

        var self = this;

        this.getData().then(function (response) {
            // console.log(response);

            var rd = response.data;
            if(rd.data){
                self.makeChart( rd.data );
            }
            
        });
        
    }

    getData(){
        return axios.get('./api-stock').catch(function (error) {
            console.log(error);
        });
    }

    makeChart( chartData ){
        var finalData = this.generateChartData(chartData);
        var mostData = this.getMostGapData(finalData);
        
        // console.log(finalData);
        // console.log(mostData);

        // this.buildChart('first', 'main-chart', finalData);
        this.buildSerial('main-chart',mostData);
        
    }

    buildChart( name, div, data ){
        var chart = AmCharts.makeChart( div, {

            type: "stock",
            dataSets: [{
                title: name,
                fieldMappings: [{
                    fromField: "value",
                    toField: "value"
                }],
                dataProvider: data,
                categoryField: "date"
            }],

            panels: [{

                showCategoryAxis: true,
                title: "Value",
                percentHeight: 100,

                stockGraphs: [{
                    id: "g1",

                    valueField: "value",
                    comparable: false,
                    bullet: "round",
                    bulletBorderColor: "#FFFFFF",
                    bulletBorderAlpha: 1
                }]

                
            }]
            

        } );
    }

    buildSerial( div, data){

        var chart = AmCharts.makeChart(div, {
            "type": "serial",
            "theme": "light",
            "marginRight": 80,
            "dataProvider": data,
            "balloon": {
                "cornerRadius": 6,
                "horizontalPadding": 15,
                "verticalPadding": 10
            },
           
            "graphs": [{
                "bullet": "square",
                "bulletBorderAlpha": 1,
                "bulletBorderThickness": 1,
                "fillAlphas": 0.3,
                "fillColorsField": "lineColor",
                "legendValueText": "[[value]]",
                "lineColorField": "lineColor",
                "title": "value",
                "valueField": "value"
            }],
            "chartScrollbar": {
        
            },
            "chartCursor": {
                "categoryBalloonDateFormat": "YYYY MMM DD",
                "cursorAlpha": 0,
                "fullWidth": true
            },
            "dataDateFormat": "YYYY-MM-DD",
            "categoryField": "date",
            "categoryAxis": {
                "dateFormats": [{
                    "period": "DD",
                    "format": "DD"
                }, {
                    "period": "WW",
                    "format": "MMM DD"
                }, {
                    "period": "MM",
                    "format": "MMM"
                }, {
                    "period": "YYYY",
                    "format": "YYYY"
                }],
                "parseDates": true,
                "autoGridCount": false,
                "axisColor": "#555555",
                "gridAlpha": 0,
                "gridCount": 50
            },
            "export": {
                "enabled": true
            }
        });

    }

  }
  





