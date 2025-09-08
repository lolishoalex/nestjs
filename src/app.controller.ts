import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('artists/:id')
  /*   findAll() {
    return this.appService.hello();
  } */
  async getArtist(@Param('id') id: string) {
    return this.appService.getArtist(id);
  }
  @Get('albums/:id')
  async getAlbum(@Param('id') id: string) {
    return this.appService.getAlbum(id);
  }
}
