import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, Diamond, Globe, MessageSquare, Award, AlertTriangle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

interface InfoTabProps {
  darkMode?: boolean;
}

const InfoTab: React.FC<InfoTabProps> = ({ darkMode = true }) => {
  // 다크모드/라이트모드에 따른 스타일
  const bgColor = darkMode ? 'bg-[#1a1a1a]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const borderColor = darkMode ? 'border-[#2a2a2a]' : 'border-gray-200';
  const hoverBg = darkMode ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-100';

  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      question: "채굴은 어떻게 작동하나요?",
      answer: "채굴은 컴퓨팅 파워를 사용해 네트워크에서 블록을 검증하고 새 코인을 얻는 과정입니다. SiroHash에서는 실제 컴퓨팅 파워 없이도 시뮬레이션된 채굴 경험을 제공합니다. 에너지를 사용해 가상 해시레이트를 생성하고 보상을 얻습니다.",
      isOpen: false
    },
    {
      question: "에너지는 어떻게 얻을 수 있나요?",
      answer: "에너지는 여러 방법으로 충전할 수 있습니다: 1) 일일 로그인 보상, 2) 작업 완료하기, 3) 친구 초대하기, 4) 프리미엄 멤버십 가입하기. 에너지는 채굴에 필요하며 시간이 지남에 따라 소모됩니다.",
      isOpen: false
    },
    {
      question: "해시레이트란 무엇인가요?",
      answer: "해시레이트는 채굴 성능을 측정하는 단위입니다. 높은 해시레이트는 더 많은 채굴 능력을 의미하며, 이는 더 많은 블록을 발견하고 더 많은 보상을 얻을 가능성이 높아집니다.",
      isOpen: false
    },
    {
      question: "보상은 어떻게 계산되나요?",
      answer: "보상은 해시레이트, 네트워크 복잡성, 블록 보상을 기반으로 계산됩니다. 더 높은 해시레이트는 더 많은 수익을 가져옵니다. 복잡성이 증가하면 같은 해시레이트로 얻는 보상이 감소할 수 있습니다.",
      isOpen: false
    },
    {
      question: "VIP 상태는 어떤 혜택이 있나요?",
      answer: "VIP 상태는 다음과 같은 혜택을 제공합니다: 1) 매일 추가 에너지 보너스, 2) 25% 채굴 효율 향상, 3) 프리미엄 프로필 배지, 4) 독점 기능 및 서비스 이용, 5) 빠른 지원 서비스.",
      isOpen: false
    }
  ]);

  const toggleFAQ = (index: number) => {
    setFaqs(faqs.map((faq, i) => 
      i === index ? { ...faq, isOpen: !faq.isOpen } : faq
    ));
  };

  return (
    <div className="space-y-4">
      {/* 정보 아이콘 */}
      <div className="flex justify-center py-4">
        <div className={`w-20 h-20 ${bgColor} rounded-full flex items-center justify-center`}>
          <Diamond className="w-10 h-10 text-[#a3e635]" />
        </div>
      </div>

      {/* 앱 정보 */}
      <div className={`${bgColor} rounded-xl p-4 text-center`}>
        <h2 className="text-xl font-medium mb-1">SiroHash</h2>
        <p className={`mb-2 ${textMuted}`}>버전 1.2.4</p>
        <p className={`text-sm ${textMuted}`}>가상 채굴 시뮬레이션 플랫폼</p>
      </div>

      {/* FAQ 섹션 */}
      <div className={`${bgColor} rounded-xl overflow-hidden`}>
        <h3 className={`p-4 font-medium border-b ${borderColor}`}>자주 묻는 질문</h3>
        
        {faqs.map((faq, index) => (
          <div key={index} className={`border-b ${borderColor} last:border-b-0`}>
            <button 
              className={`flex justify-between items-center w-full p-4 text-left ${textColor}`} 
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium">{faq.question}</span>
              {faq.isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {faq.isOpen && (
              <div className={`px-4 pb-4 text-sm ${textMuted}`}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 연락 및 지원 */}
      <div className={`${bgColor} rounded-xl p-4`}>
        <h3 className={`font-medium mb-3 ${textColor}`}>연락 및 지원</h3>
        
        <div className="space-y-3">
          <button className={`flex items-center justify-between w-full py-2 ${hoverBg}`}>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              <span className={textColor}>웹사이트</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          
          <button className={`flex items-center justify-between w-full py-2 ${hoverBg}`}>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-400" />
              <span className={textColor}>문의하기</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          
          <button className={`flex items-center justify-between w-full py-2 ${hoverBg}`}>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className={textColor}>평가하기</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          
          <button className={`flex items-center justify-between w-full py-2 ${hoverBg}`}>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className={textColor}>오류 신고</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* 앱 정보 하단 */}
      <div className={`text-center text-xs ${textMuted} py-2`}>
        <p>{"\u00A9"} 2025 SiroHash. All rights reserved.</p>
        <p className="mt-1">Made with {"\u2764\uFE0F"} in Seoul</p>
      </div>
    </div>
  );
};

export default InfoTab;
