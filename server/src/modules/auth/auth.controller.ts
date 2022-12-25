import {Request, Response} from 'express';
import { USER_ROLES } from '../../../constants';
import { findUserByEmail } from '../user/user.service';
import {StatusCodes} from 'http-status-codes';
import { signJwt } from './auth.utils';
import omit from '../../helpers/omit';
import { LoginBody } from './auth.schema';

const DOMAIN = process.env.DOMAIN || "localhost";

export async function loginHandler(req:Request<{}, {}, LoginBody>, res:Response) {
    const {email, password} = req.body;
    
    const user = await findUserByEmail(email);
    if(!user || !user.comparePassword(password)){
        return res.status(StatusCodes.UNAUTHORIZED).send("Invalid Username or Password");
    }
    if(user.role){
        if(user?.role > USER_ROLES.ADMIN){
            return res.status(StatusCodes.UNAUTHORIZED).send("Not authorized");
        }
    }
    const payload = omit(user.toJSON(), ["password"]);

    const jwt = signJwt(payload);

    res.cookie("accessToken", jwt, {
        maxAge: 3.154e10, 
        httpOnly: true, 
        domain: DOMAIN, 
        path: "/", 
        sameSite: "strict", 
        secure: false 
    });

    return res.status(StatusCodes.OK).send(jwt); 
    
};

export async function logOutHandler(req: Request, res: Response) {
    try {
        res.cookie("accessToken", "", {
            maxAge: 3.154e10, 
            httpOnly: true, 
            domain: DOMAIN, 
            path: "/", 
            sameSite: "strict", 
            secure: false 
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
    
    return res.status(StatusCodes.OK).send("Logged out successfully"); 
};