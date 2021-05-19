import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

var csrf = require('csurf');

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
    private csurf

    constructor(){
        this.csurf = csrf({ 
            cookie: {
                key: '_csrf',
                path: '/',
                httpOnly: false,
                secure: false,
                signed: false,
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            }
        });
    }
    
    use(req: Request, res: Response, next: NextFunction) {
        this.csurf(req, res, next)
    }
}
