import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '../../shared/shared.module';
import { RatingProjectListComponent } from './rating-project-list/rating-project-list.component';
import { RatingProjectListService } from './services/rating-project-list.service';

export function HttpLoaderFactory( http: HttpClient ) {
  return new TranslateHttpLoader( http );
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ RatingProjectListComponent],
  exports: [RatingProjectListComponent],
  providers: [RatingProjectListService]
})
export class RatingProjectManagementModule { }
