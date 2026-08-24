import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'vinh-ha-long',
    name: 'Vịnh Hạ Long',
    province: 'Quảng Ninh',
    region: 'north',
    category: 'nature',
    tagline: 'Kỳ quan thiên nhiên thế giới với hàng ngàn đảo đá vôi kỳ vĩ',
    description: 'Vịnh Hạ Long là di sản thiên nhiên thế giới được UNESCO công nhận với hơn 1.600 hòn đảo lớn nhỏ nhấp nhô trên làn nước xanh ngọc bích. Trải nghiệm du thuyền ngắm hoàng hôn, chèo kayak khám phá hang Sửng Sốt, hang Luồn và làng chài Cửa Vạn là những khoảnh khắc không thể nào quên.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewsCount: 3840,
    lat: 20.9101,
    lng: 107.1839,
    bestTimeToVisit: 'Tháng 10 - Tháng 4 (Trời trong xanh, khí hậu mát mẻ)',
    idealStayDays: '2 - 3 ngày',
    avgBudget: '2.500.000 - 6.000.000 VNĐ / người',
    highlights: [
      'Du thuyền 5 sao vịnh Hạ Long & Vịnh Lan Hạ',
      'Chèo thuyền Kayak qua hang Luồn',
      'Thám hiểm hang Sửng Sốt, động Thiên Cung',
      'Tắm biển tại đảo Ti Tốp và ngắm toàn cảnh 360 độ'
    ],
    specialties: ['Chả mực giã tay Hạ Long', 'Sá sùng Quan Lạn', 'Bún bề bề', 'Bánh gật gù Tiên Yên'],
    tips: ['Nên đặt tour du thuyền ngủ đêm để ngắm bình minh tuyệt mỹ', 'Mang theo túi chống nước khi chèo kayak'],
    popularNearbySpots: ['Vịnh Lan Hạ', 'Đảo Cát Bà', 'Bảo tàng Quảng Ninh', 'Bán đảo Tuần Châu']
  },
  {
    id: 'pho-co-hoi-an',
    name: 'Phố Cổ Hội An',
    province: 'Quảng Nam',
    region: 'central',
    category: 'heritage',
    tagline: 'Thương cảng cổ thế kỷ 16 rực rỡ sắc đèn lồng và nét hoài cổ',
    description: 'Hội An quyến rũ du khách bởi những con phố sơn vàng rêu phong, hàng nghìn chiếc đèn lồng lung linh khi đêm về bên dòng sông Hoài thơ mộng. Nơi đây từng là thương cảng quốc tế sầm uất với sự giao thoa văn hóa kiến trúc Việt - Hoa - Nhật - Pháp nguyên vẹn.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df5703bc2e0?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.95,
    reviewsCount: 5120,
    lat: 15.8801,
    lng: 108.338,
    bestTimeToVisit: 'Tháng 2 - Tháng 7 (Mùa khô, nắng ấm dịu dàng)',
    idealStayDays: '2 - 4 ngày',
    avgBudget: '1.800.000 - 4.500.000 VNĐ / người',
    highlights: [
      'Thả hoa đăng cầu may trên sông Hoài về đêm',
      'Check-in Chùa Cầu biểu tượng di sản 400 năm',
      'Thưởng thức trà thảo mộc Mót mát lành',
      'Đạp xe dạo chơi làng gốm Thanh Hà & làng rau Trà Quế'
    ],
    specialties: ['Cao Lầu Hội An', 'Cơm gà Bà Buội', 'Bánh mì Phượng / Madam Khánh', 'Mì Quảng ếch', 'Bánh đập hến xào'],
    tips: ['Nên ghé thăm vào ngày rằm 14 âm lịch hàng tháng khi phố cổ tắt điện và thắp đèn lồng lãng mạn', 'Thuê trang phục truyền thống để có ảnh kỷ niệm đẹp'],
    popularNearbySpots: ['Biển An Bàng', 'Rừng dừa Bảy Mẫu', 'Cù Lao Chàm', 'Thánh địa Mỹ Sơn']
  },
  {
    id: 'dao-ngoc-phu-quoc',
    name: 'Đảo Ngọc Phú Quốc',
    province: 'Kiên Giang',
    region: 'south',
    category: 'beach',
    tagline: 'Thiên đường biển nhiệt đới với bãi cát trắng mịn và hoàng hôn triệu đô',
    description: 'Phú Quốc là hòn đảo lớn nhất Việt Nam, được mệnh danh là thiên đường nghỉ dưỡng nhiệt đới. Nơi đây sở hữu những bãi biển tuyệt đẹp như Bãi Sao, Bãi Khem, Bãi Dài cùng hệ sinh thái san hô rực rỡ và những khu phức hợp giải trí quy mô quốc tế.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.88,
    reviewsCount: 4670,
    lat: 10.2899,
    lng: 103.984,
    bestTimeToVisit: 'Tháng 11 - Tháng 4 năm sau (Biển êm sóng lặng, trời trong vắt)',
    idealStayDays: '3 - 5 ngày',
    avgBudget: '3.500.000 - 8.000.000 VNĐ / người',
    highlights: [
      'Ngắm hoàng hôn trác tuyệt tại Sunset Sanato & Grand World',
      'Đi cáp treo Hòn Thơm vượt biển dài nhất thế giới',
      'Lặn ngắm san hô tại quần đảo An Thới',
      'Khám phá Safari bán hoang dã đầu tiên tại Việt Nam'
    ],
    specialties: ['Gỏi cá trích Phú Quốc', 'Bún quậy Kiến Xây', 'Nhum biển nướng mỡ hành', 'Hải sản Hàm Ninh', 'Tiêu chín Phú Quốc'],
    tips: ['Thuê xe máy hoặc ô tô tự lái để dễ dàng khám phá cả Bắc đảo và Nam đảo', 'Đặt tour cano 4 đảo để có trải nghiệm lặn biển tốt nhất'],
    popularNearbySpots: ['Hòn Móng Tay', 'Hòn Mây Rút', 'Làng chài Rạch Vẹm (Sao biển)', 'Thị trấn Hoàng Hôn Sunset Town']
  },
  {
    id: 'sapa-fansipan',
    name: 'Sa Pa & Đỉnh Fansipan',
    province: 'Lào Cai',
    region: 'north',
    category: 'mountain',
    tagline: 'Xứ sở sương mù và Nóc nhà Đông Dương hùng vĩ giữa mây ngàn',
    description: 'Sa Pa nằm nép mình bên dãy Hoàng Liên Sơn hùng vĩ, nổi tiếng với những thửa ruộng bậc thang kỳ ảo, bản làng mộc mạc của đồng bào H\'Mông, Dao Đỏ cùng đỉnh Fansipan 3.143m cao nhất Đông Dương.',
    image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.85,
    reviewsCount: 3290,
    lat: 22.3364,
    lng: 103.8438,
    bestTimeToVisit: 'Tháng 9 - 10 (Mùa lúa chín vàng) & Tháng 12 - 2 (Mùa hoa đào, săn tuyết)',
    idealStayDays: '2 - 3 ngày',
    avgBudget: '2.000.000 - 5.000.000 VNĐ / người',
    highlights: [
      'Chinh phục Nóc nhà Đông Dương Fansipan bằng cáp treo kỷ lục',
      'Trekking ngắm ruộng bậc thang Bản Cát Cát, Tả Van',
      'Check-in Đèo Ô Quy Hồ một trong tứ đại đỉnh đèo',
      'Tắm lá thuốc người Dao Đỏ hồi phục thể lực'
    ],
    specialties: ['Lẩu cá hồi / cá tầm Sa Pa', 'Thịt lợn cắp nách nướng than', 'Thắng cố Bản Phố', 'Cải mèo xào thịt bò'],
    tips: ['Chuẩn bị áo ấm dù đi vào mùa hè vì ban đêm nhiệt độ vùng cao xuống thấp', 'Nên đi chuyến tàu hỏa Mường Hoa để chụp ảnh retro cực đẹp'],
    popularNearbySpots: ['Cổng trời Ô Quy Hồ', 'Thác Bạc', 'Bản Tả Phìn', 'Thung lũng Mường Hoa']
  },
  {
    id: 'thanh-pho-da-nang',
    name: 'Đà Nẵng - Thành Phố Đáng Sống',
    province: 'Đà Nẵng',
    region: 'central',
    category: 'city',
    tagline: 'Trung tâm du lịch biển hiện đại với Cầu Vàng và Bãi biển Mỹ Khê',
    description: 'Đà Nẵng là thành phố biển đáng sống bậc nhất Việt Nam, kết hợp hài hòa giữa đô thị hiện đại, bãi biển Mỹ Khê lọt top đẹp nhất hành tinh, bán đảo Sơn Trà hoang sơ và kiệt tác Cầu Vàng trên đỉnh Bà Nà Hills.',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.92,
    reviewsCount: 6280,
    lat: 16.0544,
    lng: 108.2022,
    bestTimeToVisit: 'Tháng 3 - Tháng 8 (Biển xanh nắng vàng rực rỡ)',
    idealStayDays: '3 - 4 ngày',
    avgBudget: '2.500.000 - 6.000.000 VNĐ / người',
    highlights: [
      'Check-in Cầu Vàng Bà Nà Hills giữa lưng chừng mây',
      'Tắm biển Mỹ Khê và tham gia các môn thể thao lướt ván, dù lượn',
      'Ngắm Cầu Rồng phun lửa và phun nước vào 21:00 cuối tuần',
      'Khám phá Ngũ Hành Sơn và Chùa Linh Ứng Sơn Trà'
    ],
    specialties: ['Bánh tráng cuốn thịt heo hai đầu da', 'Bún chả cá Đà Nẵng', 'Mì Quảng Ếch Trang', 'Hải sản tươi sống Năm Đảnh'],
    tips: ['Nên ghé Bán đảo Sơn Trà vào lúc bình minh hoặc hoàng hôn để ngắm voọc chà vá chân nâu', 'Kết hợp chuyến đi cùng Hội An và Huế rất thuận tiện'],
    popularNearbySpots: ['Bà Nà Hills', 'Bán đảo Sơn Trà', 'Cầu Rồng', 'Đèo Hải Vân']
  },
  {
    id: 'thanh-pho-ho-chi-minh',
    name: 'TP. Hồ Chí Minh (Sài Gòn)',
    province: 'Hồ Chí Minh',
    region: 'south',
    category: 'city',
    tagline: 'Hòn ngọc Viễn Đông sôi động, giao thoa giữa lịch sử và nhịp sống hiện đại',
    description: 'Thành phố lớn và năng động nhất cả nước với những tòa nhà chọc trời Landmark 81, Bitexco xen kẽ các công trình kiến trúc Pháp cổ kính như Bưu điện Trung tâm, Dinh Độc Lập cùng nền ẩm thực đường phố phong phú 24/7.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.84,
    reviewsCount: 5410,
    lat: 10.8231,
    lng: 106.6297,
    bestTimeToVisit: 'Quanh năm (Mùa khô từ tháng 12 đến tháng 4 mát mẻ hơn)',
    idealStayDays: '2 - 3 ngày',
    avgBudget: '2.000.000 - 5.500.000 VNĐ / người',
    highlights: [
      'Ngắm toàn cảnh thành phố từ đài quan sát Landmark 81 SkyView',
      'Trải nghiệm xe buýt đường sông Saigon Waterbus ngắm hoàng hôn',
      'Thưởng thức ẩm thực đường phố tại Chợ Bến Thành & Phố đi bộ Nguyễn Huệ',
      'Khám phá Dinh Độc Lập và Địa đạo Củ Chi lịch sử'
    ],
    specialties: ['Cơm tấm sườn bì chả Ba Ghiền', 'Bánh mì chảo / Bánh mì Huỳnh Hoa', 'Hủ tiếu Nam Vang', 'Cà phê sữa đá vỉa hè'],
    tips: ['Trải nghiệm đi xe buýt 2 tầng Hop-on Hop-off để thăm các điểm di tích trung tâm Quận 1 dễ dàng', 'Thử trải nghiệm cà phê bệt Nhà thờ Đức Bà'],
    popularNearbySpots: ['Landmark 81', 'Chợ Bến Thành', 'Địa đạo Củ Chi', 'Phố Tây Bùi Viện']
  },
  {
    id: 'ha-noi-nghin-nam-van-hien',
    name: 'Thủ Đô Hà Nội',
    province: 'Hà Nội',
    region: 'north',
    category: 'heritage',
    tagline: 'Trái tim của Tổ quốc với 36 phố phường và ngàn năm văn hiến',
    description: 'Hà Nội mang vẻ đẹp thâm trầm, cổ kính với Hồ Gươm xanh biếc, Tháp Rùa huyền thoại, Văn Miếu Quốc Tử Giám - trường đại học đầu tiên của Việt Nam, cùng nét văn hóa ẩm thực tinh tế nức tiếng bốn phương.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.89,
    reviewsCount: 5890,
    lat: 21.0285,
    lng: 105.8542,
    bestTimeToVisit: 'Mùa thu tháng 9 - tháng 11 (Mùa hoa sữa, trời heo may dịu mát)',
    idealStayDays: '2 - 4 ngày',
    avgBudget: '1.800.000 - 4.500.000 VNĐ / người',
    highlights: [
      'Đi dạo quanh Hồ Hoàn Kiếm và viếng Đền Ngọc Sơn',
      'Khám phá 36 phố phường bằng xe điện hoặc xích lô',
      'Thưởng thức Cà phê Trứng Giảng trứ danh từ năm 1946',
      'Thăm Quảng trường Ba Đình & Lăng Chủ tịch Hồ Chí Minh'
    ],
    specialties: ['Phở bò gia truyền Bát Đàn / Phở Thìn', 'Bún chả Hương Liên (Obama)', 'Chả cá Lã Vọng', 'Bánh cốm Làng Vòng'],
    tips: ['Dạo phố đi bộ Hồ Gươm vào các buổi tối cuối tuần để hòa mình vào không khí nghệ thuật đường phố', 'Dậy sớm ngắm chợ hoa Quảng Bá rực rỡ'],
    popularNearbySpots: ['Hồ Hoàn Kiếm', 'Hoàng Thành Thăng Long', 'Hồ Tây', 'Làng gốm Bát Tràng']
  },
  {
    id: 'co-do-hue',
    name: 'Cố Đô Huế',
    province: 'Thừa Thiên Huế',
    region: 'central',
    category: 'heritage',
    tagline: 'Vẻ đẹp trầm mặc, thơ mộng của Kinh thành triều Nguyễn và dòng sông Hương',
    description: 'Kinh đô cuối cùng của chế độ phong kiến Việt Nam, nơi lưu giữ quần thể di tích Cố đô nguy nga, các lăng tẩm hoàng gia tráng lệ (Lăng Khải Định, Tự Đức, Minh Mạng) và nhã nhạc cung đình Huế - kiệt tác phi vật thể nhân loại.',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.86,
    reviewsCount: 3120,
    lat: 16.4637,
    lng: 107.5909,
    bestTimeToVisit: 'Tháng 1 - Tháng 4 (Mát mẻ, mùa hoa nở) hoặc mùa Festival Huế',
    idealStayDays: '2 - 3 ngày',
    avgBudget: '1.500.000 - 3.800.000 VNĐ / người',
    highlights: [
      'Thăm Đại Nội Kinh thành Huế nguy nga tráng lệ',
      'Nghe ca Huế trên thuyền rồng dọc dòng sông Hương',
      'Chiêm bái Chùa Thiên Mụ cổ kính bên bờ sông',
      'Khám phá kiến trúc Đông Tây độc đáo tại Lăng Khải Định'
    ],
    specialties: ['Bún bò Huế O Cương', 'Cơm hến / Bún hến cồn Hến', 'Bánh bèo, nậm, lọc Huế', 'Chè bột lọc bọc heo quay'],
    tips: ['Thuê trang phục Cổ phục Việt (Việt phục) để chụp ảnh tại Đại Nội rất trang nhã', 'Thưởng thức trà cung đình Huế thanh mát'],
    popularNearbySpots: ['Đại Nội Huế', 'Chùa Thiên Mụ', 'Sông Hương & Cầu Tràng Tiền', 'Lăng Khải Định']
  },
  {
    id: 'ninh-binh-trang-an',
    name: 'Ninh Bình - Tràng An',
    province: 'Ninh Bình',
    region: 'north',
    category: 'nature',
    tagline: 'Vịnh Hạ Long trên cạn với di sản văn hóa và thiên nhiên kép UNESCO',
    description: 'Ninh Bình sở hữu Quần thể danh thắng Tràng An di sản kép đầu tiên của Đông Nam Á. Những dòng sông uốn lượn dưới chân vách núi đá vôi sừng sững, đầm sen thơm ngát và hang Múa với góc nhìn panorama kỳ ảo.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.91,
    reviewsCount: 3950,
    lat: 20.2506,
    lng: 105.9745,
    bestTimeToVisit: 'Tháng 1 - Tháng 3 (Mùa lễ hội chùa Bái Đính) & Tháng 5 - 6 (Mùa lúa chín Tam Cốc)',
    idealStayDays: '2 ngày',
    avgBudget: '1.500.000 - 3.500.000 VNĐ / người',
    highlights: [
      'Đi thuyền tay khám phá Quần thể Tràng An xuyên thủy động',
      'Leo 500 bậc đá chinh phục Đỉnh Ngọa Long Hang Múa',
      'Viếng Chùa Bái Đính ngôi chùa sở hữu nhiều kỷ lục châu Á',
      'Ngắm mùa lúa chín Tam Cốc - Bích Động'
    ],
    specialties: ['Cơm cháy Ninh Bình ruốc sốt dê', 'Thịt dê núi nướng tảng', 'Ốc núi Ninh Bình', 'Rượu cần Nho Quan'],
    tips: ['Nên chọn tuyến thuyền số 2 hoặc số 3 tại Tràng An để đi qua nhiều hang dài nhất và phim trường Kong Skull Island'],
    popularNearbySpots: ['Quần thể Tràng An', 'Tuyệt Tình Cốc (Động Am Tiên)', 'Chùa Bái Đính', 'Hang Múa']
  },
  {
    id: 'da-lat-thanh-pho-ngan-hoa',
    name: 'Đà Lạt - Thành Phố Ngàn Hoa',
    province: 'Lâm Đồng',
    region: 'central',
    category: 'mountain',
    tagline: 'Tiểu Paris của xứ sở sương mù với khí hậu ôn đới se lạnh quanh năm',
    description: 'Nằm trên cao nguyên Lâm Viên ở độ cao 1.500m, Đà Lạt hấp dẫn bởi không khí mát mẻ dễ chịu, những rừng thông bạt ngàn, đồi chè Cầu Đất xanh mướt, thung lũng tình yêu và vô vàn quán cà phê săn mây thơ mộng.',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.87,
    reviewsCount: 4980,
    lat: 11.9404,
    lng: 108.4583,
    bestTimeToVisit: 'Tháng 11 - Tháng 3 (Mùa hoa mai anh đào, dã quỳ và cỏ hồng)',
    idealStayDays: '3 - 4 ngày',
    avgBudget: '2.000.000 - 4.500.000 VNĐ / người',
    highlights: [
      'Săn mây bình minh tại đồi chè Cầu Đất Panorama',
      'Dạo xe đạp đôi quanh Hồ Xuân Hương và ngắm hoàng hôn Hồ Tuyền Lâm',
      'Thưởng thức bánh tráng nướng & sữa đậu nành nóng tại Chợ Đêm Đà Lạt',
      'Check-in Quảng trường Lâm Viên với biểu tượng hoa Atiso'
    ],
    specialties: ['Lẩu gà lá é Tao Ngộ', 'Bánh ướt lòng gà', 'Bánh tráng nướng (Pizza Đà Lạt)', 'Dâu tây tươi New Zealand & Mứt hoa quả'],
    tips: ['Nên thức dậy từ 4:30 sáng nếu muốn đi săn biển mây tuyệt đẹp ở Cầu Đất', 'Mang theo áo khoác ấm vì nhiệt độ ban đêm có thể xuống 13-15°C'],
    popularNearbySpots: ['Hồ Xuân Hương', 'Hồ Tuyền Lâm', 'Đồi Chè Cầu Đất', 'Núi Langbiang']
  },
  {
    id: 'nha-trang-khanh-hoa',
    name: 'Nha Trang - Vịnh Biển Xanh',
    province: 'Khánh Hòa',
    region: 'central',
    category: 'beach',
    tagline: 'Một trong những vịnh biển đẹp nhất thế giới với đảo ngọc VinWonders',
    description: 'Nha Trang được thiên nhiên ưu ái với bãi biển cát vàng thoai thoải trải dài, hơn 19 hòn đảo lớn nhỏ, khí hậu nắng ấm hơn 300 ngày trong năm cùng hệ thống giải trí VinWonders cáp treo vượt biển.',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.83,
    reviewsCount: 3670,
    lat: 12.2388,
    lng: 109.1967,
    bestTimeToVisit: 'Tháng 1 - Tháng 8 (Biển êm ả, nắng chan hòa)',
    idealStayDays: '3 - 4 ngày',
    avgBudget: '2.500.000 - 5.500.000 VNĐ / người',
    highlights: [
      'Vui chơi không giới hạn tại đảo giải trí VinWonders Hòn Tre',
      'Tour lặn biển ngắm san hô tại Khu bảo tồn Hòn Mun',
      'Tắm bùn khoáng nóng thiên nhiên I-Resort thư giãn',
      'Chiêm ngưỡng kiến trúc Tháp Bà Ponagar nghìn năm'
    ],
    specialties: ['Bún sứa Nha Trang', 'Nem nướng Đặng Văn Quyên', 'Bánh căn mực trứng', 'Yến sào Khánh Hòa thượng hạng'],
    tips: ['Trải nghiệm đi tàu cao tốc ra Đảo Điệp Sơn để bước đi trên con đường giữa biển độc nhất'],
    popularNearbySpots: ['Đảo Hòn Tre (VinWonders)', 'Tháp Bà Ponagar', 'Hòn Mun', 'Đảo Điệp Sơn']
  },
  {
    id: 'can-tho-song-nuoc-mien-tay',
    name: 'Cần Thơ - Thủ Phủ Miền Tây',
    province: 'Cần Thơ',
    region: 'south',
    category: 'nature',
    tagline: 'Vẻ đẹp sông nước miệt vườn và nét văn hóa Chợ nổi Cái Răng',
    description: 'Cần Thơ được mệnh danh là Tây Đô - trung tâm đồng bằng sông Cửu Long. Nổi tiếng với cảnh sắc sông nước thanh bình, chợ nổi tấp nập ghe xuồng mua bán trái cây, những vườn cây ăn trái trĩu quả và người dân đôn hậu mến khách.',
    image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.81,
    reviewsCount: 2840,
    lat: 10.0452,
    lng: 105.7469,
    bestTimeToVisit: 'Tháng 5 - Tháng 8 (Mùa trái cây chín rộ) hoặc tháng 9 - 11 (Mùa nước nổi)',
    idealStayDays: '2 - 3 ngày',
    avgBudget: '1.200.000 - 3.200.000 VNĐ / người',
    highlights: [
      'Đi thuyền sớm ngắm bình minh và ăn bún riêu trên Chợ nổi Cái Răng',
      'Hái trái cây thỏa thích tại Vườn cây Mỹ Khánh, Cồn Sơn',
      'Dạo Bến Ninh Kiều và check-in Cầu đi bộ Tình Yêu',
      'Thăm Nhà cổ Bình Thủy với kiến trúc giao thoa Pháp - Việt tuyệt mỹ'
    ],
    specialties: ['Bánh xèo miền Tây củ hũ dừa', 'Lẩu mắm Dạ Lý', 'Vịt nấu chao Thành Giao', 'Bánh tét lá cẩm Cần Thơ'],
    tips: ['Nên có mặt tại Bến Ninh Kiều lúc 5:30 sáng để đón ghe đi Chợ nổi Cái Răng lúc chợ họp đông vui nhất'],
    popularNearbySpots: ['Chợ nổi Cái Răng', 'Bến Ninh Kiều', 'Nhà cổ Bình Thủy', 'Cồn Sơn']
  }
];
