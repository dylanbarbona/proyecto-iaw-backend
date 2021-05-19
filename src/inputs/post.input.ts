import { Metadata } from "../models/metadata.model";

export interface CreatePostInput {
    _id?: string
    user: string
    files?: string[]
    categories: string[]
    description: string
    urls: string[]
    metadata?: Metadata[]
}

export interface SearchPostInput {
    _id?: string
    user?: string
    categories?: string[]
    description?: string
    createdAt_max?: Date
    createdAt_min?: Date
    updatedAt_max?: Date
    updatedAt_min?: Date
    limit?: number
    skip?: number
}

export interface UpdatePostInput extends Document{
    metadata?: Metadata[]
    addFiles?: string[]
    deleteFiles?: string[]
    deleteCategories?: string[]
    addCategories?: string[]
    description?: string
}