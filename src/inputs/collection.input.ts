export interface CreateCollectionInput {
    _id?: string
    user: string
    posts: string[]
}

export interface SearchCollectionInput {
    _id?: string
    user: string
}

export interface UpdateCollectionInput {
    post: string
}