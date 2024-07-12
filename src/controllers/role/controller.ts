import { Request, Response } from "express";
import { roles } from "../../db/schema";
import { db } from "../../db";

type NewRole = typeof roles.$inferInsert;

const insertRole = async (role: NewRole) => {
    return db.insert(roles).values(role);
};

export const createRole = async (req: Request, res: Response) => {
    try {
        const newRole: NewRole = req.body;
        const result = await insertRole(newRole);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};
