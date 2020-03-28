
import { Router } from 'express';

import * as controller from './product.controller';

const router = new Router();

router.get('/', controller.searchProducts); 
router.get('/:pid', controller.getProduct); 

export default router;

