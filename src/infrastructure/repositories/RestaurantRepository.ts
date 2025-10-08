import { BaseRepository } from './BaseRepository';
import { Restaurant } from '../../domain/models/Restaurant';

export class RestaurantRepository extends BaseRepository<Restaurant> {
  constructor() {
    super('restaurants');
  }

  async findActiveRestaurants(): Promise<Restaurant[]> {
    const allRestaurants = await this.findAll();
    return allRestaurants.filter(restaurant => restaurant.isActive);
  }

  async findByName(name: string): Promise<Restaurant[]> {
    const allRestaurants = await this.findAll();
    return allRestaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(name.toLowerCase())
    );
  }
}
