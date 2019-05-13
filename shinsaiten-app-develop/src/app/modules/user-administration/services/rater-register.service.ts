import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Rater } from '../models/rater.model';
import { environment } from '../../../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders( { 'Content-Type': 'application/json' } )
};

@Injectable()
export class RaterRegisterService {

    constructor( private http: HttpClient ) { }

    createRater(rater): Observable<Rater> {
        return this.http.post<Rater>(environment.baseUrl+'/rater', rater);
      }


    public validateEmail(rater) {
        return this.http.post(environment.baseUrl+'/rater/validate', rater);
      }
}
