import express from "express";
import { UserController } from "./user.controller";


export const UserRoute = express.Router();

UserRoute.get("", UserController.homePage);

UserRoute.post("/api/users", UserController.createUser);

UserRoute.get("/api/users", UserController.getUsers);

UserRoute.get("/api/users/:userId", UserController.getSingleUser);

UserRoute.delete("/api/users/:userId", UserController.deleteSingleUser);

UserRoute.put("/api/users/:userId", UserController.updateUser);

UserRoute.get("/api/users/:userId/orders", UserController.getUserOrders);

UserRoute.get("/api/users/:userId/orders/total-price", UserController.getTotalByUserId);

UserRoute.put("/api/users/:userId/orders", UserController.addOrderToUser);
