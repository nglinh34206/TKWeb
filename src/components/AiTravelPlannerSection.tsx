import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Calendar, 
  DollarSign, 
  Compass, 
  Clock, 
  Utensils, 
  Hotel, 
  MapPin, 
  Loader2,
  CheckCircle2,
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import { AITravelPlan, ChatMessage } from '../types';

interface AiTravelPlannerSectionProps {
  onNavigateToBooking: (service: 'hotel' | 'flight' | 'car', city: string) => void;
}

export const AiTravelPlannerSection: React.FC<AiTravelPlannerSectionProps> = ({
  onNavigateToBooking
}) => {
  const [activeAiTab, setActiveAiTab] = useState<'planner' | 'chat'>('planner');

  // Planner Form State
  const [destination, setDestination] = useState('Vịnh Hạ Long & Phố cổ Hội An');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState('Tiêu chuẩn (5 - 8 triệu / người)');
  const [travelStyle, setTravelStyle] = useState('Nghỉ dưỡng & Khám phá ẩm thực');
  const [companions, setCompanions] = useState('Cặp đôi (2 người)');
  const [plannerLoading, setPlannerLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<AITravelPlan | null>(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Xin chào! Tôi là Trợ lý Du lịch AI Việt Nam. Bạn đang lên kế hoạch khám phá địa danh nào (Hạ Long, Sapa, Hội An, Đà Nẵng, Phú Quốc...), hay cần tư vấn thời điểm đẹp nhất, món ngon đặc sản và đặt vé?',
      timestamp: 'Vừa xong'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Handle Generating AI Travel Plan
  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlannerLoading(true);

    try {
      const res = await fetch('/api/gemini/travel-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, days, budget, travelStyle, companions })
      });
      const data = await res.json();
      if (data.plan) {
        setGeneratedPlan(data.plan);
      }
    } catch (err) {
      console.error('Error generating AI travel plan:', err);
    } finally {
      setPlannerLoading(false);
    }
  };

  // Handle Chat with Gemini
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || chatLoading) return;

    const userText = inputMsg.trim();
    setInputMsg('');
    const newChatHistory: ChatMessage[] = [
      ...chatMessages,
      { role: 'user', content: userText, timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) }
    ];
    setChatMessages(newChatHistory);
    setChatLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: newChatHistory.slice(-6).map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      if (data.reply) {
        setChatMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: data.reply,
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      console.error('Error chatting with AI:', err);
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Hiện tại hệ thống đang bận một chút, bạn có thể tham khảo danh sách khách sạn và vé máy bay trực tiếp ở trên nhé!',
          timestamp: 'Vừa xong'
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const presetQuestions = [
    'Lịch trình 3 ngày 2 đêm ở Phú Quốc cho gia đình có trẻ nhỏ',
    'Review các quán ăn ngon nhất ở Phố cổ Hội An',
    'Kinh nghiệm đi tour du thuyền 5 sao tại Vịnh Hạ Long',
    'Tháng 9 nên đi du lịch ở đâu tại miền Bắc đẹp nhất?'
  ];

  return (
    <section id="ai-planner" className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Trí Tuệ Nhân Tạo Đồng Hành Cùng Bạn</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trợ Lý Du Lịch AI Thông Minh
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Tự động lập lịch trình tour chi tiết từng giờ, gợi ý món ăn đặc sản, khách sạn phù hợp và giải đáp mọi thắc mắc du lịch 24/7.
          </p>

          {/* Sub-tabs switcher */}
          <div className="inline-flex items-center p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 mt-4">
            <button
              onClick={() => setActiveAiTab('planner')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeAiTab === 'planner'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/40'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Lập Lịch Trình Tự Động</span>
            </button>

            <button
              onClick={() => setActiveAiTab('chat')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeAiTab === 'chat'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/40'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Hỏi Đáp Du Lịch Trực Tiếp</span>
            </button>
          </div>
        </div>

        {/* Tab 1: AI Planner Generator */}
        {activeAiTab === 'planner' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Form Panel (5 cols) */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/15 shadow-2xl space-y-4">
              <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Tùy Biến Chuyến Đi Của Bạn</span>
              </h3>

              <form onSubmit={handleGeneratePlan} className="space-y-3.5 text-slate-200 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Điểm đến muốn khám phá *</label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="VD: Hạ Long, Sapa, Hội An, Phú Quốc..."
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/20 rounded-xl text-white font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Số ngày đi</label>
                    <select
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/20 rounded-xl text-white font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    >
                      <option value={2}>2 Ngày 1 Đêm (Cuối tuần)</option>
                      <option value={3}>3 Ngày 2 Đêm (Lý tưởng)</option>
                      <option value={4}>4 Ngày 3 Đêm (Trọn vẹn)</option>
                      <option value={5}>5 Ngày 4 Đêm (Nghỉ dài)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Đối tượng đi cùng</label>
                    <select
                      value={companions}
                      onChange={(e) => setCompanions(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/20 rounded-xl text-white font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    >
                      <option value="Đi một mình (Solo)">Solo (Một mình)</option>
                      <option value="Cặp đôi (2 người)">Cặp đôi lãng mạn</option>
                      <option value="Gia đình có trẻ nhỏ & người cao tuổi">Gia đình có trẻ nhỏ</option>
                      <option value="Nhóm bạn bè trẻ">Nhóm bạn bè trẻ</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Mức ngân sách</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/20 rounded-xl text-white font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    >
                      <option value="Tiết kiệm (Dưới 3 triệu)">Tiết kiệm (Dưới 3tr)</option>
                      <option value="Tiêu chuẩn (5 - 8 triệu / người)">Tiêu chuẩn (5 - 8tr)</option>
                      <option value="Cao cấp 5 sao (Trên 12 triệu)">Sang trọng 5 sao</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Phong cách du lịch</label>
                    <select
                      value={travelStyle}
                      onChange={(e) => setTravelStyle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/20 rounded-xl text-white font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    >
                      <option value="Nghỉ dưỡng & Ẩm thực">Nghỉ dưỡng & Ẩm thực</option>
                      <option value="Trải nghiệm văn hóa & Di sản">Văn hóa & Di sản</option>
                      <option value="Phượt mạo hiểm & Check-in">Khám phá thiên nhiên</option>
                      <option value="Check-in sống ảo & Thư giãn">Chụp ảnh & Cà phê</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={plannerLoading}
                  id="btn-generate-ai-plan"
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {plannerLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>AI Đang Phân Tích & Soạn Lịch Trình...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Tạo Lịch Trình Chi Tiết Bằng AI</span>
                    </>
                  )}
                </button>
              </form>

              {/* Presets */}
              <div className="pt-3 border-t border-white/10 space-y-1.5">
                <p className="text-[11px] text-slate-400 font-semibold">Gợi ý mẫu phổ biến:</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Hạ Long 3 ngày',
                    'Hội An & Đà Nẵng 4 ngày',
                    'Phú Quốc 3 ngày 5 sao',
                    'Sapa săn mây'
                  ].map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setDestination(preset)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-slate-300 font-medium transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Generated Plan Result Panel (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {generatedPlan ? (
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/15 shadow-2xl space-y-6 animate-in fade-in">
                  
                  {/* Plan Header */}
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500 text-slate-950">
                      Lịch Trình Đã Tạo Sẵn Sàng
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
                      {generatedPlan.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      {generatedPlan.summary}
                    </p>
                  </div>

                  {/* Day by Day Schedule */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>Chi tiết các ngày trong tour</span>
                    </h4>

                    <div className="space-y-3">
                      {generatedPlan.days.map((d) => (
                        <div key={d.day} className="p-4 bg-slate-900/80 rounded-2xl border border-white/10 space-y-2.5">
                          <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <span className="font-extrabold text-sm text-emerald-400">
                              Ngày {d.day}: {d.theme}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-white/5 space-y-1">
                              <span className="font-bold text-amber-300 block text-[11px]">🌅 Buổi Sáng:</span>
                              <p className="text-slate-300 text-[11px] leading-relaxed">{d.morning}</p>
                            </div>

                            <div className="p-2.5 rounded-xl bg-white/5 space-y-1">
                              <span className="font-bold text-amber-300 block text-[11px]">☀️ Buổi Chiều:</span>
                              <p className="text-slate-300 text-[11px] leading-relaxed">{d.afternoon}</p>
                            </div>

                            <div className="p-2.5 rounded-xl bg-white/5 space-y-1">
                              <span className="font-bold text-amber-300 block text-[11px]">🌙 Buổi Tối:</span>
                              <p className="text-slate-300 text-[11px] leading-relaxed">{d.evening}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended food & notes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-900/80 rounded-2xl border border-white/10 space-y-1.5">
                      <span className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1">
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Món ngon gợi ý</span>
                      </span>
                      <ul className="space-y-1">
                        {generatedPlan.recommendedDishes.map((dish, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-center gap-1.5">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{dish}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/80 rounded-2xl border border-white/10 space-y-1.5">
                      <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>Chi phí ước tính</span>
                      </span>
                      <p className="text-lg font-extrabold text-white">{generatedPlan.estimatedTotalCost}</p>
                      <p className="text-[11px] text-slate-400">{generatedPlan.hotelRecommendation}</p>
                    </div>
                  </div>

                  {/* Quick Action button to book hotel for this plan */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => onNavigateToBooking('hotel', destination)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition-colors flex items-center gap-1.5"
                    >
                      <Hotel className="w-3.5 h-3.5" />
                      <span>Đặt Khách Sạn Theo Lịch Trình Này</span>
                    </button>
                  </div>

                </div>
              ) : (
                <div className="bg-white/5 rounded-3xl p-10 border border-white/10 text-center space-y-3 flex flex-col items-center justify-center min-h-[380px]">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Bot className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-white">Chưa có lịch trình được tạo</h4>
                  <p className="text-xs text-slate-400 max-w-md">
                    Hãy điền thông tin điểm đến và bấm nút "Tạo Lịch Trình Chi Tiết Bằng AI" ở bên trái để nhận kế hoạch tour chuẩn xác trong vài giây!
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab 2: Live AI Travel Chatbot */}
        {activeAiTab === 'chat' && (
          <div className="max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col h-[580px]">
            
            {/* Chat Header */}
            <div className="p-4 sm:p-5 bg-slate-800/80 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">Hướng Dẫn Viên Du Lịch AI Việt Nam</h4>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Đang trực tuyến • Sẵn sàng hỗ trợ bạn</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setChatMessages([chatMessages[0]])}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Làm mới đoạn chat</span>
              </button>
            </div>

            {/* Chat Body Messages */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 no-scrollbar">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-white/10 text-slate-100 border border-white/10 rounded-tl-none whitespace-pre-line'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <span className="text-[10px] text-slate-300/70 block mt-1.5 text-right font-light">
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {chatLoading && (
                <div className="flex gap-3 items-center text-slate-400 text-xs animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-emerald-600/50 flex items-center justify-center text-white shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span>AI đang suy nghĩ câu trả lời...</span>
                </div>
              )}
            </div>

            {/* Suggested Prompt Chips */}
            <div className="px-4 py-2 bg-slate-950/60 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] text-slate-400 font-bold shrink-0">Gợi ý câu hỏi:</span>
              {presetQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInputMsg(q)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-slate-300 whitespace-nowrap transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-slate-900 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Nhập câu hỏi về du lịch Việt Nam, ẩm thực, lịch trình..."
                className="flex-1 px-4 py-2.5 bg-slate-800 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputMsg.trim() || chatLoading}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <span>Gửi</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        )}

      </div>
    </section>
  );
};
