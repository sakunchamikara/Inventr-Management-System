import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/SptingMVCJava';
  constructor(private httpClient: HttpClient) {}

  public login(user: User): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/login`, user);
  }

  isUserLoggeIn() {
    const flag = window.sessionStorage.getItem('isUserLoggeIn');
    if (flag === 'true') {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    window.sessionStorage.setItem('isUserLoggeIn', 'false');
  }
}
