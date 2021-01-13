import { User, Role } from "../models/user.model";

export class UserDTO {
  username: string
  name: string
  email: string
  birthday: Date
  profile_photo: string
  biography: string
  social_networks: {
      facebook: string,
      instagram: string,
      twitter: string,
      youtube: string,
      linkedin: string
  }
  roles: Role[]
}