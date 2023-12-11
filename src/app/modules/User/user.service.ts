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
    const result = await User.find({}, { userName: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
};

const getSingleUser = async (userId: number) => {
    const result = await User.aggregate([
        { $match: { userId: userId } },
        { $project: { userName: 1, fullName: 1, age: 1, email: 1, address: 1 } }
    ]);
    if (result.length < 1) {
        throw new Error("No Data Found");
    }
    return result;
};

const deleteUser = async (userId: number) => {

    // checking existence
    if (await User.userFinding(userId)) {
        return await User.updateOne({ userId }, { isDeleteUser: true });
    } else {
        throw new Error("No User found");
    }
};

const updateUser = async (userId: number, body: TUser) => {
    // checking existence
    if (await User.userFinding(userId)) {
        // checking same user Name
        if (await User.isUserExist(body.userName as string)) {
            throw new Error("UserName Already Exist");
        }
        const result = await User.updateOne({ userId }, { $set: body });
        if (result.acknowledged === true) {
            return result;
        } else {
            throw new Error("User Not Updated");
        }
    } else {
        throw new Error("No User found");
    }
};


export const UserService = {
    createUser, getUsers, getSingleUser, deleteUser, updateUser
};