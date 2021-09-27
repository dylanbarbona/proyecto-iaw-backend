export interface CreateCategoryInput {
    readonly name: string
    readonly description: string
}

export interface SearchCategoryInput {
    readonly _id?: string
    readonly term?: string
    readonly name?: string
    readonly limit?: number
    readonly skip?: number
}

export interface UpdateCategoryInput {
    readonly name?: string
    readonly description?: string
}