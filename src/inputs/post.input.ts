export interface CreatePostInput {
    _id?: string
    user: string
    categories: string[]
    description: string
    urls: string[]
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

export interface UpdatePostInput {
    _id?: string
    user?: string
    categories?: string[]
    description?: string
    urls?: string[]
}