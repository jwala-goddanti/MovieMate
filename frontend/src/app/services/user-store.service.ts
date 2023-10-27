import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private readonly fullName$ = new BehaviorSubject<string>("");
  private readonly role$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRoleFromStore(): Observable<string> {
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string): void {
    this.role$.next(role);
  }

  public getFullNameFromStore(): Observable<string> {
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullname: string): void {
    this.fullName$.next(fullname);
  }
}
