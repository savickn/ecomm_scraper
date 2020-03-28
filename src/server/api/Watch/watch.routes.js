
import * as controller from './watch.controller';
import { Router } from 'express';

const router = new Router();

router.get('/', controller.getWatchlist);
router.post('/', controller.createWatch);
router.delete('/:id', controller.deleteWatch);

export default router;
