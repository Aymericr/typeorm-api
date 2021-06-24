import {getRepository} from "typeorm";
import MessageEntity from './category.entity';

const CategoryService = () => getRepository(MessageEntity);

export default CategoryService;