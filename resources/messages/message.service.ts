import {getRepository, getConnection, EntityRepository} from "typeorm";
import MessageEntity from './message.entity';

const MessageService = () => getRepository(MessageEntity);

export default MessageService;