import { Component } from '@angular/core';
import {
  CredentialsLogin,
  User,
  UserDTO,
} from './components/models/user.model';
import { FileService } from './service/file.service';
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
  imageUploadSrc = '';

  constructor(
    private userService: UsersService,
    private fileService: FileService
  ) {}

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

  dowloadFile() {
    this.fileService
      .getFile(
        'My file from code.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  uploadFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.item(0);

    console.log(file);
    this.imageUploadSrc = '';
    if (file) {
      this.fileService.uploadFile(file).subscribe((uploadResult) => {
        console.log(uploadResult);

        this.imageUploadSrc = uploadResult.location;
      });
    }
  }
}
