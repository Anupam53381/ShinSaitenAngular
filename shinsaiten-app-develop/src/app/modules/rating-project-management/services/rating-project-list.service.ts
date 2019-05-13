import { Injectable, Testability } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observer, Observable } from 'rxjs';

import { RatingProjectInfo } from '../models/rating-project-info.model';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../shared/grid-module/models/Page-Model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept-Charset': 'charset=utf-8' })
};

@Injectable()
export class RatingProjectListService {

  page = new Page<RatingProjectInfo>();

  constructor(private http: HttpClient) { }

  loadRatingProjectList(searchValue: string, startFrom: number, numberOfRecord: number, testBrandId: string,
          sortBy: string, order: string): Observable<Page<RatingProjectInfo>> {

    let queryString = '';
    if (searchValue) {
      queryString = '?searchValue=' + searchValue;
    }

    return this.http.get<Page<RatingProjectInfo>>(environment.baseUrl + '/ratingProject/getRatingProjectList'
            + '/' + startFrom + '/' + numberOfRecord + '/' + testBrandId + '/' + sortBy + '/' + order + queryString);
  }

}
