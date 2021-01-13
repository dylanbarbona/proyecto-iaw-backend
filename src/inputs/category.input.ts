export interface CreateCategoryInput {
    readonly name: string
    readonly description: string
}

export interface SearchCategoryInput {
    readonly _id?: string
    readonly name?: string
}

export interface UpdateCategoryInput extends CreateCategoryInput {}