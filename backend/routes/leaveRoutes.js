import { Router } from "express";
import { createLeave, getLeaves } from "../controllers/leaveController";
import { protectAdmin } from "../middleware/auth";

const leaveRouter = Router();

leaveRouter.post("/", protect, createLeave);
leaveRouter.get("/", protect, getLeaves);
leaveRouter.patch("/:id", protect, protectAdmin, updateLeaveStatus);

export default leaveRouter;
