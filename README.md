# CNPM - Food Delivery Management System

A TypeScript-based food delivery management system implementing the Strategy Pattern for different delivery methods (Bicycle, Motorbike, Drone).

## Cấu trúc thư mục

```
.
├── package.json
├── tsconfig.json
├── src
│   ├── config
│   │   └── env.ts
│   ├── index.ts
│   ├── api                      # Presentation
│   │   ├── routes
│   │   │   ├── orderRoutes.ts
│   │   │   ├── restaurantRoutes.ts
│   │   │   └── deliveryRoutes.ts
│   │   └── controllers
│   │       ├── orderController.ts
│   │       ├── restaurantController.ts
│   │       └── deliveryController.ts
│   ├── application              # DTO + Mappers + Orchestrators
│   │   ├── dtos
│   │   │   ├── CreateOrderDTO.ts
│   │   │   └── OrderResponseDTO.ts
│   │   └── mappers
│   │       └── orderMapper.ts
│   ├── domain                   # Domain models + interfaces
│   │   ├── models
│   │   │   ├── Order.ts
│   │   │   ├── Restaurant.ts
│   │   │   └── DeliveryMethod.ts
│   │   ├── services             # Business layer
│   │   │   ├── OrderService.ts
│   │   │   ├── RestaurantService.ts
│   │   │   └── DeliveryStrategyContext.ts
│   │   └── strategies           # Strategy implementations
│   │       ├── BicycleDeliveryStrategy.ts
│   │       ├── MotorbikeDeliveryStrategy.ts
│   │       └── DroneDeliveryStrategy.ts
│   ├── infrastructure           # Data layer
│   │   ├── repositories
│   │   │   ├── OrderRepository.ts
│   │   │   ├── RestaurantRepository.ts
│   │   │   └── BaseRepository.ts
│   │   └── persistence
│   │       └── InMemoryDB.ts
│   └── shared
│       ├── errors
│       │   ├── AppError.ts
│       │   └── NotFoundError.ts
│       └── utils
│           └── logger.ts
└── README.md
```

## Kiến trúc

Dự án sử dụng kiến trúc Clean Architecture với các layer sau:

### 1. Presentation Layer (API)
- **Controllers**: Xử lý HTTP requests/responses
- **Routes**: Định nghĩa các API endpoints

### 2. Application Layer
- **DTOs**: Data Transfer Objects cho việc truyền dữ liệu
- **Mappers**: Chuyển đổi giữa domain models và DTOs

### 3. Domain Layer
- **Models**: Domain entities (Order, Restaurant, DeliveryMethod)
- **Services**: Business logic
- **Strategies**: Các chiến lược giao hàng khác nhau (Strategy Pattern)

### 4. Infrastructure Layer
- **Repositories**: Truy xuất dữ liệu
- **Persistence**: In-memory database

### 5. Shared Layer
- **Errors**: Custom error classes
- **Utils**: Các tiện ích dùng chung

## Cài đặt

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run development server
npm run dev

# Run production server
npm start
```

## API Endpoints

### Restaurants
- `GET /api/v1/restaurants` - Lấy tất cả nhà hàng
- `GET /api/v1/restaurants/active` - Lấy các nhà hàng đang hoạt động
- `GET /api/v1/restaurants/:id` - Lấy thông tin nhà hàng theo ID
- `POST /api/v1/restaurants` - Tạo nhà hàng mới
- `PUT /api/v1/restaurants/:id` - Cập nhật thông tin nhà hàng
- `DELETE /api/v1/restaurants/:id` - Xóa nhà hàng

### Orders
- `GET /api/v1/orders` - Lấy tất cả đơn hàng
- `GET /api/v1/orders/:id` - Lấy thông tin đơn hàng theo ID
- `POST /api/v1/orders` - Tạo đơn hàng mới
- `PATCH /api/v1/orders/:id/status` - Cập nhật trạng thái đơn hàng

### Delivery
- `GET /api/v1/delivery/methods/:restaurantId?customerLat=xxx&customerLng=xxx` - Lấy các phương thức giao hàng khả dụng

## Delivery Strategies

Hệ thống hỗ trợ 3 phương thức giao hàng:

### 1. Bicycle (Xe đạp)
- Khoảng cách tối đa: 5 km
- Chi phí: 10,000 VNĐ/km
- Thời gian ước tính: 8 phút/km

### 2. Motorbike (Xe máy)
- Khoảng cách tối đa: 20 km
- Chi phí: 15,000 VNĐ/km
- Thời gian ước tính: 4 phút/km

### 3. Drone (Máy bay không người lái)
- Khoảng cách tối đa: 15 km
- Chi phí: 25,000 VNĐ/km
- Thời gian ước tính: 2 phút/km

## Example Usage

### Create a Restaurant
```bash
curl -X POST http://localhost:3000/api/v1/restaurants \
  -H "Content-Type: application/json" \
  -d '{
    "id": "rest-001",
    "name": "Pizza House",
    "address": "123 Main St",
    "latitude": 10.8231,
    "longitude": 106.6297,
    "cuisineType": "Italian",
    "rating": 4.5,
    "isActive": true
  }'
```

### Create an Order
```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Content-Type: application/json" \
  -d '{
    "restaurantId": "rest-001",
    "customerName": "John Doe",
    "customerAddress": "456 Customer St",
    "customerLatitude": 10.8500,
    "customerLongitude": 106.6500,
    "items": [
      {
        "name": "Margherita Pizza",
        "quantity": 2,
        "price": 150000
      }
    ],
    "totalAmount": 300000,
    "deliveryMethod": "MOTORBIKE"
  }'
```

### Get Available Delivery Methods
```bash
curl "http://localhost:3000/api/v1/delivery/methods/rest-001?customerLat=10.8500&customerLng=106.6500"
```

## Technologies

- **TypeScript**: Strongly typed programming language
- **Express.js**: Web framework
- **Node.js**: Runtime environment

## Design Patterns

- **Strategy Pattern**: Các chiến lược giao hàng khác nhau
- **Repository Pattern**: Trừu tượng hóa data access layer
- **Dependency Injection**: Giảm coupling giữa các components

## License

MIT