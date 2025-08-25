import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: 1, username: 'joe', email: 'joe@gmail.com' },
    { id: 2, username: 'bob', email: 'bob@gmail.com' },
    { id: 3, username: 'hit', email: 'hit@gmail.com' },
  ];

  findAll() {
    return this.users;
  }
}
