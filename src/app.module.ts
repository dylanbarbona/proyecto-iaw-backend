import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ControllersModule } from './controllers/controllers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigurationModule, 
    ControllersModule,
    DatabaseModule, 
    CloudinaryModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
