import * as Express from 'express';
import { controller } from '../controllers/auth.controller';

const router = Express.Router();

router.post('/', controller.onUserLogin.bind(controller));

export const authRouter = router;
