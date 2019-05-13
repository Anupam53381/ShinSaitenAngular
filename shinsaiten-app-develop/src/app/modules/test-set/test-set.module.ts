import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TestSetService } from './services/test-set.service';
import { TestSetListComponent } from './test-set-list/test-set-list.component';
import { UploadTestsetComponent } from './test-set-list/upload-testset/upload-testset.component';
import { AddTestSetComponent } from './test-set-list/add-test-set/add-test-set.component';
import { UploadTestSetStructureComponent } from './test-set-structure/upload-test-set-structure/upload-test-set-structure.component';
import { TestSetStructureComponent } from './test-set-structure/test-set-structure.component';
import { TestSetStructureFilePreviewComponent } from './test-set-structure/test-set-structure-file-preview/test-set-structure-file-preview.component';
import { TestStructureService } from './services/test-structure.service';
import {  DataService } from './services/data-service.service';
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
  declarations: [TestSetListComponent, UploadTestsetComponent, AddTestSetComponent, UploadTestSetStructureComponent, TestSetStructureComponent, TestSetStructureFilePreviewComponent],
  exports: [TestSetListComponent, UploadTestsetComponent, AddTestSetComponent, TestSetStructureComponent],
  providers: [TestSetService, TestStructureService,DataService]
})
export class TestSetModule { }
