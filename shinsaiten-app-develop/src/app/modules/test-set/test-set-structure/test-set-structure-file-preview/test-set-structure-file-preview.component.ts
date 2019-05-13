import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TestSetStructure } from '../../models/test-structure.model';
import { ValidateTestSetStructureFile } from '../upload-test-set-structure/Validate/validate_test_set_structure_file';
import { CommonConstant } from '../../../../shared/common-constant';
import { NavigationEnd, Router } from '@angular/router';
import { TestStructureService } from '../../services/test-structure.service';
import { DataService } from '../../services/data-service.service';


@Component({
  selector: 'app-test-set-structure-file-preview',
  templateUrl: './test-set-structure-file-preview.component.html',
  styleUrls: ['./test-set-structure-file-preview.component.css']
})
export class TestSetStructureFilePreviewComponent implements OnInit {

  answerFromFormatDescriptionMap = CommonConstant.answerFormFormatDescriptionMap;
  testSetStructureList = new Array<TestSetStructure>();
  testSetFileValidation = new ValidateTestSetStructureFile();
  public answerFormValueArray = CommonConstant.ANSWER_FORM_VALUE_ARRAY;
  doNotShoWFilePreview = true;
  @Output() validationFail = new EventEmitter<any>();
  @Output() resetPage = new EventEmitter();
  @ViewChild('showSavedTestStructureModelButton') showSavedTestStructureModelButton: ElementRef;

  constructor(private router: Router, private testStructure: TestStructureService, private dataService: DataService) { }

  ngOnInit() {

  }

  public onChange(index, event): void {
    // event will give you full breif of action
    var testStructure = this.testSetStructureList[index];
    var selectedValue = event.target.value;
    if (selectedValue === '') {
      testStructure.formatDescription = '';
      return;
    }
    var formatDescription = this.answerFromFormatDescriptionMap.get(selectedValue);
    testStructure.formatDescription = formatDescription;
  }

  submitTestSetStructure() {
    /* Send Data to server for */
    this.testStructure.saveBulkTestSetStructure(this.testSetStructureList, this.dataService.getTestSetId()).subscribe(resp => {
      console.log("Response Got From Server" + JSON.stringify(resp));
      var responseCode = resp.status;
      if (responseCode === CommonConstant.VALIDATION_FAIL_CODE) {
        /*Raise the validation fail event*/
        this.validationFail.emit(resp.body);
      }
      else if (responseCode === 201) {
        /*Show Success message pop up*/
       
        this.showSavedTestStructureModelButton.nativeElement.click();
      }

    });

  }
  public resetPageAfterTestStructureSaved() {

    /*Raise an event so parent componet able to reset page*/
    this.resetPage.emit();
  }

  public uploadedFilePreview(csvData: any) {

    this.processFileData(csvData);
    this.doNotShoWFilePreview = false;
  }

  processFileData(csvData: any) {
    let csvRecordsArray = csvData.toString().split('\n');
    csvRecordsArray = this.testSetFileValidation.removeLastEmptyRow(csvRecordsArray);
    /*Create File Records*/
    let headersRow = this.getHeaderArray(csvRecordsArray);
    this.testSetStructureList = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
  }
  // GET CSV FILE HEADER COLUMNS
  getHeaderArray(csvRecordsArr: any) {
    let headers = csvRecordsArr[0].split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }


  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    var ansFormatMap = this.answerFromFormatDescriptionMap;
    var dataArr = []
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let data = csvRecordsArray[i].split(',');
      var testSetStructure: TestSetStructure = new TestSetStructure();
      testSetStructure.testItemDescription = data[0].trim();
      testSetStructure.testItemId = data[1].trim();
      testSetStructure.answerForm = data[2].trim();
      if (data[2].trim() !== '') {
        testSetStructure.formatDescription = ansFormatMap.get(data[2].trim());
      }
      dataArr.push(testSetStructure);

    }
    return dataArr;
  }


}
