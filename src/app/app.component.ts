import { Component } from '@angular/core';
import {
  CredentialsLogin,
  User,
  UserDTO,
} from './components/models/user.model';
import { UsersService } from './service/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'componentes-servicios';
  user = 'Jhonatan';
  image = 'https://www.w3schools.com/howto/img_avatar.png';
  inParent = '';

  constructor(private userService: UsersService) {}

  onLoaded(data: string) {
    console.log('log Padre');
    console.log(data);
    this.inParent = data;
  }

  register(): User {
    const newUser: UserDTO = {
      name: 'Jhonatan segura DTO',
      username: 'janssen',
      password: '12345',
    };
    return this.userService.register(newUser);
  }

  login() {
    const credenciales: CredentialsLogin = {
      username: 'janssen',
      password: '12345',
    };
    return this.userService.login(credenciales);
  }
}
