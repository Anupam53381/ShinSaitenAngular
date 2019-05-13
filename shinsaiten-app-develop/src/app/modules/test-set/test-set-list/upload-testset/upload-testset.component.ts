import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { ValidateTestSetFile } from './Validate/validate_test_set_file';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { TestSetFileRowValidationError } from './Validate/test_set_file_row_validation_error';

import { ActivatedRoute, Route, Router } from '@angular/router';
import { TestSetService } from '../../services/test-set.service';


@Component({
    selector: 'app-upload-testset',
    templateUrl: './upload-testset.component.html',
    styleUrls: ['./upload-testset.component.css']
})
export class UploadTestsetComponent implements OnInit {
    /* variable declartion*/
    title = 'csvpoc';
    fileFormatInValid = false;
    validate: boolean = false;
    fileParsingError=false;
    ratingProjectId: string;
    currentFileUpload: File;
    errorBeanArray = new Array<TestSetFileRowValidationError>();
    progress: { percentage: number } = { percentage: 0 };
    public csvRecords: any[] = [];
    @ViewChild('showPreview') showPreview: ElementRef;
    @ViewChild('fileImportInput') fileImportInput: any;
    @ViewChild('showValidateError') showValidationError: ElementRef;
    @Output() fileUploadedEvent = new EventEmitter<boolean>();
    /*Variable declartion End*/

    /*construction */
    constructor(private testSetService: TestSetService, private router: Router) { }
    ngOnInit() {

    }

    public setRatingProjectId(ratingProjectId: string) {
        this.ratingProjectId = ratingProjectId;
    }

    fileChangeListener($event: any): void {
        this.processFile($event);
    }

    processFile($event: any) {
        this.fileFormatInValid=false;
        console.log("event in child method" + $event);
        this.progress.percentage = 0;
        var text = [];
        var files = $event.srcElement.files;
        this.currentFileUpload = files[0];
        var csvData;

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
                /*waiting till file get loaded completly*/
                let val = new ValidateTestSetFile();
                let csvRecordsArray = csvData.toString().split('\n');
                this.errorBeanArray = val.validateTestSetFileData(csvRecordsArray);
                if (this.errorBeanArray.length > 0) {
                    this.showValidationError.nativeElement.click();
                } else {
                    this.processFileData(csvData);
                    this.validate = true;
                }

            }
            reader.onerror = (e) => {
               this.fileParsingError=true;
               
            };
        } else {
            this.fileFormatInValid = true;
            this.fileReset();
        }
    }

    public showPreviewOfFile() {

        this.showPreview.nativeElement.click();
    }
    processFileData(csvData: any) {
        let csvRecordsArray = csvData.toString().split('\n');
        /*Create File Records*/
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
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
        var dataArr = []
        for (let i = 1; i < csvRecordsArray.length; i++) {
            let data = csvRecordsArray[i].split(',');
            if (data.length == headerLength) {
                var csvRecord: CSVRecord = new CSVRecord();
                csvRecord.testSetName = data[0].trim();
                console.log("Test Set Name Is:::" + csvRecord.testSetName);
                dataArr.push(csvRecord);
            }
        }
        return dataArr;
    }

    /*Upload file to server*/
    uploadFileToServer() {

        this.testSetService.pushFileToStorage(this.currentFileUpload, this.ratingProjectId).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                //this.progress.percentage = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {

                this.fileUploadedEvent.emit(true);
                console.log('File is completely uploaded!');
            }
        }, error => {
            if (error.status === 409) {
                /*Validation Fail*/
                if ((error.error) && error.error.length > 0) {
                    this.errorBeanArray = error.error;
                    this.showValidationError.nativeElement.click();
                }
            }
        }
        );
    }


    // CHECK IF FILE IS A VALID CSV FILE
    isCSVFile(file: any) {
        return file.name.endsWith(".csv");
    }


    fileReset() {
        this.validate = false;
        this.fileImportInput.nativeElement.value = "";
        this.csvRecords = [];
    }

}
export class CSVRecord {

    public testSetName: any;
    constructor() {

    }
}
