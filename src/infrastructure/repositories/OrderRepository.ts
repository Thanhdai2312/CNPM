import { BaseRepository } from './BaseRepository';
import { Order } from '../../domain/models/Order';

export class OrderRepository extends BaseRepository<Order> {
  constructor() {
    super('orders');
  }

  async findByRestaurantId(restaurantId: string): Promise<Order[]> {
    const allOrders = await this.findAll();
    return allOrders.filter(order => order.restaurantId === restaurantId);
  }

  async findByCustomerName(customerName: string): Promise<Order[]> {
    const allOrders = await this.findAll();
    return allOrders.filter(order => order.customerName === customerName);
  }
}
