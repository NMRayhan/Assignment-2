import cors from "cors";
import express, { Application, Request, Response } from "express";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use("/home", (req: Request, res: Response) => {
    res.send("Hello");
});

export default app;