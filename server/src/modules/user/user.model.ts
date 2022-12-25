import {getModelForClass, prop, pre} from '@typegoose/typegoose';
import argon2 from "argon2";
import { USER_ROLES } from '../../../constants';

//this class will be used as both typescript interface and a model
@pre<User>('save', async function(next){
    if(this.isModified("password") || this.isNew){
        const hash = await argon2.hash(this.password);
        this.password = hash;
        return next();
    }
})

export class User{
    @prop({required: true, unique: true})
    public username: string; 
    @prop({required: true, unique: true})
    public email: string; 
    @prop({required: true, unique: false})
    public password: string; 
    @prop({default: USER_ROLES.USER})
    public role: number; 
    
    // @prop({required: true, unique: false})
    // public verficationCode: string; 
    // @prop()
    // public passwordResetCode: string|null; 
    // @prop({default: false})
    // verified: boolean;

    public async comparePassword(password:string):Promise<boolean>{
        return argon2.verify(this.password, password);
    }

}


export const UserModel = getModelForClass(User, {
    schemaOptions:{
        timestamps: true,
    }
});