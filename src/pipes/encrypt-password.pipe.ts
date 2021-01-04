import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config/config.keys';


@Injectable()
export class EncryptPasswordPipe implements PipeTransform<any, any> {
    constructor(private readonly _configService: ConfigService){ }
    
    transform(value: any, metadata: ArgumentMetadata) {
        if(value.password != null){
            let salt = Number.parseInt(this._configService.get(Config.SECRET_SALT))
            let encryptedPassword = bcrypt.hashSync(value.password, salt)
            return { ...value, password: encryptedPassword }
        }
        return value
    }    
}