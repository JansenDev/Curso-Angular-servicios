export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
}

export interface UserDTO extends Omit<User, 'id'> {}

export interface CredentialsLogin extends Omit<User, 'id' | 'name'> {}
