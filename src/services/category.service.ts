import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../models/category.model';
import { SearchCategoryInput, CreateCategoryInput, UpdateCategoryInput } from '../inputs/category.input';
import { CategoryDTO } from '../dto/category.dto';

@Injectable()
export class CategoryService {

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>){ }

    async getAll(input: SearchCategoryInput): Promise<CategoryDTO[]> {
        return await this.categoryModel.find(input)
    }

    async get(input: SearchCategoryInput): Promise<CategoryDTO> {
        return await this.categoryModel.findOne(input)
    }

    async create(input: CreateCategoryInput): Promise<CategoryDTO> {
        return await new this.categoryModel(input).save()
    }

    async update(search: SearchCategoryInput, input: UpdateCategoryInput): Promise<CategoryDTO> {
        return await this.categoryModel.findOneAndUpdate(search, input)
    }

    async delete(input: SearchCategoryInput): Promise<CategoryDTO> {
        return await this.categoryModel.findOneAndDelete(input)
    }
}