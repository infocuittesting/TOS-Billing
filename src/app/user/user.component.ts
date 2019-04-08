import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit{
    catagories=[
        {
            cname:"starter"
        },
        {
            cname:"Main Dish"
        },
        {
            cname:"Side Dish"
        },
        {
            cname:"Desserts"
        }
    ]
    ngOnInit(){
    }
}
