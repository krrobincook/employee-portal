import { Router } from "express";
import {
  createEmployees,
  deleteEmployees,
  getEmployees,
  updateEmployees,
} from "../controllers/employeeController";
import { protect, protectAdmin } from "../middleware/auth";

const employeesRouter = Router();

employeesRouter.get("/", protect, protectAdmin ,getEmployees);
employeesRouter.post("/", protect ,protectAdmin ,createEmployees);
employeesRouter.put("/:id", protect ,protectAdmin ,updateEmployees);
employeesRouter.delete("/:id", protect ,protectAdmin ,deleteEmployees);

export default employeesRouter;