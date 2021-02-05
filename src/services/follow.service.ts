import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FollowService {
    private FOLLOWERS = 'followers.user'
    private FOLLOWINGS = 'followings.user'
    private SELECTED_FIELDS = '_id username name email profile_photo'

    constructor(@InjectModel('User') readonly userModel: Model<User>){ }

    async getFollowers(username: string){
        const user = await this.userModel.findOne({ username })
            .populate({ path: this.FOLLOWERS, select: this.SELECTED_FIELDS})
        return user.followers
    }

    async getFollowings(username: string){
        const user = await this.userModel.findOne({ username })
            .populate({ path: this.FOLLOWINGS, select: this.SELECTED_FIELDS })
        return user.followings
    }

    async follow(loggedUsername: string, username: string){
        if(loggedUsername == username)
            throw new BadRequestException()
        const session = await this.userModel.startSession()
        let loggedUser = await this.userModel.findOne({ username: loggedUsername })
        try {
            session.startTransaction()
            let user = await this.userModel.findOneAndUpdate(
                { username, 'followers.user': { $nin: [loggedUser._id] } },
                { $push: { followers: { user: loggedUser._id }}},
                { useFindAndModify: false, new: true }
            ).populate({ path: this.FOLLOWERS, select: this.SELECTED_FIELDS })

            loggedUser = await this.userModel.findOneAndUpdate(
                { username: loggedUsername, 'followings.user': { $nin: [user._id]}},
                { $push: { followings: { user: user._id }}},
                { useFindAndModify: false, new: true }
            ).populate({ path: this.FOLLOWINGS, select: this.SELECTED_FIELDS })
            session.commitTransaction()
            return { loggedUser, user }
        } catch(exception){
            session.abortTransaction()
        }
        loggedUser = await loggedUser.populate({ path: this.FOLLOWINGS, select: this.SELECTED_FIELDS }).execPopulate()
        return { loggedUser }
    }

    async unfollow(loggedUsername: string, username: string){
        if(loggedUsername == username)
            throw new BadRequestException()
        const session = await this.userModel.startSession()
        let loggedUser = await this.userModel.findOne({ username: loggedUsername })
        let user = await this.userModel.findOne({ username })
        try {
            session.startTransaction()
            let user = await this.userModel.findOneAndUpdate(
                { username, 'followers.user': { $in: [loggedUser._id] } },
                { $pull: { followers: { user: loggedUser._id }}},
                { useFindAndModify: false, new: true }
            ).populate({ path: this.FOLLOWERS, select: this.SELECTED_FIELDS })

            loggedUser = await this.userModel.findOneAndUpdate(
                { username: loggedUsername, 'followings.user': { $in: [user._id] } },
                { $pull: { followings: { user: user._id }}},
                { useFindAndModify: false, new: true }
            ).populate({ path: this.FOLLOWINGS, select: this.SELECTED_FIELDS })

            session.commitTransaction()
            return { loggedUser, user }
        } catch(exception){
            session.abortTransaction()
        }
        loggedUser = await loggedUser.populate({ path: this.FOLLOWINGS, select: this.SELECTED_FIELDS }).execPopulate()
        return { loggedUser }
    }
}
