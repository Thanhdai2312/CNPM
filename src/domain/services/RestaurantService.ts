import { RestaurantRepository } from '../../infrastructure/repositories/RestaurantRepository';
import { Restaurant } from '../models/Restaurant';
import { NotFoundError } from '../../shared/errors/NotFoundError';

export class RestaurantService {
  private restaurantRepository: RestaurantRepository;

  constructor(restaurantRepository: RestaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }

  async getAllRestaurants(): Promise<Restaurant[]> {
    return await this.restaurantRepository.findAll();
  }

  async getActiveRestaurants(): Promise<Restaurant[]> {
    return await this.restaurantRepository.findActiveRestaurants();
  }

  async getRestaurantById(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findById(id);
    if (!restaurant) {
      throw new NotFoundError('Restaurant');
    }
    return restaurant;
  }

  async createRestaurant(restaurant: Restaurant): Promise<Restaurant> {
    return await this.restaurantRepository.save(restaurant.id, restaurant);
  }

  async updateRestaurant(id: string, updates: Partial<Restaurant>): Promise<Restaurant> {
    const restaurant = await this.getRestaurantById(id);
    const updatedRestaurant = { ...restaurant, ...updates };
    return await this.restaurantRepository.save(id, updatedRestaurant);
  }

  async deleteRestaurant(id: string): Promise<void> {
    const exists = await this.restaurantRepository.exists(id);
    if (!exists) {
      throw new NotFoundError('Restaurant');
    }
    await this.restaurantRepository.delete(id);
  }
}
