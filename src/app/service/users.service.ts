import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  User,
  UserDTO,
  CredentialsLogin,
} from '../components/models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    privatehttpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  register(user: UserDTO): User {
    console.log('User register');

    const newUser = {
      ...user,
      id: 'randomId',
    };

    console.log(newUser);
    return newUser;
  }

  login(credentials: CredentialsLogin) {
    const isValid = true;
    console.log('Token created');
    console.log(credentials);

    const fake_token = "1234567890'¿1234568890";
    console.log(fake_token);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }
    this.tokenService.setToken(fake_token);
    return fake_token;
  }
}
