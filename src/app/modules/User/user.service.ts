import { User } from "./user.interface";
import { UserModel } from "./user.modal";

const createUser = async (user: User) => {
    const result = await UserModel.create(user);
    return result;
};

const getUsers = async () => {
    const result = await UserModel.find({});
    return result;
};


export const UserService = {
    createUser, getUsers
};