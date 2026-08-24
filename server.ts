import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API: AI Travel Plan Generator
app.post('/api/gemini/travel-plan', async (req, res) => {
  try {
    const { destination, durationDays, budgetPerPerson, travelStyle, companions } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback structured travel plan when API key is not configured
      return res.json({
        success: true,
        data: generateFallbackPlan(destination, durationDays, budgetPerPerson, travelStyle, companions),
        isFallback: true
      });
    }

    const prompt = `
Bạn là chuyên gia cố vấn du lịch Việt Nam chuyên nghiệp.
Hãy lập một kế hoạch du lịch chi tiết và thực tế cho khách du lịch với các thông tin sau:
- Điểm đến: ${destination || 'Việt Nam'}
- Số ngày dự kiến: ${durationDays || 3} ngày
- Ngân sách ước tính: ${budgetPerPerson || '5.000.000'} VNĐ / người
- Phong cách du lịch: ${travelStyle || 'Khám phá & Nghỉ dưỡng'}
- Đi cùng: ${companions || 'Gia đình / Bạn bè'}

Yêu cầu trả về định dạng JSON thuần túy (không bọc markdown \`\`\`json) với cấu trúc sau:
{
  "tripTitle": "Tên chuyến đi hấp dẫn",
  "summary": "Tóm tắt ngắn gọn trải nghiệm tổng quan",
  "recommendedSeason": "Thời điểm lý tưởng nhất trong năm",
  "estimatedTotalCost": "Tổng chi phí dự kiến chi tiết",
  "transportationTips": "Cách di chuyển tối ưu nhất (máy bay, tàu, xe limousine)",
  "itineraryDays": [
    {
      "day": 1,
      "title": "Chủ đề ngày 1",
      "morning": "Hoạt động buổi sáng & địa điểm tham quan",
      "lunch": "Gợi ý quán ăn trưa & món đặc sản nổi tiếng",
      "afternoon": "Hoạt động buổi chiều & check-in",
      "dinner": "Bữa tối ẩm thực địa phương",
      "evening": "Hoạt động về đêm (chợ đêm, cà phê, dạo phố)",
      "tips": "Mẹo hữu ích cho ngày này"
    }
  ],
  "mustTryFoods": [
    {"name": "Tên món", "recommendedPlace": "Địa chỉ / Quán nổi tiếng"}
  ],
  "luggagePackingTips": ["Gợi ý chuẩn bị hành lý 1", "Gợi ý 2", "Gợi ý 3"]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const responseText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText.trim());
    } catch {
      // Clean potential markdown blocks if present
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanJson);
    }

    res.json({ success: true, data: parsedData, isFallback: false });
  } catch (error: any) {
    console.error('Error generating AI travel plan:', error);
    // Fallback response on error
    const { destination, durationDays, budgetPerPerson, travelStyle, companions } = req.body;
    res.json({
      success: true,
      data: generateFallbackPlan(destination, durationDays, budgetPerPerson, travelStyle, companions),
      isFallback: true,
      errorNote: error.message
    });
  }
});

// API: AI Travel Assistant Q&A Chat
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        reply: generateAssistantFallback(message)
      });
    }

    const systemInstruction = `
Bạn là "Việt Travel AI" - Trợ lý du lịch thông minh số 1 tại Việt Nam.
Nhiệm vụ của bạn:
1. Tư vấn nhiệt tình, thân thiện, sành sỏi về du lịch khắp 3 miền Việt Nam (Bắc - Trung - Nam).
2. Gợi ý điểm đến đẹp, món ngon đặc sản, quán ăn chuẩn vị địa phương, mẹo đặt phòng khách sạn, vé máy bay, thuê xe tiết kiệm và tuyến đường chỉ dẫn thuận tiện nhất.
3. Trả lời bằng tiếng Việt lịch sự, có định dạng danh sách và emoji sinh động, ngắn gọn và dễ hiểu.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({
      reply: response.text || 'Xin lỗi, tôi chưa thể xử lý câu hỏi này lúc này. Bạn có muốn tìm hiểu về các điểm đến nổi tiếng như Hạ Long, Hội An, Phú Quốc hay Đà Nẵng không?'
    });
  } catch (error: any) {
    console.error('Error in AI Chat:', error);
    res.json({
      reply: generateAssistantFallback(req.body.message || '')
    });
  }
});

