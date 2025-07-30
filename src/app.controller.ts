import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  //UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowercasePipe } from './common/pipes/string-to-lowercase.pipe';
import { AuthGuard } from './common/guards/auth.guard';
import { UserAgent } from './common/decorators/user-agent.decorator';
//import { ResponseInteceptor } from './common/interceptors/response.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @UsePipes(StringToLowercasePipe)
  @Post()
  create(@Body('title') title: string) {
    return `Movie: ${title}`;
  }
  @UseGuards(AuthGuard)
  //@UseInterceptors(ResponseInteceptor)
  @Get('@me')
  getProfile(@UserAgent() userAgent: string) {
    return {
      id: 1,
      username: 'coder',
      email: 'sup@coder.ua',
      userAgent,
    };
  }
}
