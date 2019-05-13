import { Component, OnInit } from '@angular/core';
import { MenuInfo } from '../../models/menu-info.model';
import { Router } from '@angular/router';
import { UserHomeService } from '../../services/user-home.service';

@Component({
  selector: 'app-rater-admin-home',
  templateUrl: './rater-admin-home.component.html',
  styleUrls: ['./rater-admin-home.component.css']
})
export class RaterAdminHomeComponent implements OnInit {

  menuInfoList: MenuInfo[];

  constructor( private router: Router, private userHomeService: UserHomeService ) { }

  ngOnInit() {
      this.userHomeService.loadMenu()
          .subscribe( data => {
              this.menuInfoList = data;
          } );
  }

  loadRatingScreen(testBrandId, testBrandDisplayName): void {    
      this.router.navigate(['rating/rating/' + testBrandId + '/' + testBrandDisplayName]);
  }
  
  loadRaterManagementScreen(testBrandId, testBrandDisplayName): void {
      this.router.navigate(['user-administration/raterList/' + testBrandId + '/' + testBrandDisplayName]);
  }
  
  loadRaterProjectListScreen(testBrandId): void {    
      this.router.navigate(['rating-project-management/rating-project-list/' + testBrandId]);
  }

}