// Helper Fallback functions
function generateFallbackPlan(destination = 'Đà Nẵng - Hội An', days = 3, budget = '5.000.000', style = 'Nghỉ dưỡng & Khám phá', companions = 'Gia đình') {
  return {
    tripTitle: `Hành Trình Khám Phá Tuyệt Đẹp Tại ${destination}`,
    summary: `Chuyến du lịch ${days} ngày ${Number(days) - 1} đêm trọn vẹn dành cho ${companions} theo phong cách ${style}, khám phá trọn vẹn danh lam thắng cảnh, ẩm thực đặc trưng và văn hóa độc đáo.`,
    recommendedSeason: 'Tháng 2 - Tháng 8 (Nắng đẹp, biển êm, thuận lợi tham quan ngoài trời)',
    estimatedTotalCost: `${budget} VNĐ / người (Bao gồm vé máy bay/xe, khách sạn 4-5 sao, ăn uống đặc sản và vé tham quan)`,
    transportationTips: 'Di chuyển bằng máy bay tới sân bay gần nhất, sau đó thuê xe ô tô tự lái hoặc xe dịch vụ riêng để linh hoạt lịch trình.',
    itineraryDays: [
      {
        day: 1,
        title: 'Chào đón & Khám phá biểu tượng danh thắng',
        morning: 'Đáp chuyến bay buổi sáng, nhận phòng khách sạn hoặc resort ven biển, nghỉ ngơi thư giãn ngắm cảnh.',
        lunch: 'Thưởng thức ẩm thực đặc sản nức tiếng địa phương tại quán gia truyền.',
        afternoon: 'Tham quan các danh thắng biểu tượng nổi tiếng, chụp ảnh check-in và tắm biển hoặc dạo quanh thiên nhiên.',
        dinner: 'Tiệc hải sản tươi sống hoặc bữa tối ấm cúng ngắm hoàng hôn.',
        evening: 'Dạo phố đi bộ, chợ đêm địa phương, thưởng thức trà/cà phê ngắm thành phố về đêm.',
        tips: 'Nên đặt trước vé tham quan trực tuyến để không phải xếp hàng chờ đợi.'
      },
      {
        day: 2,
        title: 'Trải nghiệm văn hóa, di sản & thiên nhiên kỳ vĩ',
        morning: 'Dậy sớm đón bình minh tuyệt đẹp, thưởng thức bữa sáng buffet tại khách sạn, khởi hành đi khu di sản/vùng núi/biển đảo.',
        lunch: 'Ăn trưa tại nhà hàng sinh thái với các món ăn dân dã truyền thống.',
        afternoon: 'Tham gia các hoạt động trải nghiệm thực tế: chèo thuyền/kayak, trekking hoặc chụp ảnh trang phục truyền thống.',
        dinner: 'Thưởng thức các món ăn đường phố nổi tiếng.',
        evening: 'Trải nghiệm thả đèn hoa đăng cầu may hoặc ngắm cầu phun lửa/nhạc nước nghệ thuật.',
        tips: 'Mang theo nón, kính râm, kem chống nắng và sạc dự phòng để chụp ảnh cả ngày.'
      },
      {
        day: 3,
        title: 'Mua sắm đặc sản làm quà & Thư thái tạm biệt',
        morning: 'Dạo chợ truyền thống mua đặc sản địa phương làm quà cho người thân và bạn bè.',
        lunch: 'Bữa trưa nhẹ nhàng với các món bánh/bún đặc sản.',
        afternoon: 'Làm thủ tục trả phòng khách sạn, di chuyển ra sân bay hoặc ga xe, kết thúc chuyến đi tuyệt vời.',
        dinner: 'Ăn nhẹ trước khi lên chuyến bay trở về.',
        evening: 'Trở về nhà an toàn, lưu giữ những kỷ niệm đẹp.',
        tips: 'Đóng gói quà đặc sản cẩn thận vào hành lý ký gửi theo quy định hàng không.'
      }
    ],
    mustTryFoods: [
      { name: 'Đặc sản ẩm thực truyền thống', recommendedPlace: 'Các quán gia truyền tại trung tâm' },
      { name: 'Hải sản tươi sống đánh bắt trong ngày', recommendedPlace: 'Khu ẩm thực ven biển' },
      { name: 'Bánh ngọt & Chè địa phương', recommendedPlace: 'Khu chợ đêm truyền thống' }
    ],
    luggagePackingTips: [
      'Trang phục thoáng mát, đồ bơi và 1 bộ trang phục lịch sự khi viếng đền chùa',
      'Giấy tờ tùy thân (CCCD/Hộ chiếu), bằng lái xe nếu thuê xe tự lái',
      'Kem chống nắng, thuốc cá nhân cơ bản và túi chống nước cho điện thoại'
    ]
  };
}

