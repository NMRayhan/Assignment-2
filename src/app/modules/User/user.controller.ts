import { Request, Response } from "express";
import { UserService } from "./user.service";
import UserZodSchema from "./user.zod.validation";
// import { z } from "zod";

const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;
        // passing data using zod for validation
        const validateData = UserZodSchema.parse(userData);

        const result = await UserService.createUser(validateData);
        res.status(201).json({
            status: true,
            message: "User created successfully Done!",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "failed to insert data",
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
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "No Data Found",
            error: error
        });
    }
};

export const UserController = {
    createUser, getUsers
};