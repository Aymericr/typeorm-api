// https://github.com/bautistaj/expressApi/blob/main/src/services/post.service.ts
import {getRepository} from "typeorm";
import UserEntity from './user.entity';

const UserService = () => getRepository(UserEntity);

export default UserService;