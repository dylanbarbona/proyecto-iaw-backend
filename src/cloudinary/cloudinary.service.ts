import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

import * as CloudinaryLib from 'cloudinary';
import { Config } from '../config/config.keys';
import { CloudinaryFile } from './cloudinary.interface';
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

    async delete(public_id: string): Promise<CloudinaryFile> {
        return await this.cloudinary.uploader.destroy(public_id)
    }

    async submitFile(file: any): Promise<CloudinaryFile>{
        let cloudinary_file = await this.cloudinary.uploader.upload(file.path, { resource_type: this.getFileFormat(file.mimetype) }) as CloudinaryFile
        fs.unlinkSync(file.path)
        return cloudinary_file
    }

    private getFileFormat(mimetype: string): string{
        return mimetype.split('/')[0]
    }
}