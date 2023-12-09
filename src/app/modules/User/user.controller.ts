import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;
        const result = await UserService.createUser(userData);
        res.status(200).json({
            status: true,
            message: "Successfully data Save",
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

export const UserController = {
    createUser
};