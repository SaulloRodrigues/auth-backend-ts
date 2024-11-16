import UserController from "../controllers/UserController.js";
import { authJWT } from "../middlewares/AuthJwt.js";
import { authUser } from "../middlewares/AuthUser.js";
import { IRoutes } from '../interface/Routes.js';

const secureRoutes = [authJWT, authUser];

const User: Array<IRoutes> = [
    {
        method: 'get',
        path: '/user',
        middlewares: secureRoutes,
        handler: UserController.getUser.bind(UserController)
    },
    {
        method: 'post',
        path: '/user/register',
        handler: UserController.createUser.bind(UserController)
    },
    {
        method: 'put',
        path: '/user/update',
        middlewares: secureRoutes,
        handler: UserController.updateUser.bind(UserController)
    },
    {
        method: 'post',
        path: '/user/login',
        handler: UserController.signInUser.bind(UserController)
    },
    {
        method: 'post',
        path: '/user/logout',
        middlewares: secureRoutes,
        handler: UserController.signOutUser.bind(UserController)
    },
    {
        method: 'delete',
        path: '/user/delete',
        middlewares: secureRoutes,
        handler: UserController.deleteUser.bind(UserController)
    },
]

export default User;