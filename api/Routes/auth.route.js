import express from "express";
import { signup } from "../Controllers/auth.controller.js";
import {signin} from "../Controllers/auth.controller.js";


const router = express.Router()

router.post("/signup" , signup)
router.post("/signin", signin)

export default router;

