import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import projectConfig from './project.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            load: [projectConfig]
        })
    ]
})
export class ConfigurationModule {}