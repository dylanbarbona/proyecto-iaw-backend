import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service';
import { ServicesModule } from 'src/services/services.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        ServicesModule,
        PassportModule,
        JwtModule.register({
            signOptions: { expiresIn: '24h' },
            secret: process.env.SECRET_JWT
        }),
    ],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {}
