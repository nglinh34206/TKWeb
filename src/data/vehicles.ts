import { Vehicle } from '../types';

export const VEHICLES: Vehicle[] = [
  {
    id: 'vinfast-vf8-electric',
    name: 'VinFast VF8 Plus (Xe Điện SUV 5 Chỗ)',
    type: 'self_drive',
    seats: 5,
    transmission: 'Tự động',
    fuelType: 'Điện',
    pricePerDay: 950000,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    features: ['Hệ thống ADAS lái thông minh', 'Sạc pin miễn phí tại trạm VinFast', 'Màn hình 15.6 inch', 'Cửa sổ trời toàn cảnh', 'Bảo hiểm vật chất 2 chiều'],
    locationAvailable: ['Hà Nội', 'Đà Nẵng', 'TP. Hồ Chí Minh', 'Nha Trang', 'Phú Quốc'],
    rating: 4.92,
    reviewsCount: 380,
    provider: 'GreenSM Rental Official'
  },
  {
    id: 'kia-carnival-vip-7seats',
    name: 'Kia Carnival Signature (MPV 7 Chỗ VIP)',
    type: 'self_drive',
    seats: 7,
    transmission: 'Tự động',
    fuelType: 'Dầu',
    pricePerDay: 1650000,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    features: ['Ghế cơ trưởng massage chỉnh điện', 'Cửa trượt điện 2 bên', 'Cốp điện thông minh', 'Dàn loa Bose 12 loa', 'Không gian để hành lý siêu rộng'],
    locationAvailable: ['Hà Nội', 'Đà Nẵng', 'TP. Hồ Chí Minh', 'Phú Quốc'],
    rating: 4.95,
    reviewsCount: 520,
    provider: 'Vietnam Luxury Car Rental'
  },
  {
    id: 'limousine-dcar-vip-hanoi-halong',
    name: 'DCar Limousine 9 Chỗ Hạng Thượng Gia',
    type: 'limousine',
    seats: 9,
    transmission: 'Tự động',
    fuelType: 'Dầu',
    pricePerDay: 280000, // giá vé theo ghế/tuyến
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    features: ['Đón trả tận nơi tại khách sạn/nhà riêng', 'Ghế ngả 180 độ massage', 'Cổng sạc USB từng ghế', 'Nước suối & khăn lạnh', 'Wifi 5G tốc độ cao'],
    locationAvailable: ['Tuyến Hà Nội - Hạ Long', 'Tuyến Hà Nội - Sa Pa', 'Tuyến Sài Gòn - Vũng Tàu', 'Tuyến Sài Gòn - Đà Lạt', 'Tuyến Đà Nẵng - Hội An'],
    rating: 4.9,
    reviewsCount: 1840,
    provider: 'Eco Travel Limousine VIP'
  },
  {
    id: 'airport-transfer-sedan',
    name: 'Xe Đưa Đón Sân Bay Riêng (Sedan 4-5 Chỗ)',
    type: 'airport_transfer',
    seats: 4,
    transmission: 'Tự động',
    fuelType: 'Xăng',
    pricePerDay: 350000,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
    features: ['Tài xế đón sẵn tại sảnh đến với bảng tên', 'Theo dõi chuyến bay theo thời gian thực', 'Miễn phí chờ 60 phút khi trễ chuyến', 'Xe đời mới sạch sẽ thơm mát'],
    locationAvailable: ['Sân bay Nội Bài (HAN)', 'Sân bay Tân Sơn Nhất (SGN)', 'Sân bay Đà Nẵng (DAD)', 'Sân bay Cam Ranh (CXR)', 'Sân bay Phú Quốc (PQC)'],
    rating: 4.96,
    reviewsCount: 2910,
    provider: 'Airport Express Transfer'
  },
  {
    id: 'toyota-cross-hybrid',
    name: 'Toyota Corolla Cross 1.8HV (Hybrid)',
    type: 'self_drive',
    seats: 5,
    transmission: 'Tự động',
    fuelType: 'Xăng',
    pricePerDay: 850000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    features: ['Siêu tiết kiệm nhiên liệu (4.2L/100km)', 'Gói an toàn Toyota Safety Sense', 'Apple CarPlay & Android Auto', 'Giao xe tận nơi miễn phí'],
    locationAvailable: ['Hà Nội', 'Đà Nẵng', 'TP. Hồ Chí Minh', 'Đà Lạt', 'Nha Trang'],
    rating: 4.88,
    reviewsCount: 410,
    provider: 'AutoRentals VN'
  },
  {
    id: 'motorbike-honda-airblade',
    name: 'Xe Máy Tay Ga Honda Air Blade 160cc',
    type: 'motorbike',
    seats: 2,
    transmission: 'Tự động',
    fuelType: 'Xăng',
    pricePerDay: 140000,
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    features: ['Động cơ 160cc mạnh mẽ leo dốc tốt', 'Kèm 2 mũ bảo hiểm đạt chuẩn & áo mưa', 'Khóa thông minh Smartkey chống trộm', 'Giao xe tại khách sạn/homestay'],
    locationAvailable: ['Sa Pa', 'Ninh Bình', 'Đà Nẵng', 'Hội An', 'Đà Lạt', 'Phú Quốc', 'Hà Giang'],
    rating: 4.93,
    reviewsCount: 1680,
    provider: 'Motogo Vietnam Rental'
  }
];
