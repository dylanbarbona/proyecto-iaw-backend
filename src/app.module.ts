import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryModule } from './database/cloudinary/cloudinary.module';
import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ControllersModule } from './controllers/controllers.module';
import { DecoratorsModule } from './decorators/decorators.module';
import { GuardsModule } from './guards/guards.module';
import { ModelsModule } from './models/models.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ConfigurationModule, 
    ControllersModule,
    DatabaseModule, 
    CloudinaryModule, 
    DecoratorsModule, 
    GuardsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
