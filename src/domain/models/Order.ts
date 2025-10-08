import { DeliveryMethodType } from './DeliveryMethod';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY_FOR_DELIVERY = 'READY_FOR_DELIVERY',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface Order {
  id: string;
  restaurantId: string;
  customerName: string;
  customerAddress: string;
  customerLatitude: number;
  customerLongitude: number;
  items: OrderItem[];
  totalAmount: number;
  deliveryMethod: DeliveryMethodType;
  deliveryCost: number;
  estimatedDeliveryTime: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}
