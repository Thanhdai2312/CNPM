import { Router } from 'express';
import { DeliveryController } from '../controllers/deliveryController';

export function createDeliveryRoutes(deliveryController: DeliveryController): Router {
  const router = Router();

  router.get('/methods/:restaurantId', deliveryController.getAvailableDeliveryMethods);

  return router;
}
