import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [CommonService]

})

export class UserComponent implements OnInit{
    constructor(private user: CommonService) { }
    public selectfod: any = [];
    public fdname: any;
    public fdid: any[];
    public fdcatagory: any;
    public itcatid: any;
  
    public getuser: any = [];
    public insert: any = [];
  
    public cat: any = [];
    public ftype: any = [];
  
    public insertitemimg: any;
    public image: any="";
    public insertfoodimg: any;
    public updateitemimg:any;
    public updatefoodimg:any;
    public img:any=[]
  
    public foodstatus: any = [
      {
        status_id: 1,
        status: "Active"
      },
      {
        status_id: 2,
        status: "InActive"
      }
    ]
  
    public foodtype: any = [
      {
        food_type_id: 1,
        food_type: "Veg"
      },
      {
        food_type_id: 2,
        food_type: "Non-Veg"
      }
  
    ]
  
    public special: any = [
      {
        today_special_id: 1,
        today_special_status: "YES",
  
      },
      {
        today_special_id: 2,
        today_special_status: "NO",
  
      }
    ]
    ngOnInit(){
        this.Select_food();
        this.Catagory();
    }
    Select_food() {
        this.user.Select_food().subscribe((Response: any) => {
          console.log("select", Response)
          this.selectfod = Response.Returnvalue;
        });
    
      }
    
      public category_id:any="";
      public item:any="";
      public food:any="";
      Insert_food(param1, param2, param3, param4, param5) {
    
        if (param3 != undefined && this.insertitemimg==undefined && this.insertfoodimg==undefined) {
          this.category_id = param3
          this.item="";
          this.food=""
        }
        else if (param3 === undefined && param2 != undefined) {
          this.category_id = param2.toString();
        }else{
          alert("sothing error")
        }
     
    
        
    
        let body = {
          "food_name": param1.fdname,
          "price": param1.fdprice,
          "item_category_id": this.category_id,
          "image_url": this.item,
          "food_status_id": 1,
          "food_description": "",
          "food_id_url":this.food,
          "food_type_id": param4,
          "today_special_id": 2,
          "offer_value": 0
        }
        console.log(JSON.stringify(body));
        this.user.Insert_food(body).subscribe((Response: any) => {
          console.log("resp", Response)
          if (Response.ReturnCode == "RIS") {
            alert(Response.Return);
            this.Select_food();
    
          }
        })
      }
    
      Catagory() {
        this.user.Catagory().subscribe((Response: any) => {
          if (Response.ReturnCode == "RRS") {
            this.cat = Response.Returnvalue;
          }
        });
      }
    
    
      editfood(param) {
        this.getuser.fname = param.food_name;
        this.fdid = param.food_id;
        this.getuser.fdcatagory = param.food_type;
      }
    
      public itcatagoryid;
      public fdtypeid;
      addfood(param) {
        this.fdtypeid = param.food_type_id
      }
    
      public foodimage:any;
      public offer:any;
      public price:any;
      Update_food(param1, param2, param3, param4, param5, param6,param7) {
        if(this.updateitemimg==undefined && this.updatefoodimg==undefined )
        {
          this.foodimage="";
          
          // this.offer=0;
        }
        // else if(param1.fdprice==""){
        //   this.price=0
        // }

    
        let body={
          "food_name":param1.fname,
          "price":param1.fdprice,
          "food_id":param2,
          "item_category_id":param3,
          "image_url":this.foodimage, 
          "food_status_id":param5, 
          "food_description":"",
          "food_id_url":this.foodimage,
          "food_type_id":param4,
          "today_special_id":param6,
          "offer_value":param1.offer
        }
        console.log("gf", body)
        this.user.Update_food(body).subscribe((Response: any) => {
          if (Response.ReturnCode == "RUS") {
            alert(Response.Return);
            this.Select_food();
            // this.img_64=[];
            // this.image_64=[];
          }
        });
      }
    
    
    
    
      changeListener($event): void {
        this.readThis($event.target);
      }
    
      readThis(inputValue: any): void {
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();
    
        myReader.onloadend = (e) => {
          this.image = myReader.result;
          this.insertitemimg = this.image.split(",", 2)[1]
          console.log(this.insertitemimg)
        }
        myReader.readAsDataURL(file);
      }
    
    
      ActiveListener($event): void {
        this.readThat($event.target);
      }
    
      readThat(inputValue: any): void {
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();
    
        myReader.onloadend = (e) => {
          this.image = myReader.result;
          this.insertfoodimg = this.image.split(",", 2)[1]
          
        }
        myReader.readAsDataURL(file);
      }
    
    
      UnchangeListener($event): void {
        this.read($event.target);
      }
    
      read(inputValue: any): void {
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();
    
        myReader.onloadend = (e) => {
          this.image = myReader.result;
          this.updateitemimg = this.image.split(",", 2)[1]
          console.log(this.updateitemimg)
        }
        myReader.readAsDataURL(file);
      }
    
      InActiveListener($event): void {
        this.readTat($event.target);
      }
    
      readTat(inputValue: any): void {
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();
    
        myReader.onloadend = (e) => {
          this.image = myReader.result;
          this.updatefoodimg = this.image.split(",", 2)[1]
          console.log(this.updatefoodimg)
        }
        myReader.readAsDataURL(file);
      }
}
