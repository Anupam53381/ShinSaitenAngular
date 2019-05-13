
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestSet } from "../models/testset.model";
import { environment } from '../../../../environments/environment';
import { Page } from '../../../shared/grid-module/models/Page-Model';

@Injectable(

)
export class TestSetService {

  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File, ratingProjectId: string): Observable<HttpEvent<{}>> {

    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append("ratingProjectId", ratingProjectId);

    const req = new HttpRequest('POST', environment.baseUrl+'/testSet/uploadTestSet', formdata, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  addTestSet(testSet: TestSet): Observable<any> {
    return this.http.post<any>(environment.baseUrl+"/testSet/addTestSet", testSet);
  }

  isTestSetNameAvailable(testSetName: string, ratingProjectId: string): Observable<any> {
    return this.http.get<any>(environment.baseUrl+"/testSet/isTestSetNameAvailable/testSetName/" + testSetName + "/ratingProjectId/" + ratingProjectId);
  }
  
   loadTestSetList(startFrom: number, numberOfRecord: number, ratingProjectId: string): any {      
      return this.http.get<Page<TestSet>>(environment.baseUrl+'/testSet/getTestSetList' + '/' + startFrom + '/' + numberOfRecord + '/' + ratingProjectId);
    }
}

