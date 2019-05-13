import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuInfo } from '../../models/menu-info.model';
import { UserHomeService } from '../../services/user-home.service';

@Component( {
    selector: 'app-rater-home',
    templateUrl: './rater-home.component.html',
    styleUrls: ['./rater-home.component.css']
} )
export class RaterHomeComponent implements OnInit {

    menuInfoList: MenuInfo[];

    constructor( private router: Router, private userHomeService: UserHomeService ) { }

    ngOnInit() {
        this.userHomeService.loadMenu()
            .subscribe( data => {
                this.menuInfoList = data;
            } );
    }

    loadRatingScreen( testBrandId, testBrandDisplayName ): void {    
    this.router.navigate(['rating/rating/' + testBrandId + '/' + testBrandDisplayName]);
  }

}
