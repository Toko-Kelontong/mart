import { Request, Response } from "express";
import { users } from "../../db/schema";
import bcrypt from "bcrypt";

type NewUser = typeof users.$inferInsert;

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser: NewUser = req.body;
        const saltRounds = 10;
        const hashedPasswords = await bcrypt.hash(newUser.password, saltRounds);
        newUser.password = hashedPasswords;
        res.status(201).send("Data added successfully!");
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

// export const getUser
