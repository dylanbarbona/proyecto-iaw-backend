import { Length, IsEmail } from 'class-validator';

export class UserInput {
    readonly name: string
    readonly username: string
    readonly email: string
    readonly birthday: Date
    readonly biography: string
    readonly followings: string[]
    readonly followers: string[]
    readonly social_networks: {
      facebook: string,
      instagram: string,
      twitter: string,
      youtube: string,
      linkedin: string
    }
    readonly google_login: boolean
    readonly facebook_login: boolean
}