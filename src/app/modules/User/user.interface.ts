import { Model } from "mongoose";

export interface TFullName {
    firstName?: string,
    lastName?: string
}

export interface TAddress {
    street?: string,
    city?: string,
    country?: string,
}

export interface TOrder {
    productName?: string,
    price?: number,
    quantity?: number
}

export interface TUser {
    userId?: number,
    userName?: string,
    password?: string,
    fullName?: TFullName,
    age?: number,
    email?: string,
    isActive?: boolean,
    hobbies?: string[],
    address?: TAddress,
    orders?: TOrder,
    isDeleteUser?: boolean,
}

export interface UserModel extends Model<TUser> {
    isUserExist(userName: string): Promise<TUser | null>;
}