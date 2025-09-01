// routes/userRoutes.js
import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../contollers/userCintollers.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/login", loginUser);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
