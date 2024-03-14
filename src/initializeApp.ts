import config from './config/config';

import Logger from './infra/winston/logger';
import conn from './infra/mongo/initializeMongo';
import { blogSchema } from './infra/mongo/models/blog.model';
import { userSchema } from './infra/mongo/models/user.model';
import { BlogRepo } from './infra/mongo/repo/blog.repo';
import { UserRepo } from './infra/mongo/repo/user.repo';
import Auth from './services/auth.service';
import { BlogService } from './services/blog.service';
import { UserService } from './services/user.service';
import App from './infra/express/app';
import { BlogController } from './infra/express/controllers/blog.controller';
import { UserController } from './infra/express/controllers/user.controller';
import BlogRouter from './infra/express/routers/blog.route';
import UserRouter from './infra/express/routers/user.route';

export function initializeApp(port: any) {
    const logger = new Logger();

    const userRepo = new UserRepo(conn, config.mongo.userCollectionName, userSchema);
    const blogRepo = new BlogRepo(conn, config.mongo.blogCollectionName, blogSchema);

    const userService = new UserService(userRepo, logger);
    const blogService = new BlogService(blogRepo, logger);

    const userController = new UserController(userService);
    const blogController = new BlogController(blogService);

    const auth = new Auth(userService.auth);

    const userRouter = new UserRouter(userController, auth.check);
    const blogRouter = new BlogRouter(blogController, auth.check);

    return new App(port, [userRouter, blogRouter]);
}
