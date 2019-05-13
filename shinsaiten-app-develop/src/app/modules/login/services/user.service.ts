import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  public getUsers() {
    return this.http.get<User[]>(environment.baseUrl+'/user');
  }

  public deleteUser(user) {
    return this.http.delete(environment.baseUrl+'/user/1');
  }

  createUser(user): Observable<User> {
    return this.http.post<User>(environment.baseUrl+'/user', user);
  }

  public loginUser(user) {
    const Indata = { 'usernameOrEmail': btoa(user.userId), 'password': btoa(user.password) };environment.baseUrl
    return this.http.post(environment.baseUrl+'/api/auth/signin', Indata);
  }
}
