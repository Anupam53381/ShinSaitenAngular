import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating/rating.component';
import { RatingService } from './services/rating.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/tabcomponent/common/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
	PdfViewerModule
  ],
  declarations: [RatingComponent],
  exports:[RatingComponent],
  providers:[RatingService]
})
export class RatingModule { }
