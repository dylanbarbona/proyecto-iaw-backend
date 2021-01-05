import { Module } from '@nestjs/common';
import { CloudinaryService, CloudinaryProvider } from './cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    providers: [CloudinaryProvider, CloudinaryService],
    exports: [CloudinaryProvider, CloudinaryService]
})
export class CloudinaryModule {}
