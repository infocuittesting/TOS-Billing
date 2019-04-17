import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

declare var $: any;

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [CommonService]
})

export class DashboardComponent implements OnInit {

    constructor(private commonservice: CommonService) { }

    public tablevalue; total: any; order: any;
    public tablelist: any[];
    public billtable: any[];
    public showhide: boolean = true;
    public timeinterval:any;

    ngOnInit() {
        this.getcard();
         this.timeinterval=setInterval(() => {
            this.getcard(); 
          }, 2000);   
    }

    getcard(){
        this.commonservice.Gettable()
        .subscribe((resp: any) => {
            this.tablelist = resp.Returnvalue;
            console.log("testttttt", this.tablelist)
        });
    }
    getbill(param) {
        this.showhide = false;
        this.commonservice.bill(param)
            .subscribe((resp: any) => {
                console.log("testtttttt bill",resp)
                this.tablevalue = resp.Returnvalue.table_no;
                this.billtable = resp.Returnvalue.items;
                this.total = resp.Returnvalue.grand_total;
                this.order = resp.Returnvalue.order_no;
            });
    }

    closebill(param, param1) {
        let body = {
            "table_no": param,
            "order_no": param1
        }
        this.commonservice.billclose(body)
        .subscribe((resp: any) => {
            if(resp.ReturnCode=="RUS"){
                this.showhide = true; 
            }
        });
    }

    ngOnDestroy() {
        clearInterval(this.timeinterval);
    }    
}
