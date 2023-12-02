import express from "express";
const router = express.Router()
import {test, updateUser} from "../Controllers/user.controller.js"
import { verfiyToken } from "../utils/verfiyUser.js";

router.get("/test", test)
router.post("/update/:id" ,verfiyToken,  updateUser)

export default router;