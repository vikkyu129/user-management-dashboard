// deserialize user : get cookie -> deserialize into user object -> attach user object into a response
import {Request, Response, NextFunction} from 'express';
import { verifyJwt } from '../modules/auth/auth.utils';
function deserialize_user(req: Request, res: Response, next: NextFunction) {
    const accessToken = (req.headers.authorization || req.cookies.accessToken || "").
    replace(/^Bearer\s/, '');
    if(!accessToken){
        return next();
    }
    const decoded = verifyJwt(accessToken);
    if(decoded){
        res.locals.user = decoded;
    }
    return next();
}

export default deserialize_user;