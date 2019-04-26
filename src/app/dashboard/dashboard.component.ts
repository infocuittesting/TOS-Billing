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

    public tablevalue:any[]; total: any; 
    public order: any;
    public amount:any;
    public gstbill:any;sgstbill:any;
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
                this.tablevalue = resp.Returnvalue;
                this.billtable = resp.Returnvalue.items;
            });
    }

    closebill(param) {
        let body = {
            "table_no": param.table_no,
            "order_no": param.order_no,
            "grand_total": param.grand_total,
     "CGST_Amount": param.CGST_Amount,
        "SGST_Amount": param.SGST_Amount,
        "total_items": param.total_items ,
        "sub_total": param.sub_total,
        "total_amount_offers": param.total_amount_offers,
        "total_offers": param.total_offers
        }
        console.log("testinput",body)
        this.commonservice.billclose(body)
        .subscribe((resp: any) => {
            console.log("tesssss",resp)
            if(resp.ReturnCode=="RUS"){
                this.showhide = true; 
            }
        });
    }

    ngOnDestroy() {
        clearInterval(this.timeinterval);
    }    
}
