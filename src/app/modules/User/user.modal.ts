/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import validator from "validator";
import { TAddress, TFullName, TOrder, TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const FullNameSchema = new Schema<TFullName>({
    firstName: {
        type: String,
        trim: true,
        maxlength: [20, "firstName cannot be more then 20 character"]
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: [20, "lastName cannot be more then 20 character"]
    }
});

const AddressSchema = new Schema<TAddress>({
    street: String,
    city: String,
    country: String
});

const OrderSchema = new Schema<TOrder>({
    price: Number,
    productName: String,
    quantity: Number
});

const UserSchema = new Schema<TUser, UserModel>({
    userId: {
        type: Number,
        required: true,
        unique: true,
        message: "userId must be unique. This userId is already taken.",
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Must be at least 6 digit"]
    },
    userName: {
        type: String,
        required: [true, "userName is required"],
        unique: true,
        message: "Username must be unique. This username is already taken.",
    },
    age: Number,
    fullName: FullNameSchema,
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => {
                return validator.isEmail(value) ? true : false;
            },
            message: "email is not a valid"
        }
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: {
        type: [String],
        default: [],
    },
    address: AddressSchema,
    orders: OrderSchema


});


// pre save middleware
UserSchema.pre("save", async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password as string, Number(config.bcryptSaltRound),
    );
    next();
});

// post save middleware
UserSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});


// Query Middleware
// studentSchema.pre('find', function (next) {
//     this.find({ isDeleted: { $ne: true } });
//     next();
//   });

//   studentSchema.pre('findOne', function (next) {
//     this.find({ isDeleted: { $ne: true } });
//     next();
//   });

// studentSchema.pre('aggregate', function (next) {
//     this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//     next();
//   });

// custom static method
UserSchema.statics.isUserExist = async function (userName: string) {
    const existingUser = await User.findOne({ userName: userName });
    return existingUser;
};


export const User = model<TUser, UserModel>("Users", UserSchema);