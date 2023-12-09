import cors from "cors";
import express, { Application } from "express";
import { UserRoute } from "./app/modules/User/user.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use(UserRoute);

export default app;