import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();
// Routes defined in auth-routes.js are prefixed with /auth
router.use('/auth', authRoutes);
// Routes defined in ./api/index.ts are prefixed with /api
// API routes must pass through the middleware authenticateToken first!
router.use('/api', authenticateToken, apiRoutes);
export default router;
