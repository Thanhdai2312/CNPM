import { Request, Response, NextFunction } from 'express';
import { RestaurantService } from '../../domain/services/RestaurantService';
import { Restaurant } from '../../domain/models/Restaurant';

export class RestaurantController {
  private restaurantService: RestaurantService;

  constructor(restaurantService: RestaurantService) {
    this.restaurantService = restaurantService;
  }

  getAllRestaurants = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const restaurants = await this.restaurantService.getAllRestaurants();
      
      res.status(200).json({
        success: true,
        data: restaurants
      });
    } catch (error) {
      next(error);
    }
  };

  getActiveRestaurants = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const restaurants = await this.restaurantService.getActiveRestaurants();
      
      res.status(200).json({
        success: true,
        data: restaurants
      });
    } catch (error) {
      next(error);
    }
  };

  getRestaurant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const restaurant = await this.restaurantService.getRestaurantById(id);
      
      res.status(200).json({
        success: true,
        data: restaurant
      });
    } catch (error) {
      next(error);
    }
  };

  createRestaurant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const restaurantData: Restaurant = req.body;
      const restaurant = await this.restaurantService.createRestaurant(restaurantData);
      
      res.status(201).json({
        success: true,
        data: restaurant
      });
    } catch (error) {
      next(error);
    }
  };

  updateRestaurant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const updates: Partial<Restaurant> = req.body;
      const restaurant = await this.restaurantService.updateRestaurant(id, updates);
      
      res.status(200).json({
        success: true,
        data: restaurant
      });
    } catch (error) {
      next(error);
    }
  };

  deleteRestaurant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.restaurantService.deleteRestaurant(id);
      
      res.status(200).json({
        success: true,
        message: 'Restaurant deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}
