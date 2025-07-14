import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Controller('movies')
export class MovieController {
  @Get()
  findAll(@Query() query: any) {
    return JSON.stringify(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return { id };
  }

  @Post()
  create(@Body() body: { title: string; genre: string }) {
    return body;
  }

  @Get('headers')
  getHeaders(@Headers() headers: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return headers;
  }

  @Get('user-agent')
  getUserAgent(@Headers('user-agent') userAgent: string) {
    return { userAgent };
  }

  @Get('request')
  getRequestDetails(@Req() req: Request) {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
      params: req.params,
    };
  }

  @Get('response')
  getResponseDetails(@Res() res: Response) {
    res.status(201).json({ message: 'Hello' });
  }
}
