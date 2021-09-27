import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../models/category.model';
import { SearchCategoryInput, CreateCategoryInput, UpdateCategoryInput } from '../inputs/category.input';

@Injectable()
export class CategoryService {
    private readonly EMPTY_STRING = ''
    private readonly LIMIT = 10
    private readonly SKIP = 0

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>){ }

    async getAll(search: SearchCategoryInput): Promise<Category[]> {
        return await this.categoryModel.find({
            name: { $regex:  `${search.name || search.term || this.EMPTY_STRING}` },
        }).limit(Number(search.limit) || this.LIMIT).skip(Number(search.skip) || this.SKIP)
    }

    async get(input: SearchCategoryInput): Promise<Category> {
        return await this.categoryModel.findOne(input)
    }

    async create(input: CreateCategoryInput): Promise<Category> {
        return await new this.categoryModel(input).save()
    }

    async update(search: SearchCategoryInput, input: UpdateCategoryInput): Promise<Category> {
        return await this.categoryModel.findOneAndUpdate(search, input)
    }

    async delete(input: SearchCategoryInput): Promise<Category> {
        return await this.categoryModel.findOneAndDelete(input)
    }
}