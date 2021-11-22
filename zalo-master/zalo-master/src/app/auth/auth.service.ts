import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { StorageService } from '../service/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private storageService : StorageService
  ) {
  }
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  public isLoggedIn(): boolean {
    var isLogged = this.storageService.get("isLogin");
    if (isLogged === 'true') {
      return true;
    }
    return false;
  }
}