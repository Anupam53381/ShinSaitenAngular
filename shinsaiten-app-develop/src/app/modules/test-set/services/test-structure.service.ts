import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable()
export class TestStructureService {
  private rootUrl = '/api/addRatingItems';

  constructor(private http: HttpClient) { }

  public saveBulkTestSetStructure(testSetStructureList: any, testSetId: string): Observable<HttpResponse<any>> {

    return this.http.post<any>(environment.baseUrl + this.rootUrl + '/' + testSetId, testSetStructureList, { observe: 'response' });
  }


}
