import express from "express";
const router = express.Router()
import {test, updateUser, deleteUser} from "../Controllers/user.controller.js"
import { verfiyToken } from "../utils/verfiyUser.js";

// this is testing reouter only for testing purpose
router.get("/test", test)
router.post("/update/:id" ,verfiyToken,  updateUser)
router.delete("/delete/:id" ,verfiyToken,  deleteUser)

export default router;