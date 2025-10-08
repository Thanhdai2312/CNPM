import { Router } from 'express';
import { OrderController } from '../controllers/orderController';

export function createOrderRoutes(orderController: OrderController): Router {
  const router = Router();

  router.post('/', orderController.createOrder);
  router.get('/', orderController.getAllOrders);
  router.get('/:id', orderController.getOrder);
  router.patch('/:id/status', orderController.updateOrderStatus);

  return router;
}
