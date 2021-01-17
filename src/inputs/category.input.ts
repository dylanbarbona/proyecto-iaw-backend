export interface CreateCategoryInput {
    readonly name: string
    readonly description: string
}

export interface SearchCategoryInput {
    readonly _id?: string
    readonly name?: string
    readonly limit?: number
    readonly skip?: number
}

export interface UpdateCategoryInput extends CreateCategoryInput {
    readonly _id?: string
}