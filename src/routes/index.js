import express from 'express';
//
import authRoutes from './authRoutes';
import locationRoutes from './locationRoutes';

const routesApp = express();
routesApp.use('/auth', authRoutes);
routesApp.use('/location', locationRoutes);

// routesApp.use('/file', /*permissions.protectedRoute,*/ fileRoutes);

export default routesApp;
