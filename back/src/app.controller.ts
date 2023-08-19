import { HttpStatus, Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {

  @Get()
  getMain(@Res() res) {
    return res.status(HttpStatus.OK).json('hello server opened k-log');
  }
}