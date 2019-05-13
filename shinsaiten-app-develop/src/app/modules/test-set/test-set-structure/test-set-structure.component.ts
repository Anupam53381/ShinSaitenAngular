import { Component, OnInit, ViewChild } from '@angular/core';
import { TestSetStructureFilePreviewComponent } from './test-set-structure-file-preview/test-set-structure-file-preview.component';
import { UploadTestSetStructureComponent } from './upload-test-set-structure/upload-test-set-structure.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-test-set-structure',
  templateUrl: './test-set-structure.component.html',
  styleUrls: ['./test-set-structure.component.css']
})
export class TestSetStructureComponent implements OnInit {
  /*Variable declaration*/
  testSetId: string;
  testSetName: string;
  ratingProjectId: string;
  fileFormatInValid = false;
  currentFileUpload: File;
  fileParsingError = false;
  testSetStructureList: any[] = [];
  @ViewChild(TestSetStructureFilePreviewComponent) testStruFilePreview: TestSetStructureFilePreviewComponent;
  @ViewChild(UploadTestSetStructureComponent) uploadTestStructure: UploadTestSetStructureComponent;
  @ViewChild('fileImportInput') fileImportInput: any;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.testSetId = this.route.snapshot.params['testSetId'];
    this.testSetName = this.route.snapshot.params['testSetName'];
    this.ratingProjectId = this.route.snapshot.params['ratingProjectId'];
    this.dataService.setTestSetId(this.testSetId);
    this.dataService.setTestSetName(this.testSetName);
    this.dataService.setRatingProjectId(this.ratingProjectId)
  }


  /*This method is for Handling the */
  csvRecordsHandler(csvRecords: any) {

    this.testStruFilePreview.uploadedFilePreview(csvRecords);

  }

  /*This to Handle Error Raised From Server*/
  validationFailHandler(errorBeanArray: any) {

    console.log("Server Error Bean" + JSON.stringify(errorBeanArray));
    this.uploadTestStructure.showServerValidationFailMessages(errorBeanArray);
  }

  resetPageHandler() {
    this.testStruFilePreview.doNotShoWFilePreview = true;
    this.testStruFilePreview.testSetStructureList = [];
    this.uploadTestStructure.fileReset();
  }

}
