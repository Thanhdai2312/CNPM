import { OrderRepository } from '../../infrastructure/repositories/OrderRepository';
import { RestaurantService } from './RestaurantService';
import { DeliveryStrategyContext } from './DeliveryStrategyContext';
import { Order, OrderStatus } from '../models/Order';
import { DeliveryMethodType } from '../models/DeliveryMethod';
import { NotFoundError } from '../../shared/errors/NotFoundError';
import { AppError } from '../../shared/errors/AppError';

export class OrderService {
  private orderRepository: OrderRepository;
  private restaurantService: RestaurantService;
  private deliveryContext: DeliveryStrategyContext;

  constructor(
    orderRepository: OrderRepository,
    restaurantService: RestaurantService,
    deliveryContext: DeliveryStrategyContext
  ) {
    this.orderRepository = orderRepository;
    this.restaurantService = restaurantService;
    this.deliveryContext = deliveryContext;
  }

  async createOrder(orderData: Omit<Order, 'id' | 'deliveryCost' | 'estimatedDeliveryTime' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const restaurant = await this.restaurantService.getRestaurantById(orderData.restaurantId);
    
    const distance = this.calculateDistance(
      restaurant.latitude,
      restaurant.longitude,
      orderData.customerLatitude,
      orderData.customerLongitude
    );

    const strategy = this.deliveryContext.getStrategy(orderData.deliveryMethod);
    
    if (!strategy.canDeliver(distance)) {
      throw new AppError(
        `${orderData.deliveryMethod} cannot deliver to this distance (${distance.toFixed(2)} km)`,
        400
      );
    }

    const deliveryCost = strategy.calculateCost(distance);
    const estimatedDeliveryTime = strategy.calculateEstimatedTime(distance);

    const order: Order = {
      ...orderData,
      id: this.generateOrderId(),
      deliveryCost,
      estimatedDeliveryTime,
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return await this.orderRepository.save(order.id, order);
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFoundError('Order');
    }
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.getOrderById(id);
    order.status = status;
    order.updatedAt = new Date();
    return await this.orderRepository.save(id, order);
  }

  async getAvailableDeliveryMethods(restaurantId: string, customerLat: number, customerLng: number): Promise<any[]> {
    const restaurant = await this.restaurantService.getRestaurantById(restaurantId);
    
    const distance = this.calculateDistance(
      restaurant.latitude,
      restaurant.longitude,
      customerLat,
      customerLng
    );

    const strategies = this.deliveryContext.getAvailableStrategies(distance);
    
    return strategies.map(strategy => ({
      method: strategy.getDeliveryMethod(),
      cost: strategy.calculateCost(distance),
      estimatedTime: strategy.calculateEstimatedTime(distance),
      distance: distance
    }));
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  private generateOrderId(): string {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
