import { Router } from 'express';
import * as districtController from './district.controller';
import { authenticate, restrictTo } from '../../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', districtController.getAllDistricts);
router.get('/:id', districtController.getDistrictById);

// Admin only routes
router.use(authenticate, restrictTo('ADMIN'));
router.post('/', districtController.createDistrict);
router.patch('/:id', districtController.updateDistrict);
router.delete('/:id', districtController.deleteDistrict);

export const districtRoutes = router;
