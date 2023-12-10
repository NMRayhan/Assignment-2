/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserService } from "./user.service";
import UserZodSchema from "./user.zod.validation";

const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;
        const validateData = UserZodSchema.parse(userData);
        const result = await UserService.createUser(validateData);
        res.status(201).json({
            status: true,
            message: "User created successfully Done!",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: error?.message || "failed to insert data",
            error: error
        });
    }
};

const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getUsers();
        res.status(200).json({
            success: true,
            message: "Users retrieve Successfully Done!",
            data: result
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error?.message || "No Data Found",
            error: error
        });
    }
};

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await UserService.getSingleUser(Number(userId));
        res.status(200).json({
            success: true,
            message: "Users retrieve Successfully Done!",
            data: result
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error?.message || "No Data Found",
            error: error
        });
    }
};

const deleteSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        await UserService.deleteUser(Number(userId));
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error?.message || "No Data Found",
            error: error
        });
    }
};



export const UserController = {
    createUser, getUsers, getSingleUser, deleteSingleUser
};