import { TOrder, TUser } from "./user.interface";
import { User } from "./user.modal";


// create single user
const createUser = async (userData: TUser) => {
    // checking user existing
    if (await User.isUserExist(userData.userName as string)) {
        throw new Error("UserName Already Exist");
    }
    const result = await User.create(userData);
    return result;
};

//get all users
const getUsers = async () => {
    const result = await User.find({}, { userName: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
};

// get single User info
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

// user Delete
const deleteUser = async (userId: number) => {
    // checking existence
    if (await User.userFinding(userId)) {
        return await User.updateOne({ userId }, { isDeleteUser: true });
    } else {
        throw new Error("User not found");
    }
};

// user Update
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
            throw new Error("User not updated");
        }
    } else {
        throw new Error("User not found");
    }
};

// add order to user
const addOrderToUser = async (userId: number, order: TOrder) => {
    // checking existence
    if (await User.userFinding(userId)) {
        const result = await User.updateOne({ userId }, { $push: { orders: order } });
        if (result.acknowledged === true) {
            return result;
        } else {
            throw new Error("User not updated");
        }
    } else {
        throw new Error("User not found");
    }
};


// get user Orders
const getUserOrders = async (userId: number) => {
    // checking existence
    if (await User.userFinding(userId)) {
        const result = await User.findOne({ userId }, { orders: 1 });
        return result;
    } else {
        throw new Error("User not found");
    }
};

// get total by user id
const getTotalByUserId = async (userId: number) => {
    // checking existence
    if (await User.userFinding(userId)) {
        const result = await User.aggregate([
            // match stage match document by userId
            { $match: { userId: 6 } },
            // unwind stage destructure order array of object to single object
            { $unwind: "$orders" },
            // group stage calculate the total price of order quantity and price
            {
                $group: {
                    _id: null,
                    totalPrice: {
                        $sum: { $multiply: ["$orders.quantity", "$orders.price"] },
                    },
                },
            },
            // project stage send only totalPrice
            { $project: { totalPrice: 1, _id: 0 } }
        ]);
        return result;
    } else {
        throw new Error("User not found");
    }
};


export const UserService = {
    createUser,
    getUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    getUserOrders,
    getTotalByUserId,
    addOrderToUser
};