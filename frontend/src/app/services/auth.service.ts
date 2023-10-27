import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://localhost:44348/api/User/';
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  signIn(loginObj: any) {
    
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);

  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodedToken() {
    const token = this.getToken();
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const decodedPayload = atob(tokenParts[1]);
        return JSON.parse(decodedPayload);
      }
    }
    return null;
  }

  getfullNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.name; // Assuming 'name' is the field in your JWT payload
    }
    this.setUsername(this.userPayload.name); 
    return this.getUsername();
  }

 
 
   getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role;
    }
  }

  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi);
  }

  setUsername(username: string) {
    this.userPayload = { name: username };
  }

  getUsername() {
    if (this.userPayload) {
      return this.userPayload.name;
    }
    return null;
  }
}
