import { User, UserModel } from "./user.model";

export async function createUser(user: Omit<User, 'comparePassword'>) {
    return UserModel.create(user);
}

export async function findUserById(id:string) {
    return UserModel.findById(id);
}

export async function findUserByEmail(email: User['email']) {
    return UserModel.findOne({email: email});
}

export async function findAllUsers(){
    return UserModel.find();

}

