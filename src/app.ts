import cors from "cors";
import express, { Request, Response } from "express";

const app = express();

app.use(cors());

const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Mart's API");
});

app.use("/api/users");

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
