import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { ValidateTestSetStructureFile } from './Validate/validate_test_set_structure_file';
import { TestSetFileRowValidationError } from '../../test-set-list/upload-testset/Validate/test_set_file_row_validation_error';
import { DataService } from '../../services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-test-set-structure',
  templateUrl: './upload-test-set-structure.component.html',
  styleUrls: ['./upload-test-set-structure.component.css']
})
export class UploadTestSetStructureComponent implements OnInit {
  testSetName: string;
  ratingProjectId: string;
  validationFail = false;
  validationErrorMessages: string;
  currentFileUpload: File;
  fileParsingError = false;
  validate: boolean = false;
  doNotShowValiadtionError = true;
  public csvRecords: any[] = [];
  csvData: any;
  errorBeanArray = new Array<TestSetFileRowValidationError>();
  @ViewChild('fileImportInput') fileImportInput: any;
  @ViewChild('browseDnDFile') dragNDropButton: ElementRef;
  @Output() uploadedFileRecords = new EventEmitter<any>();

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.testSetName = this.dataService.getTestSetName();
    this.ratingProjectId = this.dataService.getRatingProjectId()
  }

  fileChangeListener($event: any): void {
    this.processFile($event);
  }

  processFile($event: any) {

    console.log("event in child method" + $event);
    //this.progress.percentage = 0;
    var text = [];
    var files = $event.srcElement.files;
    this.currentFileUpload = files[0];
    var csvData;
    this.dragNDropButton.nativeElement.value = this.currentFileUpload.name;
    /*Validate File Extension*/
    if (this.isCSVFile(this.currentFileUpload)) {
      /* Validate Whether file can be parse or not*/
      var input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);
      this.currentFileUpload = input.files[0];
      reader.onload = (data) => {

        csvData = reader.result;
        console.log("CSV DATA IS" + csvData);

      }
      reader.onloadend = (e) => {

        var validateTestStructureSetFile = new ValidateTestSetStructureFile();
        let csvRecordsArray = csvData.toString().split('\n');
        this.errorBeanArray = validateTestStructureSetFile.validateTestSetStructureFileData(csvRecordsArray);
        /*waiting till file get loaded completly*/
        this.csvData = csvData;
      }
      reader.onerror = (e) => {
        this.fileParsingError = true;
      };
    }

    else {
      this.validationFail = true;
      this.validationErrorMessages = "file_format_invalid";
      this.fileReset();
    }
  }

  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  fileReset() {

    this.fileImportInput.nativeElement.value = "";
    this.dragNDropButton.nativeElement.value = "";

  }
  showFilePreview() {

    if (this.fileImportInput.nativeElement.value === "") {
      this.validationFail = true;
      this.validationErrorMessages = "file_not_selected";
      return false;
    }

    if (this.errorBeanArray.length > 0) {
      this.doNotShowValiadtionError = false;
      return false;
    }
    this.uploadedFileRecords.emit(this.csvData);

  }
  /*This method is going show  validation fail message from server 
  and will be called by parent component  */
  public showServerValidationFailMessages(errorBeanArray: any) {
    this.errorBeanArray = errorBeanArray;
    this.doNotShowValiadtionError = false;

  }

  public redirectToTestSetList() {

    this.router.navigate(['user-administration/testSetList/' +  this.ratingProjectId]);
  }


  ngAfterViewChecked() {

    this.doNotShowValiadtionError = true;
    this.validationFail = false;

  }

}