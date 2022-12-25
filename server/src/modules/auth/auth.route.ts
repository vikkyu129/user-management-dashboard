import express from "express";
import { loginHandler, logOutHandler } from "./auth.controller";
import { loginSchema } from "./auth.schema";
import {processRequestBody} from "zod-express-middleware";
 
const router = express.Router();

router.post("/", processRequestBody(loginSchema.body), loginHandler);
router.post("/logout", logOutHandler);


export default router;