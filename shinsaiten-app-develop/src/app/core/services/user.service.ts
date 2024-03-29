﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`http://localhost:8080/shinsaiten/users`);
    }

    getById(id: number) {
        return this.http.get(`http://localhost:8080/shinsaiten/users/` + id);
    }

    register(user: User) {
        return this.http.post(`http://localhost:8080/shinsaiten/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`http://localhost:8080/shinsaiten/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`http://localhost:8080/shinsaiten/users/` + id);
    }
}