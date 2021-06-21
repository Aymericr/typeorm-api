// https://github.com/bautistaj/expressApi/blob/main/src/services/post.service.ts
import {getRepository, Repository} from "typeorm";
import UserEntity from './user.entity';

export default class UserService {
    private repository: Repository<UserEntity>;

    constructor() {
        this.repository =  getRepository(UserEntity);
    }

    public get = async () => {
        return await this.repository.find();
    }

    public findOne = async (options) => this.repository.findOne(options);
}

// const UserService = getRepository(UserEntity);
// export default UserService;
