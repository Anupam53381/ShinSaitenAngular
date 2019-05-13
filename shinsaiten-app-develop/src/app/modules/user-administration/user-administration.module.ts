import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaterListComponent } from './rater-list/rater-list.component';
import { RaterRegisterComponent } from './rater-register/rater-register.component';
import { RaterListService } from './services/rater-list-service.service';
import { RaterRegisterService } from './services/rater-register.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '../../shared/shared.module';
import { RaterEditComponent } from './rater-edit/rater-edit.component';
import { RaterEditService } from './services/rater-edit.service';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [RaterListComponent, RaterRegisterComponent, RaterEditComponent],
  exports: [RaterListComponent, RaterRegisterComponent, RaterEditComponent],
  providers: [RaterListService, RaterRegisterService, RaterEditService]
})
export class UserAdministrationModule { }
