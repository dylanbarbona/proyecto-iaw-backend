import { UserDTO } from "./user.dto"
import { CategoryDTO } from "./category.dto"
import { CommentDTO } from "./comment.dto"

export interface PostDTO {
    _id: string
    user: UserDTO
    categories: CategoryDTO[]
    description: string
    urls: string[]
    createdAt: Date
    updatedAt: Date
    comments: CommentDTO[]
}