import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../../domain/services/OrderService';
import { OrderMapper } from '../../application/mappers/orderMapper';
import { CreateOrderDTO } from '../../application/dtos/CreateOrderDTO';
import { OrderStatus } from '../../domain/models/Order';

export class OrderController {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createOrderDTO: CreateOrderDTO = req.body;
      const orderData = OrderMapper.toDomain(createOrderDTO);
      const order = await this.orderService.createOrder(orderData);
      const response = OrderMapper.toResponseDTO(order);
      
      res.status(201).json({
        success: true,
        data: response
      });
    } catch (error) {
      next(error);
    }
  };

  getOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrderById(id);
      const response = OrderMapper.toResponseDTO(order);
      
      res.status(200).json({
        success: true,
        data: response
      });
    } catch (error) {
      next(error);
    }
  };

  getAllOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orders = await this.orderService.getAllOrders();
      const response = orders.map(order => OrderMapper.toResponseDTO(order));
      
      res.status(200).json({
        success: true,
        data: response
      });
    } catch (error) {
      next(error);
    }
  };

  updateOrderStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body as { status: OrderStatus };
      const order = await this.orderService.updateOrderStatus(id, status);
      const response = OrderMapper.toResponseDTO(order);
      
      res.status(200).json({
        success: true,
        data: response
      });
    } catch (error) {
      next(error);
    }
  };
}
