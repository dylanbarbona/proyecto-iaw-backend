import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
var cookie = require('cookie');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: (req) => {
                let token = null;
                if (req && req.cookies)
                    token = req.cookies['access_token'];
                else if(req.handshake)
                    token = cookie.parse(req.handshake.headers.cookie).access_token
                return token
            },
            signOptions: { expiresIn: '3600s' },
            secretOrKey: process.env.SECRET_JWT
        });
    }

    async validate(payload: any) {
        return payload
    }
}