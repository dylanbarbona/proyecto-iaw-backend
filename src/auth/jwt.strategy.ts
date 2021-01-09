import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: (req) => {
                let token = null;
                if (req && req.cookies)
                    token = req.cookies['bearer_token'];
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