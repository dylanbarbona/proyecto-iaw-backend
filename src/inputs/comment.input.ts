export interface CreateCommentInput {
    user: String
    text: String
}

export interface SearchCommentInput {
    _id?: String
    user?: String
    createdAt_max?: Date
    createdAt_min?: Date
    updatedAt_max?: Date
    updatedAt_min?: Date
    limit?: Number
    skip?: Number
}

export interface UpdateCommentInput {
    text: String
}

export interface DeleteCommentInput {
    _id: String
    user: String
}