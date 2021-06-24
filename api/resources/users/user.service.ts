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

    public create = async (data) => {
        let result, error;
        try {
            const user = this.repository.create(data);
            await this.repository.save(user);
            result = true;
            return [result, error]
        } catch (error) {
            console.log(error);
            return [result, error]

        }

    };
}

// const UserService = getRepository(UserEntity);
// export default UserService;
