

import path from 'path';

import productRoutes from './api/Product/product.routes';
import userRoutes from './api/User/user.routes';

import authRoutes from './auth/auth.routes';

export default function(app) {
  console.log('registering routes');
  app.use('/api/products', productRoutes);
  app.use('/api/users', userRoutes);

  app.use('/auth', authRoutes);
  
  console.log('Using SPA');
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(app.get('appPath'), 'index.html'));
  });
}




