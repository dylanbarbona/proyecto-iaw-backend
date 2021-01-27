import { CreateCommentInput, UpdateCommentInput } from "./comment.input";

export interface CreatePostInput {
    _id?: String
    user: String
    categories: String[]
    description: String
    urls: String[]
}

export interface SearchPostInput {
    _id?: String
    user?: String
    categories?: String[]
    description?: String
    createdAt_max?: Date
    createdAt_min?: Date
    updatedAt_max?: Date
    updatedAt_min?: Date
    limit?: Number
    skip?: Number
}

export interface UpdatePostInput {
    _id?: String
    user?: String
    categories?: String[]
    description?: String
    urls?: String[]
}