import express from "express";
import { createRole } from "../../controllers/role/controller";
const router = express.Router();

router.post("/roles/create", createRole);

export default router;
