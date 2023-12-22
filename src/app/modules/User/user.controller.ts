/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserService } from "./user.service";
import UserZodSchema from "./user.zod.validation";

const homePage = async (req: Request, res: Response) => {
    res.status(200).json({
        status: true,
        message: "Congratulations, Server Running Successfully Done, And This is Home Page",
    });
};

const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
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

const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { user: updatedData } = req.body;
        const validateData = UserZodSchema.parse(updatedData);
        const result = await UserService.updateUser(Number(userId), validateData);
        res.status(200).json({
            success: true,
            message: "User Updated successfully!",
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

const addOrderToUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { orders } = req.body;
        await UserService.addOrderToUser(Number(userId), orders);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
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

const getUserOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await UserService.getUserOrders(Number(userId));
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
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

const getTotalByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await UserService.getTotalByUserId(Number(userId));
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
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


export const UserController = {
    homePage,
    createUser,
    getUsers,
    getSingleUser,
    deleteSingleUser,
    updateUser,
    getUserOrders,
    getTotalByUserId,
    addOrderToUser
};