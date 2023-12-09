import { Model, Schema, model } from "mongoose";
import { Address, FullName, Order, User } from "./user.interface";
import validator from "validator";

const FullNameSchema = new Schema<FullName>({
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

const HobbiesSchema = new Schema<string[]>([]);

const AddressSchema = new Schema<Address>({
    street: String,
    city: String,
    country: String
});

const OrderSchema = new Schema<Order>({
    price: Number,
    productName: String,
    quantity: Number
});

const UserSchema = new Schema<User>({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Must be at least 6 digit"]
    },
    userName: {
        type: String,
        required: [true, "userName is required"],
        unique: true
    },
    age: String,
    fullName: FullNameSchema,
    email: {
        validate: {
            validator: (value: string) => {
                return validator.isEmail(value) ? true : false;
            },
            message: "Email is Not a valid"
        }
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: HobbiesSchema,
    address: AddressSchema,
    orders: OrderSchema


});

export const UserModel: Model<User> = model<User>("Users", UserSchema);