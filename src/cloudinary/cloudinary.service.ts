import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

import * as CloudinaryLib from 'cloudinary';
import { Config } from '../config/config.keys';
import { CloudinaryFile } from './cloudinary.interface';
import { Metadata } from '../models/metadata.model';

const fs = require('fs')

export const Cloudinary = 'lib:cloudinary';

export const CloudinaryProvider: Provider = {
  provide: Cloudinary,
  useValue: CloudinaryLib.v2,
};

@Injectable()
export class CloudinaryService {
    constructor(
        private readonly _configService: ConfigService,
        @Inject(Cloudinary) private cloudinary) {
            this.setConfig()
    }

    private async setConfig(){
        this.cloudinary.config({
            cloud_name: this._configService.get(Config.CLOUDINARY_NAME),
            api_key: this._configService.get(Config.CLOUDINARY_API_KEY),
            api_secret: this._configService.get(Config.CLOUDINARY_API_SECRET)
        })
    }

    async delete(public_id: string): Promise<any> {
        return await this.cloudinary.uploader.destroy(public_id)
    }

    async submitFile(path: string, resource_type: string): Promise<Metadata>{
        let cloudinary_file = await this.cloudinary.uploader.upload(path, { resource_type: resource_type }) as Metadata
        fs.unlinkSync(path)
        return cloudinary_file
    }
}