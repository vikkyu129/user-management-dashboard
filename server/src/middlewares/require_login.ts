// require user : check user is logged in before we hit the handler
import {Request, Response, NextFunction} from 'express';
import {StatusCodes} from 'http-status-codes';
function require_login(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user;

    if(!user){
        return res.sendStatus(StatusCodes.FORBIDDEN);
    }

    return next();
};

export default require_login;