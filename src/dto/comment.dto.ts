import { UserDTO } from "./user.dto";

export interface CommentDTO {
    _id: String
    user: UserDTO
    text: String
    createdAt: Date
    updatedAt: Date
}