import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.use(
        session({
            secret: process.env.SECRET_SESSION,
            resave: false,
            saveUninitialized: false,
        }),
    );

    /* Borrar */ app.use('/', express.static('src/utils'));
    await app.listen(process.env.PORT);
}
bootstrap();