import { TUser } from "./user.interface";
import { User } from "./user.modal";

const createUser = async (userData: TUser) => {

    // checking user existing
    if (await User.isUserExist(userData.userName as string)) {
        throw new Error("UserName Already Exist");
    }

    const result = await User.create(userData);
    return result;
};

const getUsers = async () => {
    const result = await User.find({});
    return result;
};

const getSingleUser = async (id: string) => {
    const result = await User.aggregate([{ $match: { id } }]);
    return result;
};

const deleteUser = async (id: string) => {
    const result = await User.updateOne({ id }, { isDeleted: true });
    return result;
};


export const UserService = {
    createUser, getUsers, getSingleUser, deleteUser
};