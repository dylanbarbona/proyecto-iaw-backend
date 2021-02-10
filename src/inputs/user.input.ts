import { Length, IsEmail } from 'class-validator';
import { Role } from '../models/user.model';

export interface CreateUserInput {
    readonly name: string
    readonly username: string
    readonly email: string
    readonly birthday: Date
    readonly profile_photo: string
    readonly biography: string
    readonly password: string
    readonly social_networks: {
      facebook: string,
      instagram: string,
      twitter: string,
      youtube: string,
      linkedin: string
    }
    readonly google_login: boolean
    readonly facebook_login: boolean
    readonly roles: Role[]
    readonly file?: string
}

export interface SearchUserInput {
    readonly _id?: string
    readonly skip?: number
    readonly limit?: number
    readonly name?: string
    readonly username?: string
    readonly email?: string
    readonly birthday_min?: Date
    readonly birthday_max?: Date
}

export interface UpdateUserInput {
    readonly name?: string
    readonly username?: string
    readonly email?: string
    readonly birthday?: Date
    readonly profile_photo?: string
    readonly biography?: string
    readonly password?: string
    readonly social_networks?: {
      facebook?: string,
      instagram?: string,
      twitter?: string,
      youtube?: string,
      linkedin?: string
    }
    readonly roles?: Role[]
    readonly file?: string
}