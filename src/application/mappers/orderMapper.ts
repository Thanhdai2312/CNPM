import { Order } from '../../domain/models/Order';
import { OrderResponseDTO } from '../dtos/OrderResponseDTO';
import { CreateOrderDTO } from '../dtos/CreateOrderDTO';

export class OrderMapper {
  static toResponseDTO(order: Order): OrderResponseDTO {
    return {
      id: order.id,
      restaurantId: order.restaurantId,
      customerName: order.customerName,
      customerAddress: order.customerAddress,
      customerLatitude: order.customerLatitude,
      customerLongitude: order.customerLongitude,
      items: order.items,
      totalAmount: order.totalAmount,
      deliveryMethod: order.deliveryMethod,
      deliveryCost: order.deliveryCost,
      estimatedDeliveryTime: order.estimatedDeliveryTime,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString()
    };
  }

  static toDomain(dto: CreateOrderDTO): Omit<Order, 'id' | 'deliveryCost' | 'estimatedDeliveryTime' | 'status' | 'createdAt' | 'updatedAt'> {
    return {
      restaurantId: dto.restaurantId,
      customerName: dto.customerName,
      customerAddress: dto.customerAddress,
      customerLatitude: dto.customerLatitude,
      customerLongitude: dto.customerLongitude,
      items: dto.items,
      totalAmount: dto.totalAmount,
      deliveryMethod: dto.deliveryMethod
    };
  }
}
