import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

declare var $:any;

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
    Bill:any=[
        {
            itemname:"Biriyani",
            quantity:"1",
            price:"220"
        },
        {
            itemname:"Chicken Fried Rice",
            quantity:"1",
            price:"220"
        },
        {
            itemname:"Meals",
            quantity:"2",
            price:"150"
        },
        {
            itemname:"Chicken Noodels",
            quantity:"1",
            price:"200"
        },
        {
            itemname:"Chilli Chicken",
            quantity:"1",
            price:"120"
        }
    ]

    Table=[
        {
            tableno:"1",
            status:"available"
        },
        {
            tableno:"2",
            status:"available"
        },
        {
            tableno:"3",
            status:"available"
        },

    ]
public value:any[];

    ngOnInit(){
   
    }
    open(value){
     console.log("open",value);
     alert(value)
    }
    
}
