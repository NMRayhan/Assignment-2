/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

const FullNameSchema = z.object({
    firstName: z.string().trim().max(20, { message: "firstName cannot be more than 20 characters" }).optional(),
    lastName: z.string().trim().max(20, { message: "lastName cannot be more than 20 characters" }).optional(),
});

const AddressSchema = z.object({
    street: z.string().trim().optional(),
    city: z.string().trim().optional(),
    country: z.string().trim().optional(),
});

const OrderSchema = z.object({
    price: z.number().optional(),
    productName: z.string().optional(),
    quantity: z.number().optional(),
});

export const UserZodSchema = z.object({
    userId: z.number(),

    password: z.string().trim().min(6, { message: "Must be at least 6 characters" }).optional(),

    userName: z.string({
        required_error: "userName is required",
        invalid_type_error: "userName must be a string",
    }).trim().toLowerCase(), // this field not a camel case i provide camel case Formate

    age: z.number().optional(),

    fullName: FullNameSchema.optional(),

    email: z.string({
        required_error: "email is required",
    }).trim().email({ message: "email is not valid" }).optional(),

    isActive: z.boolean().default(true).optional(),

    hobbies: z.array(z.string()).default([]).optional(),

    address: AddressSchema.optional(),

    orders: z.array(OrderSchema).optional(), // Optional but i provide requires

    isDeleteUser: z.boolean().default(false).optional(),
});


export default UserZodSchema;