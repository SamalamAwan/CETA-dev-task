import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from "./User";

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`https://jsonplaceholder.typicode.com/users`)
  }

  createUser(name: string, email: string, address:{suite: string, street: string, city: string, zipcode:string}, website:string): Observable<User[]>{
    return this.http.post<User[]>(`https://jsonplaceholder.typicode.com/users`,{
      name, email, address, website
    })
  }


}
