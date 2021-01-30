import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';

@Injectable()
export class FollowService {

    async getFollowers(user: User){
        return await { followers: user.followers }
    }

    async getFollowings(user: User){
        return await { followings: user.followings }
    }

    async follow(loggedUser: User, user: User){
        let followingsIndex = loggedUser.followings.findIndex(following => following.user['_id'] == loggedUser._id)
        let followersIndex = user.followers.findIndex(follower => follower.user['_id'] == user._id)
        if(followingsIndex >= 0 && followersIndex >= 0){
            loggedUser.followings = loggedUser.followings.splice(followingsIndex, 0)
            user.followers = user.followers.splice(followersIndex, 0)
        } else { 
            loggedUser.followings.push({ user: user._id })
            user.followers.push({ user: loggedUser._id })
        }
        user.save()
        loggedUser.save()
        return { followings: loggedUser.followings } 
    }
}
