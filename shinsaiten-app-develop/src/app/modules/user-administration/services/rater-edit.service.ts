import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rater } from '../models/rater.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class RaterEditService {

    constructor(private http: HttpClient) { }

    loadRaterDetails(testBrandId: string, userId: string, mailAddress: string): Observable<Rater> {
        return this.http.get<Rater>(environment.baseUrl+'/rater/getRaterDetails/' + testBrandId + '/' + userId + '/' + mailAddress);
    }

    editRater(rater): Observable<boolean> {
        return this.http.post<boolean>(environment.baseUrl+'/rater/editRaterDetails', rater);
    }
}
