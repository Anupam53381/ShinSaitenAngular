import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MenuInfo } from '../models/menu-info.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MenuService {
  constructor(private http: HttpClient) { }

  public loadMenu() {
    return this.http.get<MenuInfo[]>(environment.baseUrl+'/api/menu');
  }

  public loadRatingScreen(testBrandId, testBrandDisplayName) {
    return this.http.get(environment.baseUrl+'/rating/firstRatingUnitOfBlock/' + testBrandId + '/' + testBrandDisplayName);
  }
}
