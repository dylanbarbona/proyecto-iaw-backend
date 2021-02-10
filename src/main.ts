import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
var bodyParser = require('body-parser')
const path = require('path');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api')
    app.use(cookieParser());
    app.use(
        session({
            secret: process.env.SECRET_SESSION,
            resave: false,
            saveUninitialized: false,
        }),
    );
    app.use(bodyParser.json({ limit: '10mb' }))
    app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

    
    app.use('/', express.static('src'));

    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true
    });
    await app.listen(process.env.PORT);
}
bootstrap();