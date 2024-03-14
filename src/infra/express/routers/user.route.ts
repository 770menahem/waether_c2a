import * as express from 'express';
import { createSchema, updateSchema } from '../../../services/dtos/user.schema';
import { IUserController } from '../controllers/userController.interface';

import validateRequest from '../joi/joi';
import { wrapController } from '../utils/wraps';
import { BaseRouter } from './baseRouter';

class UserRouter extends BaseRouter<IUserController> {
    constructor(userController: IUserController, auth: express.RequestHandler) {
        super(userController, auth);
        this.path = '/users';
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post('/login', wrapController(this.controller.login));
        this.router.post('', validateRequest(createSchema), wrapController(this.controller.createUser));
        this.router.use(this.auth);
        this.router.get('', wrapController(this.controller.getAllUsers));
        this.router.get('/:userId', wrapController(this.controller.getUserById));
        this.router.put('/:userId', validateRequest(updateSchema), wrapController(this.controller.updateUser));
        this.router.delete('/:userId', wrapController(this.controller.deleteUser));
    }
}

export default UserRouter;
