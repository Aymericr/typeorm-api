import {getRepository, getConnection, EntityRepository} from "typeorm";
import MessageEntity from './category.entity';

const CategoryService = () => getRepository(MessageEntity);

export default CategoryService;