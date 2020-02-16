import { Router } from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';
const router = new Router();

router.get('/', controller.getUsers);
router.post('/', controller.addUser);
router.get('/me', auth.isAuthenticated(), controller.getMe);
router.get('/:cuid', controller.getUser);
router.delete('/:cuid', controller.deleteUser);

export default router;
