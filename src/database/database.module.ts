import { Module } from '@nestjs/common';
import { DatabaseConfig } from './database.config';

@Module({
    imports: [DatabaseConfig.getInstance().getDatabaseProviders()]
})
export class DatabaseModule {}