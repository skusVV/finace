import {Request, Response} from 'express';

const users = [
    {
        userName: 'vitalii',
        password: 'skus',
    },
    {
        userName: '1',
        password: '1',
    }
];

export class AuthController {
    static checkUserAccess({password, userName}) {
        return users.some(user => user.password === password && user.userName === userName);
    }

    auth(req: Request, res: Response) {
        AuthController.checkUserAccess(req.body)
            ? res.json({code: 200, body: {auth: true, userName: req.body.userName}})
            : res.json({code: 403, message: 'Access denied'});
    }
}
