import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSortModule, MatSort } from '@angular/material';
import { RatingProjectListService } from '../services/rating-project-list.service';
import { RatingProjectInfo } from '../models/rating-project-info.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { CommonConstant } from '../../../shared/common-constant';
import { Page } from '../../../shared/grid-module/models/Page-Model';

@Component({
  selector: 'app-rating-project-list',
  templateUrl: './rating-project-list.component.html',
  styleUrls: ['./rating-project-list.component.css']
})
export class RatingProjectListComponent implements OnInit {
    currentPage: number;

  title = 'RatingProjectGrid';
  public PAGINATION_DROP_DOWN = CommonConstant.PAGINATION_DROP_DOWN;
  searchValue: string;
  isLoadingResults = true;
  page = new Page<RatingProjectInfo>();
  dataSource: any;
  testBrandId: string;
  testBrandName: string;
  displayedColumns: string[] = ['ratingProjectName', 'fromDate', 'toDate', 'setUp', 'execution'];
  resultsLength = 0;
  sortBy: string = 'ratingProjectName';
  order: string = 'asc';
  ratingProjectName: string;
  fromDate: string;
  toDate: string;
  currentPageSize: number = 0;
  paginationSize: number;

  isDesc: boolean = false;

  /*Constructor for dependency initialization*/
  constructor(private route: ActivatedRoute, private router: Router, private ratingProjectListService: RatingProjectListService) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit() {
    this.testBrandId = this.route.snapshot.params['testBrandId'];
    this.isLoadingResults = false;
    this.loadRatingProjectList(1, CommonConstant.DEFAULT_PAGINATION_SIZE, this.testBrandId, this.sortBy, this.order);
  }

  public ngAfterViewInit() {

      this.resultsLength = this.page.recordCount;
      this.dataSource.paginator = this.paginator;
  }

  public loadRatingProjectList(startfrom: number, numberOfRecord: number, testBrandId: string, sortBy: string, order: string) {
    this.ratingProjectListService.loadRatingProjectList(this.searchValue, startfrom, numberOfRecord, testBrandId, sortBy, order)
      .subscribe(data => {
        this.page = data;
        this.dataSource = new MatTableDataSource<RatingProjectInfo>(this.page.gridDataList);
      });
  }

  public handlePage(e: any) {
      console.log(" e.pageSize "+  e.pageSize);
      this.currentPageSize = e.pageSize;
      const startfrom = (e.pageIndex * e.pageSize) + 1;
      this.iterator(startfrom, e.pageSize, this.testBrandId, this.sortBy, this.order);
    }

  private iterator(startfrom: number, numberOfRecord: number, testBrandId: string, sortBy: string, order: string) {
    this.ratingProjectListService.loadRatingProjectList(this.searchValue, startfrom, numberOfRecord, testBrandId, sortBy, order)
      .subscribe(data => {
        this.page = data;
        this.dataSource = new MatTableDataSource<RatingProjectInfo>(this.page.gridDataList);
      });
  }

  public serchValue() {
      this.sortBy = 'ratingProjectName';
      this.isDesc = false;
      this.order = 'asc';

      this.paginationSize = 0;
      if (this.currentPageSize === 0) {
          this.paginationSize = CommonConstant.DEFAULT_PAGINATION_SIZE;
       } else {
          this.paginationSize = this.currentPageSize;
       }
      console.log('this.paginationSize is ' + this.paginationSize);

      this.ratingProjectListService.loadRatingProjectList(this.searchValue, 1, this.paginationSize, this.testBrandId, this.sortBy, this.order)
      .subscribe(data => {
        this.page = data;
        this.dataSource = new MatTableDataSource<RatingProjectInfo>(this.page.gridDataList);
        this.resultsLength = this.page.recordCount;
        this.paginator.pageIndex = 0;

      });

  }

  public loadTestSet(ratingProjectId): void {
      this.router.navigate(['user-administration/testSetList/' + ratingProjectId]);
  }

  public sortSet(column: string): void {

      this.isDesc = !this.isDesc;
      this.sortBy = column;
      this.order = this.isDesc ? 'desc' : 'asc';

      this.paginationSize = 0;
      if (this.currentPageSize === 0) {
          this.paginationSize = CommonConstant.DEFAULT_PAGINATION_SIZE;
       } else {
          this.paginationSize = this.currentPageSize;
       }
      this.loadRatingProjectList(1, this.paginationSize, this.testBrandId, this.sortBy, this.order);
      this.resultsLength = this.page.recordCount;
      this.paginator.pageIndex = 0;

  }

}
