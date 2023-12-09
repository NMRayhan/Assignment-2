import express from "express";
import { UserController } from "./user.controller";


export const UserRoute = express.Router();

UserRoute.post("/api/users", UserController.createUser);

UserRoute.get("/api/users", UserController.getUsers);