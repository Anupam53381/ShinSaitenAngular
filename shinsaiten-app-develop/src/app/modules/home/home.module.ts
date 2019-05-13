import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from './services/menu.service';
import { UserHomeComponent } from './user-home/user-home.component';
import { RaterHomeComponent } from './user-home/rater-home/rater-home.component';
import { RaterAdminHomeComponent } from './user-home/rater-admin-home/rater-admin-home.component';
import { UserHomeService } from './services/user-home.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserHomeComponent, RaterHomeComponent, RaterAdminHomeComponent],
  exports:[UserHomeComponent, RaterHomeComponent, RaterAdminHomeComponent],
  providers:[MenuService, UserHomeService]
})
export class HomeModule { }
