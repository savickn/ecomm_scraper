
import * as controller from './watch.controller';
import { Router } from 'express';

const router = new Router();

router.get('/', controller.getWatchlist);
router.post('/', controller.upsertWatch);
router.delete('/:id', controller.deleteWatch);

export default router;
