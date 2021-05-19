import { Injectable } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Config } from '../config/config.keys';

@Injectable()
export class DatabaseConfig {
    private static instance: DatabaseConfig

    private constructor(){}

    public static getInstance(){
        if(this.instance == null)
            this.instance = new DatabaseConfig()
        return this.instance
    }

    public getDatabaseProviders(){
        return MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: this.getFactory
        })
    }

    private async getFactory(_configService: ConfigService): Promise<MongooseModuleOptions>{
        const user = _configService.get(Config.MONGODB_USER)
        const password = _configService.get(Config.MONGODB_PASSWORD)
        const cluster = _configService.get(Config.MONGODB_CLUSTER)
        const database = _configService.get(Config.MONGODB_DATABASE)
        const options = _configService.get(Config.MONGODB_OPTIONS)
        const URI =  `mongodb+srv://${user}:${password}@${cluster}/${database}?${options}`

        return {
            uri: URI,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectionFactory: (connection) => {
                connection.plugin(require('mongoose-autopopulate'));
                return connection;
            }
        } as MongooseModuleOptions
    }
}