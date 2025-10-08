import express, { Application, Request, Response, NextFunction } from 'express';
import { config } from './config/env';
import { logger } from './shared/utils/logger';
import { AppError } from './shared/errors/AppError';

// Repositories
import { OrderRepository } from './infrastructure/repositories/OrderRepository';
import { RestaurantRepository } from './infrastructure/repositories/RestaurantRepository';

// Services
import { OrderService } from './domain/services/OrderService';
import { RestaurantService } from './domain/services/RestaurantService';
import { DeliveryStrategyContext } from './domain/services/DeliveryStrategyContext';

// Controllers
import { OrderController } from './api/controllers/orderController';
import { RestaurantController } from './api/controllers/restaurantController';
import { DeliveryController } from './api/controllers/deliveryController';

// Routes
import { createOrderRoutes } from './api/routes/orderRoutes';
import { createRestaurantRoutes } from './api/routes/restaurantRoutes';
import { createDeliveryRoutes } from './api/routes/deliveryRoutes';

// Initialize repositories
const orderRepository = new OrderRepository();
const restaurantRepository = new RestaurantRepository();

// Initialize services
const deliveryContext = new DeliveryStrategyContext();
const restaurantService = new RestaurantService(restaurantRepository);
const orderService = new OrderService(orderRepository, restaurantService, deliveryContext);

// Initialize controllers
const orderController = new OrderController(orderService);
const restaurantController = new RestaurantController(restaurantService);
const deliveryController = new DeliveryController(orderService);

// Create Express app
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use(`${config.apiPrefix}/orders`, createOrderRoutes(orderController));
app.use(`${config.apiPrefix}/restaurants`, createRestaurantRoutes(restaurantController));
app.use(`${config.apiPrefix}/delivery`, createDeliveryRoutes(deliveryController));

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`Environment: ${config.env}`);
  logger.info(`API endpoints available at: http://localhost:${PORT}${config.apiPrefix}`);
});

export default app;
