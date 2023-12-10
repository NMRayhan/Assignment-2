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
    const result = await User.find({ fullName: 1, userName: 1, age: 1, email: 1, address: 1 });
    return result;
};

const getSingleUser = async (userId: number) => {
    const result = await User.aggregate([
        { $match: { userId: userId } },
        { $sort: { fullName: 1, userName: 1, age: 1, email: 1, address: 1 } }
    ]);
    return result;
};

const deleteUser = async (userId: number) => {
    const result = await User.updateOne({ userId }, { isDeleteUser: true });
    return result;
};


export const UserService = {
    createUser, getUsers, getSingleUser, deleteUser
};