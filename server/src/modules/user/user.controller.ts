import {Request, Response} from "express";
import { StatusCodes } from "http-status-codes";
import { RootQuerySelector } from "mongoose";
import omit from "../../helpers/omit";
import { DeleteUserBody, EditUserBody, RegisterUserBody } from "./user.schema";
import { createUser, findUserById, findAllUsers} from "./user.service";

interface User{
    _id:string
    username: string
    email: string
	password: string
    role: number
}

export async function registerUserHandler(req: Request<{}, {}, RegisterUserBody>, res: Response) {
    const {username, email, password, role} = req.body;
    try {
        await createUser({username, email, password, role});
        return res.status(StatusCodes.CREATED).send("User Created Succesfully");

    } catch (e: any) {
        if(e.code === 11000){
            return res.status(StatusCodes.CONFLICT).send("User already exists");
        }        
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    };

};

export async function editUserHandler(req: Request<EditUserBody["params"], {}, EditUserBody["body"]>, res: Response) {
    const {id} = req.params;
    const {username, email, password, role} = req.body;
    try {
        const user = await findUserById(id);
        if(!user){
            return res.status(StatusCodes.BAD_REQUEST).send("User does not exist");
        }
        // updating user
        user.username = username;
        user.email = email;
        user.password = password;
        user.role = role;
        await user.save();
    } catch (error:any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
    return res.status(StatusCodes.OK).send("User details updated");
};

export async function deleteUserHandler(req:Request<DeleteUserBody, {}, {}>, res: Response) {
    const {id} = req.params;
    const user = await findUserById(id);
    if(!user){
        return res.status(StatusCodes.BAD_REQUEST).send("User does not exist");
    }
    user.delete();
    return res.status(StatusCodes.OK).send("User Deleted");
}

export async function getUsersHandler(req:Request, res: Response) {
    const allUsers = await findAllUsers();
    const current_user_id: string = res.locals.user._id;
    const allUsers_:Array<User> = [];
    allUsers.forEach((ele)=>{
        const curr_ele: User = ele.toJSON();
        delete curr_ele.password;
        allUsers_.push(curr_ele);
    });
    const filtered_users = allUsers_.filter((usr)=>{
        return usr._id.toString() !== current_user_id;
    })

    
    return res.status(StatusCodes.OK).send(filtered_users);

}