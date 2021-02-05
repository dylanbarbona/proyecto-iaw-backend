import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ControllersModule } from './controllers/controllers.module';
import { ModelsModule } from './models/models.module';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { GatewaysModule } from './gateways/gateways.module';
import { InterceptorsModule } from './interceptors/interceptors.module';

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
