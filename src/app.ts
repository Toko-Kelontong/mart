import cors from "cors";
import express, { Request, Response } from "express";
import userRoutes from "./api/users/routes";
import roleRoutes from "./api/role/routes";
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Mart's API");
});

app.use("/api", userRoutes);
app.use("/api", roleRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
