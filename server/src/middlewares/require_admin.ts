import {Request, Response, NextFunction} from 'express';
import {StatusCodes} from "http-status-codes";
import { USER_ROLES } from '../../constants';

function require_admin(req: Request, res: Response, next: NextFunction){
    const user = res.locals.user;
    if(user.role > USER_ROLES.ADMIN){
        return res.sendStatus(StatusCodes.FORBIDDEN);
    }
    return next();
};

export default require_admin;