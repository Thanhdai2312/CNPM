import { Router } from 'express';
import { RestaurantController } from '../controllers/restaurantController';

export function createRestaurantRoutes(restaurantController: RestaurantController): Router {
  const router = Router();

  router.get('/', restaurantController.getAllRestaurants);
  router.get('/active', restaurantController.getActiveRestaurants);
  router.get('/:id', restaurantController.getRestaurant);
  router.post('/', restaurantController.createRestaurant);
  router.put('/:id', restaurantController.updateRestaurant);
  router.delete('/:id', restaurantController.deleteRestaurant);

  return router;
}
