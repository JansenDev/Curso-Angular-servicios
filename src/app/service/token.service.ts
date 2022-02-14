import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  TOKEN_KEY = 'TOKEN';

  constructor() {}

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(){
    return localStorage.getItem(this.TOKEN_KEY)
  }

}
