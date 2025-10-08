import { OrderStatus } from '../../domain/models/Order';
import { DeliveryMethodType } from '../../domain/models/DeliveryMethod';

export interface OrderItemResponseDTO {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderResponseDTO {
  id: string;
  restaurantId: string;
  customerName: string;
  customerAddress: string;
  customerLatitude: number;
  customerLongitude: number;
  items: OrderItemResponseDTO[];
  totalAmount: number;
  deliveryMethod: DeliveryMethodType;
  deliveryCost: number;
  estimatedDeliveryTime: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
