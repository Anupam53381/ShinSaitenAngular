import { Component, OnInit } from '@angular/core';
import { CommonConstant } from '../../../shared/common-constant';

@Component( {
    selector: 'app-user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.css']
} )
export class UserHomeComponent implements OnInit {

    userRole: string = '';

    readonly CommonConstant: typeof CommonConstant = CommonConstant;

    constructor() { }

    ngOnInit() {
        this.userRole = localStorage.getItem('userRole');
    }


}
