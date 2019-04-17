import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { AmChartsService } from "amcharts3-angular2";
@Component({
  selector: 'typography-cmp',
  moduleId: module.id,
  templateUrl: 'typography.component.html',
  providers: [CommonService,]
})

export class TypographyComponent implements OnInit {

  constructor(private commonservice: CommonService, private AmCharts: AmChartsService) { }

  public tablelist: any[];

  ngOnInit() {

  }

  public showhide:boolean=true;
  getreport(startdate, todate, checkboxvalue) {

    let body = {
      "from_date": startdate,
      "to_date": todate,
      "type": parseInt(checkboxvalue)
    }
    console.log(body)
    this.commonservice.Getchartreport(body)
      .subscribe((resp: any) => {
        var chartData1 = resp.Return;
        // chartData = resp.Return_Category;
        console.log("testt",chartData1)
        if (chartData1 == "Table") {
        var chartData=resp.Return_Table;
          var collectiveData = [];
          for (var x in chartData) {
            var dataPoint = chartData[x];
            if ('0' == x) {
              for (var y in dataPoint.category_reports) {
                collectiveData.push({
                  "Category_name": dataPoint.category_reports[y].Category_name,
                  "Count": dataPoint.category_reports[y].Count
                });
              }
            } 
            // else {
            //   for (var y in dataPoint.category_reports) {
            //     collectiveData[y].Count += dataPoint.category_reports[y].Count;
            //   }
            // }
          }
          // create pie chart
          var chart = this.AmCharts.makeChart("chartdiv1", {
            "type": "pie",
            "dataProvider": chartData,
            "valueField": "Count",
            "titleField": "table_no",
            "radius": "42%",
            "innerRadius": "60%",
            "depth3D": 15,
            "theme": "light",
            "labelText": "[[title]]: [[value]]",
            "pullOutOnlyOne": true,
          });

          // create column chart
          var chart2 = this.AmCharts.makeChart("chartdiv2", {
            "type": "serial",
            "theme": "light",
            "pathToImages": "/lib/3/images/",
            "autoMargins": false,
            "marginLeft": 30,
            "marginRight": 8,
            "marginTop": 10,
            "marginBottom": 26,
            "depth3D": 20,
            "angle": 30,
            "titles": [{
              "text": "Table 1"
            }],
            "dataProvider": collectiveData,
            "startDuration": 1,
            "graphs": [{
              "title": "Count",
              "type": "column",
              "fillAlphas": 0.8,
              "valueField": "Count"
            }],
            "categoryField": "Category_name",
            "categoryAxis": {
              "gridPosition": "start",
              "autoGridCount": false,
              "gridCount": 12
            },
            "valueAxes": [{
              "integersOnly": true
            }]
          });

          chart.addListener("pullOutSlice", function (event) {
             //   for (var y in dataPoint.category_reports) {
            //     collectiveData[y].Count += dataPoint.category_reports[y].Count;
            //   }
            
            chart2.dataProvider = event.dataItem.dataContext.category_reports;
            chart2.titles[0].text = event.dataItem.dataContext.table_no;
            chart2.validateData();
            chart2.animateAgain();
          });

          chart.addListener("pullInSlice", function (event) {
            // chart2.dataProvider = collectiveData;
            // chart2.titles[0].text = "All Table";
            // chart2.validateData();
            // chart2.animateAgain();
          });

        }
/**********************IF completed ***************************************/
        else {
          chartData=resp.Return_Category;
          var collectiveData = [];
          console.log("Chart Data",chartData);
          for (var x in chartData) {
            var dataPoint = chartData[x];
            if ('0' == x) {
              for (var y in dataPoint.food_items_reports) {
                collectiveData.push({
                  "food_name": dataPoint.food_items_reports[y].food_name,
                  "Count": dataPoint.food_items_reports[y].Count
                });
              }
            } 
            // else {
            //   for (var y in dataPoint.food_items_reports) {
            //     collectiveData[y].Count += dataPoint.food_items_reports[y].Count;
            //   }
            // }
            // console.log("Collective Data",collectiveData);
          }
          // create pie chart
          var chart = this.AmCharts.makeChart("chartdiv1", {
            "type": "pie",
            "dataProvider": chartData,
            "valueField": "Count",
            "titleField": "category",
            "radius": "42%",
            "innerRadius": "60%",
            "depth3D": 15,
            "theme": "light",
            "labelText": "[[title]]: [[value]]",
            "pullOutOnlyOne": true,
          });

          // create column chart
          var chart2 = this.AmCharts.makeChart("chartdiv2", {
            "type": "serial",
            "theme": "light",
            "pathToImages": "/lib/3/images/",
            "autoMargins": false,
            "marginLeft": 30,
            "marginRight": 8,
            "marginTop": 10,
            "marginBottom": 26,
            "depth3D": 20,
            "angle": 30,
            "titles": [{
              "text": "Category 1"
            }],
            "dataProvider": collectiveData,
            "startDuration": 1,
            "graphs": [{
              "title": "Count",
              "type": "column",
              "fillAlphas": 0.8,
              "valueField": "Count"
            }],
            "categoryField": "food_name",
            "categoryAxis": {
              "gridPosition": "start",
              "autoGridCount": false,
              "gridCount": 12
            },
            "valueAxes": [{
              "integersOnly": true
            }]
          });

          chart.addListener("pullOutSlice", function (event) {
            chart2.dataProvider = event.dataItem.dataContext.food_items_reports;
            chart2.titles[0].text = event.dataItem.dataContext.category;
            chart2.validateData();
            chart2.animateAgain();
          });

          chart.addListener("pullInSlice", function (event) {
            // chart2.dataProvider = collectiveData;
            // chart2.titles[0].text = "All Table";
            // chart2.validateData();
            // chart2.animateAgain();
          });
        }



      });
  }
}
