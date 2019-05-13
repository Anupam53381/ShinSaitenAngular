import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AddTestSetComponent } from './add-test-set/add-test-set.component';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { UploadTestsetComponent } from './upload-testset/upload-testset.component';
import { CommonConstant } from '../../../shared/common-constant';
import { TestSet } from '../models/testset.model';
import { Page } from '../../../shared/grid-module/models/Page-Model';
import { TestSetService } from '../services/test-set.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'app-test-set-list',
    templateUrl: './test-set-list.component.html',
    styleUrls: ['./test-set-list.component.css']
})
export class TestSetListComponent implements OnInit {

    @ViewChild(AddTestSetComponent) addTestComponent: AddTestSetComponent;

    @ViewChild('modelUploadTestSetcsv') modelUploadTestSetcsv: ElementRef;

    @ViewChild(UploadTestsetComponent) uploadTestSetComponent: UploadTestsetComponent;

    @ViewChild(MatPaginator) paginator: MatPaginator;  
    
    readonly CommonConstant: typeof CommonConstant = CommonConstant;

    title = 'TestSetListGrid';
    public PAGINATION_DROP_DOWN = CommonConstant.PAGINATION_DROP_DOWN;
    fileUploadedSuccessfully = false;
    isLoadingResults = true;
    page = new Page<TestSet>();
    dataSource: any = null;
    isSuccess = false;
    testSetName = '';
    testBrandId = '';
    ratingProjectId = '';
    displayedColumns: string[] = ['testSetNameData', 'testStructureStatus', 'ratingStructureStatus', 'testImageStatus', 'qcStatus','importExportStatus'];
    resultsLength = 0;
        
    constructor(private route: ActivatedRoute, private router: Router, private testSetService: TestSetService) {
    }

     ngOnInit() {                
        this.ratingProjectId = this.route.snapshot.params['ratingProjectId'];
        this.uploadTestSetComponent.setRatingProjectId(this.ratingProjectId);
        
        this.isLoadingResults = false;
        this.loadTestSetList(1, CommonConstant.DEFAULT_PAGINATION_SIZE, this.ratingProjectId);
    }

    public ngAfterViewInit() {      
        this.resultsLength = this.page.recordCount;
    }

    public handlePage(e: any) {              
        var startFrom = (e.pageIndex * e.pageSize) + 1;      
        this.iterator(startFrom, e.pageSize);
    }

    private iterator(startFrom: number, numberOfRecord: number) {        
        this.refreshTestSetList(startFrom, numberOfRecord,this.ratingProjectId, true);       
      }

    fileUploadedEventHandler($event) {        
        var currentPageIndex = 0;
        var currentPageSiz = CommonConstant.DEFAULT_PAGINATION_SIZE;
        if(this.paginator !== undefined){
            currentPageIndex = this.paginator._pageIndex;
            currentPageSiz = this.paginator.pageSize;
        }

        var startFrom = (currentPageIndex * currentPageSiz) + 1;
        this.refreshTestSetList(startFrom, currentPageSiz , this.ratingProjectId, false); 
        this.fileUploadedSuccessfully = true;        
    }

    openCsvFileUploadPop() {        
        this.isSuccess = false;
        this.fileUploadedSuccessfully = false;
        this.uploadTestSetComponent.fileReset();
        this.modelUploadTestSetcsv.nativeElement.click();
    }

    showAddTestSetComponent() {      
        this.isSuccess = false;
        this.fileUploadedSuccessfully = false;
        this.addTestComponent.formReset(this.ratingProjectId);
    }

    onSuccess(data: any) {
        var currentPageIndex = 0;
        var currentPageSiz = CommonConstant.DEFAULT_PAGINATION_SIZE;
        if(this.paginator !== undefined){
            currentPageIndex = this.paginator._pageIndex;
            currentPageSiz = this.paginator.pageSize;
        }
        var startFrom = (currentPageIndex * currentPageSiz) + 1;
        this.refreshTestSetList(startFrom, currentPageSiz , this.ratingProjectId, false); 

        this.isSuccess = true;
        this.testSetName = data.testSetName;            
    }
    
    ngAfterViewChecked(){        
       // this.isSuccess = false;
       // this.fileUploadedSuccessfully = false;
    }

    public loadTestSetList(startFrom: number, numberOfRecord: number, ratingProjectId: string) {   
        this.testSetService.loadTestSetList(startFrom, numberOfRecord, ratingProjectId)
          .subscribe(data => {
            this.page = data;
            this.dataSource = new MatTableDataSource<TestSet>(this.page.gridDataList);
            this.dataSource.paginator = this.paginator;  
            this.resultsLength = this.page.recordCount;         
            console.log("this.page.recordCount ======"+this.page.recordCount);
          });
      }
    
      public refreshTestSetList(startFrom: number, numberOfRecord: number, ratingProjectId: string, msgClearFlag: boolean) {            
        if(msgClearFlag){
            this.isSuccess = false;
            this.fileUploadedSuccessfully = false;
        }

        this.testSetService.loadTestSetList(startFrom, numberOfRecord, ratingProjectId)
          .subscribe(data => {
            this.page = data;
            this.dataSource = new MatTableDataSource<TestSet>(this.page.gridDataList);                         
            this.resultsLength = this.page.recordCount;         
            console.log("this.page.recordCount ======"+this.page.recordCount);
          });
      }  
    
    loadTestSetStructure(testSetId,testSetName):void{        
        this.router.navigate(['/test-set/test-set-structure/' + testSetId + '/'  +testSetName + '/' +this.ratingProjectId]);
    }
}
