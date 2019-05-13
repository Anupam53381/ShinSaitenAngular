import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { RaterListService } from '../services/rater-list-service.service';
import { RaterInfo } from '../models/rater-info.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonConstant } from '../../../shared/common-constant';
import { Page } from '../../../shared/grid-module/models/Page-Model';

@Component({
  selector: 'app-rater-list',
  templateUrl: './rater-list.component.html',
  styleUrls: ['./rater-list.component.css']

})
export class RaterListComponent implements OnInit {
  title = 'GridViewExample';
  public PAGINATION_DROP_DOWN = CommonConstant.PAGINATION_DROP_DOWN;
  searchValue: string;
  isLoadingResults = true;
  page = new Page<RaterInfo>();
  dataSource: any = null;
  testBrandId: string;
  testBrandName: string;
  displayedColumns: string[] = ['mailAddress', 'firstName', 'lastName', 'middleName', 'assigment', 'edit'];
  resultsLength = 0;
  successMsgFlag: boolean;
  updateMsgFlag: boolean;

  /*Constructor for dependency initialization*/
  constructor(private route: ActivatedRoute, private router: Router, private raterListService: RaterListService) {
    /*this.testBrandId = '2';
    this.testBrandName = 'aaaa';*/
    this.testBrandId = this.route.snapshot.params['testBrandId'];
    this.testBrandName = this.route.snapshot.params['testBrandName'];    
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {

    this.isLoadingResults = false;
    this.loadRatetList(1, CommonConstant.DEFAULT_PAGINATION_SIZE);
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to false if no query param provided.
        this.successMsgFlag = params['successMsgFlag'] || false;
        this.updateMsgFlag = params['updateMsgFlag'] || false;
      });      
  }

  public ngAfterViewInit() {

    this.resultsLength = this.page.recordCount;
  }


  public loadRatetList(startfrom: number, numberOfRecord: number) {
    this.raterListService.loadRaterList(this.searchValue, startfrom, numberOfRecord)
      .subscribe(data => {
        this.page = data;
        this.dataSource = new MatTableDataSource<RaterInfo>(this.page.gridDataList);
        this.dataSource.paginator = this.paginator;
        this.resultsLength = this.page.recordCount;
      });
  }



  public handlePage(e: any) {
    var startfrom = (e.pageIndex * e.pageSize) + 1;
    this.iterator(startfrom, e.pageSize);
  }

  private iterator(startfrom: number, numberOfRecord: number) {
    this.raterListService.loadRaterList(this.searchValue, startfrom, numberOfRecord)
      .subscribe(data => {
        this.page = data;
        this.dataSource = new MatTableDataSource<RaterInfo>(this.page.gridDataList);
      });
  }
  public serchValue() {
    this.isLoadingResults = true;
    this.raterListService.loadRaterList(this.searchValue, 1, CommonConstant.DEFAULT_PAGINATION_SIZE)
      .subscribe(data => {
        this.isLoadingResults = false;
        this.page = data;
        this.dataSource = new MatTableDataSource<RaterInfo>(this.page.gridDataList);
        this.dataSource.paginator = this.paginator;
        this.resultsLength = this.page.recordCount;
      });
  }

  public assignOrDeAssignTestBrandToRater($event, userId: string) {

    var mappingFlag = $event.checked ? 'T' : 'F';
    this.raterListService.assignOrDeAssignTestBrandToRater(userId, this.testBrandId, mappingFlag).subscribe();

  }

  public isTestBrandAssign(testBrandString: string) {
    if (testBrandString) {
      var x = new Array();
      x = testBrandString.split(",");
      if (x.indexOf(this.testBrandId) > -1) {
        return true;
      }
    }
    return false;
  }

  loadRaterRegister(): void {

    this.router.navigate(['/user-administration/rater-register'], { queryParams: { testBrandName: this.testBrandName, testBrandId: this.testBrandId } });
  }

  loadRaterEdit(testBrandId, userId, mailAddress): void {
    this.router.navigate(['/user-administration/raterEdit/' + testBrandId + '/' + userId + '/' + mailAddress],
      { queryParams: { testBrandName: this.testBrandName } });
  }

}

