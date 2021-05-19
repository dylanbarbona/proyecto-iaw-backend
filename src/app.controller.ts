import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    get(@Res() res: Response) {
        res.status(HttpStatus.OK).sendFile('index.html', {
            root: 'src/utils'
        });
    }
}