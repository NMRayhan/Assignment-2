/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";


const FullNameSchema = z.object({
    firstName: z.string().max(20, { message: "firstName cannot be more than 20 characters" }),
    lastName: z.string().max(20, { message: "lastName cannot be more than 20 characters" }),
});

const AddressSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
});

const OrderSchema = z.object({
    price: z.number(),
    productName: z.string(),
    quantity: z.number(),
});

export const UserZodSchema = z.object({
    userId: z.number(),

    password: z.string().min(6, { message: "Must be at least 6 characters" }),

    userName: z.string({
        required_error: "userName is required",
        invalid_type_error: "userName must be a string",
    }).trim().toLowerCase(),

    age: z.number().optional(),

    fullName: FullNameSchema,

    email: z.string({
        required_error: "email is required",
    }).email({ message: "email is not valid" }),

    isActive: z.boolean().default(true),

    hobbies: z.array(z.string()).default([]),

    address: AddressSchema,

    orders: OrderSchema,
});


export default UserZodSchema;