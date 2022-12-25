import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import require_admin from '../../middlewares/require_admin';
import require_login from '../../middlewares/require_login';
import { deleteUserHandler, editUserHandler, getUsersHandler, registerUserHandler } from './user.controller';
import { registerUserSchema } from './user.schema';

const router = express.Router();

router.post("/", processRequestBody(registerUserSchema.body), registerUserHandler);

router.get("/me", require_login, (req, res) => {
    return res.send(res.locals.user);
});

router.post("/edituser/:id", require_login, require_admin, editUserHandler);

router.post("/deleteuser/:id", require_login, require_admin, deleteUserHandler);

router.post("/getusers", require_login, require_admin, getUsersHandler);



export default router;