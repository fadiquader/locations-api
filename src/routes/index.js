import express from 'express';
//
import authRoutes from './authRoutes';

const routesApp = express();
routesApp.use('/auth', authRoutes);

// routesApp.use('/file', /*permissions.protectedRoute,*/ fileRoutes);

export default routesApp;
