import { CreateCommentInput, UpdateCommentInput } from "./comment.input";
import { Metadata } from "../models/metadata.model";

export interface CreatePostInput {
    _id?: String
    user: String
    categories: String[]
    description: String
    urls: String[]
    metadata: Metadata[]
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
    metadata: Metadata[];
    _id?: String
    user?: String
    categories?: String[]
    description?: String
    urls?: String[]
}