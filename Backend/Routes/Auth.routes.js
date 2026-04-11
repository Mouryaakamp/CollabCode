import { Router } from "express";
import * as authcontroller from '../Controllers/auth.controllers.js'

const authRouter=Router();

authRouter.post("/register",authcontroller.register);

export default authRouter