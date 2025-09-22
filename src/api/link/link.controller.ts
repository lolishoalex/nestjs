import { Body, Controller, Post } from '@nestjs/common';
import { LinkService } from './link.service';
import { Authorization, Authorized } from 'src/common/decorators';
import { CreateLinkDto } from './dto';

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Authorization()
  @Post()
  async create(@Body() dto: CreateLinkDto, @Authorized('id') id: string) {
    return await this.linkService.create(dto, id);
  }
}
