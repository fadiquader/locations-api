import express from 'express';
//
import { locationController } from "../controllers";

const router = express.Router();
router.post('/create', locationController.create);
router.get('/all', locationController.findAll);
router.get('/by-id/:id', locationController.getById);
router.delete('/delete-all', locationController.deleteAll);
router.delete('/delete/:id', locationController.deleteById);

export default router;
