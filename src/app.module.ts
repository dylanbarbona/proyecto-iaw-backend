import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryModule } from './database/cloudinary/cloudinary.module';
import { ConfigModule } from './config/config.module';
import { ControllersModule } from './controllers/controllers.module';
import { DatabaseModule } from './database/database.module';
import { DecoratorsModule } from './decorators/decorators.module';
import { GuardsModule } from './guards/guards.module';

@Module({
  imports: [
    CloudinaryModule, 
    ConfigModule, 
    ControllersModule, 
    DatabaseModule, 
    DecoratorsModule, 
    GuardsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
