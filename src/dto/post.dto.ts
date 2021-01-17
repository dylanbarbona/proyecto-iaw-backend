import { UserDTO } from "./user.dto"
import { CategoryDTO } from "./category.dto"

export interface PostDTO {
    _id: string
    user: UserDTO
    categories: CategoryDTO[]
    description: string
    urls: string[]
    createdAt: Date
    updatedAt: Date
}