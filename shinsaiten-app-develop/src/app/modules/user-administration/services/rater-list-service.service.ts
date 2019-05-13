import { Injectable, Testability } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observer, Observable } from 'rxjs';

import { RaterInfo } from '../models/rater-info.model';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../shared/grid-module/models/Page-Model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept-Charset': 'charset=utf-8' })

};

@Injectable()
export class RaterListService {
  page = new Page<RaterInfo>();

  constructor(private http: HttpClient) { }

  loadRaterList(searchValue: string, startFrom: number, numberOfRecord: number): Observable<Page<RaterInfo>> {

    var queryString = "";
    if (searchValue) {
      queryString = "?searchValue=" + searchValue;
    }

    return this.http.get<Page<RaterInfo>>(environment.baseUrl+'/rater/getRaterList' + '/' + startFrom + '/' + numberOfRecord + queryString);
  }

  assignOrDeAssignTestBrandToRater(userId: string, testBrandId: string, mappingFlag: string): Observable<boolean> {

    return this.http.get<boolean>(environment.baseUrl+'/rater/setUserTestbrandMapping' + '/' + userId + '/' + testBrandId + '/' + mappingFlag);

  }



}