function generateAssistantFallback(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('hạ long') || q.includes('ha long')) {
    return '🌊 **Vịnh Hạ Long** là kỳ quan thiên nhiên thế giới! Bạn nên đặt tour du thuyền ngủ đêm 2N1Đ để ngắm hoàng hôn và bình minh trên vịnh, chèo kayak tại Hang Luồn và thưởng thức đặc sản chả mực giã tay nóng hổi.';
  }
  if (q.includes('hội an') || q.includes('hoi an')) {
    return '🏮 **Phố cổ Hội An** đẹp nhất vào lúc chiều tà và buổi tối khi phố lên đèn lồng rực rỡ! Đừng quên thử Cao Lầu, Bánh mì Phượng, thả hoa đăng sông Hoài và ghé thăm Chùa Cầu 400 năm tuổi bạn nhé.';
  }
  if (q.includes('phú quốc') || q.includes('phu quoc')) {
    return '🏝️ **Đảo Ngọc Phú Quốc** có biển Bãi Sao và Bãi Khem cát trắng như kem. Bạn nên đi cáp treo Hòn Thơm vượt biển dài nhất thế giới, thưởng thức gỏi cá trích và bún quậy Kiến Xây trứ danh!';
  }
  if (q.includes('đà nẵng') || q.includes('da nang')) {
    return '🌉 **Đà Nẵng** là thành phố đáng sống nhất Việt Nam! Điểm nhấn gồm Cầu Vàng Bà Nà Hills, Bãi biển Mỹ Khê và Cầu Rồng phun lửa lúc 21:00 tối thứ Bảy & Chủ Nhật hàng tuần.';
  }
  if (q.includes('vé máy bay') || q.includes('máy bay') || q.includes('flight')) {
    return '✈️ Bạn có thể sử dụng ngay tính năng **Đặt Vé Máy Bay** trên website để tra cứu chuyến bay của Vietnam Airlines, Vietjet Air, Bamboo Airways với giá tốt nhất và chọn chỗ ngồi trực quan!';
  }
  if (q.includes('khách sạn') || q.includes('hotel') || q.includes('phòng')) {
    return '🏨 Chúng tôi có danh sách các khách sạn và resort 5 sao cao cấp nhất khắp 3 miền với ưu đãi giá tốt, hủy phòng linh hoạt và kèm bữa sáng buffet thượng hạng!';
  }
  if (q.includes('thuê xe') || q.includes('đặt xe') || q.includes('car')) {
    return '🚗 Bạn có thể đặt xe điện VinFast tự lái, MPV 7 chỗ Kia Carnival, xe Limousine VIP đưa đón tận nơi hoặc xe máy phượt ngay trên tab **Thuê Xe**!';
  }

  return '✨ Chào bạn! Tôi là Việt Travel AI. Tôi có thể hỗ trợ bạn lên lịch trình chi tiết theo ngày, gợi ý khách sạn, vé máy bay giá tốt, hướng dẫn cung đường di chuyển và review đặc sản khắp 3 miền Việt Nam. Bạn đang quan tâm đến điểm đến nào?';
}

async function startServer() {
  // Setup Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vietnam Travel & Booking Server running at http://localhost:${PORT}`);
  });
}

startServer();
