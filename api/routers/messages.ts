import {Router} from 'express';
import MessageService from '@resources/messages/message.service';

const Messages = MessageService();
const MessagesRouter = Router();


MessagesRouter.get('/', async (req, res) => {
    const results = await Messages.find()
    const messages = results.map(_ => _.content);
    res.send(messages);
});

MessagesRouter.post('/', async (req, res) => {
    const {user, content} = req.body;
    const message = Messages.create();
    message.user = user;
    message.content = content;
    await Messages.save(message);

    // socket.emit('message.created', content);

    res.send({success: true});
});

MessagesRouter.get('/:id', async (req, res) => {
    const {id} = req.params;
    const message = await Messages.findOne({id: id});
    res.send(message);
});

export default MessagesRouter;