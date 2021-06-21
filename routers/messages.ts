import {Router} from 'express';
import MessageService from '@resources/messages/message.service';

const Messages = MessageService();
const MessagesRouter = Router();


MessagesRouter.get('/', async (req, res) => {
    const users = await Messages.find()
    res.send(users);
});

MessagesRouter.get('/:id', async (req, res) => {
    const {id} = req.params;
    const user = await Messages.findOne({id: id});
    res.send(user);
});

export default MessagesRouter;