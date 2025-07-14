import { Injectable } from '@nestjs/common';

/* @Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
} */

//json format
@Injectable()
export class AppService {
  getHello() {
    return { message: 'Welcome World!' };
  }
}
