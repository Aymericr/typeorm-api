import {Router} from 'express';
import UserService from '@resources/users/user.service';

const Users =  new UserService();
const UsersRouter = Router();


UsersRouter.get('/', async (req, res) => {
    const users = await Users.get()
    res.send(users);
});

UsersRouter.get('/:id', async (req, res) => {
    const {id} = req.params;
    const user = await Users.findOne({id: id});
    res.send(user);
});

// UsersRouter.post('/:id', async (req, res) => {
//     res.send(user);
// });

export default UsersRouter;