import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import * as express from 'express';

var bodyParser = require('body-parser')
const path = require('path');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    //Prefijo /api
    app.setGlobalPrefix('api')

    //Ruta base src
    app.use('/', express.static('src'));
    
    //Para limitar el tamaño de las imágenes
    app.use(bodyParser.json({ limit: '50mb' }))
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

    app.enableCors({ origin: JSON.parse(process.env.HOST), credentials: true });
    app.use(cookieParser(process.env.SECRET_COOKIE));

    await app.listen(process.env.PORT);
}
bootstrap();