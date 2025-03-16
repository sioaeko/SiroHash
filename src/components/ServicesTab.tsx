import React, { useState } from 'react';
import { Zap, Star, ChevronRight, Link, ShieldCheck, CloudLightning, Gift, X, Check, AlertCircle, ArrowLeft, Copy, Share2 } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  isPremium: boolean;
  benefits?: string[];
  duration?: string;
}

interface Promotion {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  details: string;
  steps?: string[];
  reward?: string;
}

interface ServicesTabProps {
  darkMode?: boolean;
}

const ServicesTab: React.FC<ServicesTabProps> = ({ darkMode = true }) => {
  // 다크모드/라이트모드에 따른 스타일
  const bgColor = darkMode ? 'bg-[#1a1a1a]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const buttonBg = darkMode ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a]' : 'bg-gray-200 hover:bg-gray-300';
  const itemBg = darkMode ? 'bg-[#2a2a2a]' : 'bg-gray-100';
  const overlayBg = darkMode ? 'bg-black/80' : 'bg-gray-800/80';
  const modalBg = darkMode ? 'bg-[#1a1a1a]' : 'bg-white';
  const buttonPrimary = darkMode ? 'bg-[#a3e635] hover:bg-[#94d82d] text-gray-800' : 'bg-lime-500 hover:bg-lime-600 text-white';
  const buttonSecondary = darkMode ? 'bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800';
  const dividerColor = darkMode ? 'border-[#2a2a2a]' : 'border-gray-200';
  const codeBg = darkMode ? 'bg-[#2a2a2a]' : 'bg-gray-100';
  
  const [services] = useState<Service[]>([
    {
      id: 'boost',
      name: '채굴 부스터',
      description: '24시간 동안 채굴 속도가 25% 증가합니다',
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      price: 0.00050,
      isPremium: false,
      benefits: [
        '채굴 속도 25% 증가',
        '보상 획득 확률 10% 증가',
        '에너지 소비 효율 5% 개선'
      ],
      duration: '24시간'
    },
    {
      id: 'energy',
      name: '에너지 팩',
      description: '즉시 1000 에너지를 충전합니다',
      icon: <Zap className="w-5 h-5 text-green-400" />,
      price: 0.00030,
      isPremium: false,
      benefits: [
        '즉시 1000 에너지 충전',
        '충전 즉시 사용 가능',
        '구매 한도 없음'
      ],
      duration: '즉시'
    },
    {
      id: 'cloud',
      name: '클라우드 마이닝',
      description: '일주일 동안 자동으로 채굴합니다',
      icon: <CloudLightning className="w-5 h-5 text-blue-400" />,
      price: 0.00100,
      isPremium: true,
      benefits: [
        '24/7 자동 채굴',
        '에너지 소비 없음',
        '일일 보상 자동 수령',
        '해시레이트 10% 보너스'
      ],
      duration: '7일'
    },
    {
      id: 'premium',
      name: 'VIP 업그레이드',
      description: '모든 보너스 및 수수료 할인 혜택',
      icon: <Star className="w-5 h-5 text-yellow-400" />,
      price: 0.00250,
      isPremium: true,
      benefits: [
        '모든 서비스 15% 할인',
        '채굴 보상 20% 증가',
        'VIP 전용 보너스 이벤트',
        '에너지 충전 속도 30% 증가',
        '특별 기술 지원'
      ],
      duration: '30일'
    }
  ]);

  // 프로모션 데이터
  const [promotions] = useState<Promotion[]>([
    {
      id: 'invite',
      name: '친구 초대',
      description: '친구를 초대하고 보상을 받으세요',
      icon: <Link className="w-5 h-5 text-blue-400" />,
      buttonText: '초대',
      details: '친구를 초대하고 함께 채굴해보세요. 초대한 친구가 가입하고 채굴을 시작하면 두 사람 모두 특별 보상을 받게 됩니다.',
      steps: [
        '아래 초대 코드를 복사하거나 공유 링크를 사용하세요',
        '친구가 가입할 때 초대 코드를 입력하도록 안내하세요',
        '친구가 최소 10분 이상 채굴을 시작하면 보상이 지급됩니다'
      ],
      reward: '친구 1명당 500 에너지 + 채굴 부스터 3시간'
    },
    {
      id: 'vip',
      name: 'VIP 등급',
      description: '더 높은 채굴 속도, 낮은 수수료',
      icon: <ShieldCheck className="w-5 h-5 text-green-400" />,
      buttonText: '업그레이드',
      details: 'VIP 등급으로 업그레이드하여 프리미엄 혜택을 누리세요. 채굴 속도 증가, 특별 보상, 낮은 수수료 등 다양한 혜택이 제공됩니다.',
      steps: [
        'VIP 업그레이드 구매',
        '즉시 활성화되는 특별 혜택',
        '30일간 지속되는 VIP 상태'
      ],
      reward: '채굴 속도 20% 증가, 수수료 50% 할인, 특별 일일 보상'
    },
    {
      id: 'boost-package',
      name: '부스트 패키지',
      description: '에너지 + 해시레이트 부스트',
      icon: <CloudLightning className="w-5 h-5 text-purple-400" />,
      buttonText: '구매',
      details: '채굴 효율을 극대화하는 부스트 패키지입니다. 에너지 충전과 해시레이트 부스트가 함께 제공되어 더 많은 보상을 얻을 수 있습니다.',
      steps: [
        '패키지 구매 즉시 에너지 1,500 충전',
        '48시간 동안 해시레이트 30% 증가',
        '채굴 보상 10% 추가 지급'
      ],
      reward: '패키지 가격의 120% 이상의 가치'
    },
    {
      id: 'daily-reward',
      name: '일일 보상',
      description: '매일 로그인하고 보상 받기',
      icon: <Gift className="w-5 h-5 text-red-400" />,
      buttonText: '받기',
      details: '매일 앱에 접속하여 일일 보상을 받으세요. 연속 접속 시 더 큰 보상이 제공됩니다.',
      steps: [
        '매일 1회 보상 수령 가능',
        '연속 7일 접속 시 특별 보상 지급',
        '30일 연속 접속 시 프리미엄 보상 지급'
      ],
      reward: '에너지, 채굴 부스터, 특별 아이템 등 랜덤 보상'
    }
  ]);

  // 선택된 프로모션 상태
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [promotionAction, setPromotionAction] = useState<'view' | 'success'>('view');
  const [inviteCode] = useState('SIRO-XYZ789');
  const [codeCopied, setCodeCopied] = useState(false);
  
  // 프로모션 상세 정보 열기
  const openPromotionDetails = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setPromotionAction('view');
  };
  
  // 초대 코드 복사
  const copyInviteCode = () => {
    // 실제로는 여기서 클립보드에 복사합니다
    setCodeCopied(true);
    setTimeout(() => {
      setCodeCopied(false);
    }, 2000);
  };
  
  // 프로모션 액션 처리
  const handlePromotionAction = () => {
    if (selectedPromotion?.id === 'daily-reward') {
      // 일일 보상 수령 처리
      setPromotionAction('success');
    } else if (selectedPromotion?.id === 'invite') {
      // 초대 링크 공유 처리 (실제 구현에서는 공유 API 호출)
      // 여기서는 단순히 복사 기능만 구현
      copyInviteCode();
    } else {
      // 다른 프로모션은 결제 페이지로 리다이렉트하거나 결제 모달 표시
      setPromotionAction('success');
    }
  };
  
  // 프로모션 모달 닫기
  const closePromotionModal = () => {
    setSelectedPromotion(null);
    setPromotionAction('view');
  };

  // 세부 정보 모달 상태 관리
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  
  // 서비스 상세 정보 표시
  const openServiceDetails = (service: Service) => {
    setSelectedService(service);
    setShowConfirmation(false);
    setPurchaseSuccess(false);
  };
  
  // 구매 확인
  const handleConfirmPurchase = () => {
    setShowConfirmation(true);
  };
  
  // 구매 처리
  const handlePurchase = () => {
    // 실제로는 여기서 백엔드 API 호출 등의 구매 처리를 합니다
    setTimeout(() => {
      setPurchaseSuccess(true);
      setShowConfirmation(false);
    }, 1000);
  };
  
  // 모달 닫기
  const closeModal = () => {
    setSelectedService(null);
    setShowConfirmation(false);
    setPurchaseSuccess(false);
  };

  return (
    <div className="space-y-4">
      <h2 className={`text-lg font-semibold mb-4 ${textColor}`}>서비스</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {services.map(service => (
          <div key={service.id} className={`${itemBg} rounded-xl p-3 flex flex-col justify-between`}>
            <div>
              <div className="flex justify-between items-start mb-2">
                {service.icon}
                {service.isPremium && <Star className="w-4 h-4 text-yellow-400" />}
              </div>
              <h3 className={`font-medium mb-1 ${textColor}`}>{service.name}</h3>
              <p className={`text-xs mb-3 ${textMuted}`}>{service.description}</p>
            </div>
            <div className="flex justify-between items-center">
              <span className={`font-medium ${textColor}`}>{service.price.toFixed(5)}</span>
              <button 
                className={`${buttonBg} rounded-full w-7 h-7 flex items-center justify-center`}
                aria-label={`${service.name} 자세히 보기`}
                title={`${service.name} 자세히 보기`}
                onClick={() => openServiceDetails(service)}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className={`${bgColor} rounded-xl overflow-hidden mt-6`}>
        <h3 className={`p-4 font-medium ${textColor}`}>특별 프로모션</h3>
        
        <div className="px-4 pb-4 space-y-3">
          {promotions.map(promotion => (
            <div key={promotion.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {promotion.icon}
                <div>
                  <p className={`font-medium ${textColor}`}>{promotion.name}</p>
                  <p className={`text-xs ${textMuted}`}>{promotion.description}</p>
                </div>
              </div>
              <button 
                className={`${buttonBg} px-3 py-1 rounded-lg text-sm`}
                title={promotion.buttonText}
                onClick={() => openPromotionDetails(promotion)}
              >
                {promotion.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 프로모션 상세 정보 모달 */}
      {selectedPromotion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className={`absolute inset-0 ${overlayBg}`} onClick={closePromotionModal}></div>
          <div className={`relative ${modalBg} w-full max-w-md rounded-xl shadow-lg overflow-hidden`}>
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-4 border-b border-solid border-gray-200">
              <button 
                className={`w-8 h-8 flex items-center justify-center rounded-full ${buttonBg}`}
                title="모달 닫기"
                onClick={closePromotionModal}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h3 className={`text-lg font-medium ${textColor}`}>
                {promotionAction === 'success' ? '성공' : selectedPromotion.name}
              </h3>
              <div className="w-8"></div> {/* 빈 공간으로 중앙 정렬 */}
            </div>

            {/* 성공 화면 */}
            {promotionAction === 'success' ? (
              <div className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h4 className={`text-xl font-medium mb-2 ${textColor}`}>
                  {selectedPromotion.id === 'daily-reward' ? '보상이 지급되었습니다!' : '성공적으로 처리되었습니다!'}
                </h4>
                <p className={`mb-6 ${textMuted}`}>
                  {selectedPromotion.id === 'daily-reward' 
                    ? '오늘의 보상을 성공적으로 수령했습니다. 내일도 접속하여 보상을 받으세요!' 
                    : `${selectedPromotion.name} 프로모션이 활성화되었습니다.`}
                </p>
                <button 
                  className={`w-full py-3 rounded-lg ${buttonPrimary}`}
                  title="확인"
                  onClick={closePromotionModal}
                >
                  확인
                </button>
              </div>
            ) : (
              /* 프로모션 상세 정보 화면 */
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${itemBg} rounded-lg flex items-center justify-center`}>
                    {selectedPromotion.icon}
                  </div>
                  <div>
                    <h4 className={`font-medium ${textColor}`}>{selectedPromotion.name}</h4>
                    <p className={`text-sm ${textMuted}`}>{selectedPromotion.description}</p>
                  </div>
                </div>

                <p className={`my-4 ${textColor}`}>{selectedPromotion.details}</p>

                {/* 초대 코드 (친구 초대 프로모션인 경우에만) */}
                {selectedPromotion.id === 'invite' && (
                  <div className={`${codeBg} p-3 rounded-lg mt-4 mb-4`}>
                    <p className={`text-xs mb-2 ${textMuted}`}>초대 코드</p>
                    <div className="flex justify-between items-center">
                      <span className={`font-mono font-medium ${textColor}`}>{inviteCode}</span>
                      <button 
                        className={`${buttonBg} p-2 rounded-md`}
                        title="초대 코드 복사"
                        onClick={copyInviteCode}
                      >
                        {codeCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button 
                        className={`flex items-center gap-2 ${buttonSecondary} py-2 px-3 rounded-lg text-sm`}
                        title="코드 복사"
                        onClick={() => copyInviteCode()}
                      >
                        <Copy className="w-4 h-4" />
                        <span>코드 복사</span>
                      </button>
                      <button 
                        className={`flex items-center gap-2 ${buttonPrimary} py-2 px-3 rounded-lg text-sm`}
                        title="링크 공유"
                        onClick={() => handlePromotionAction()}
                      >
                        <Share2 className="w-4 h-4" />
                        <span>링크 공유</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className={`border-t ${dividerColor} pt-4 mt-4 mb-4`}>
                  <h5 className={`font-medium mb-3 ${textColor}`}>
                    {selectedPromotion.id === 'daily-reward' ? '보상 방법' : '이용 방법'}
                  </h5>
                  <ol className="list-decimal list-inside space-y-2 pl-1">
                    {selectedPromotion.steps?.map((step, index) => (
                      <li key={index} className={`text-sm ${textColor}`}>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {selectedPromotion.reward && (
                  <div className={`${itemBg} p-3 rounded-lg mb-4`}>
                    <h5 className={`text-sm font-medium mb-1 ${textColor}`}>보상</h5>
                    <p className={`text-sm ${textColor}`}>{selectedPromotion.reward}</p>
                  </div>
                )}

                {/* 매일 보상인 경우 받기 버튼, 초대인 경우 공유 버튼, 나머지는 구매 버튼 */}
                {selectedPromotion.id !== 'invite' && (
                  <button 
                    className={`w-full py-3 rounded-lg ${buttonPrimary}`}
                    title={selectedPromotion.id === 'daily-reward' ? '보상 받기' : '구매하기'}
                    onClick={handlePromotionAction}
                  >
                    {selectedPromotion.id === 'daily-reward' ? '보상 받기' : '구매하기'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 서비스 상세 정보 모달 */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className={`absolute inset-0 ${overlayBg}`} onClick={closeModal}></div>
          <div className={`relative ${modalBg} w-full max-w-md rounded-xl shadow-lg overflow-hidden`}>
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-4 border-b border-solid border-gray-200">
              <button 
                className={`w-8 h-8 flex items-center justify-center rounded-full ${buttonBg}`}
                title="모달 닫기"
                onClick={closeModal}
              >
                {purchaseSuccess ? <X className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              </button>
              <h3 className={`text-lg font-medium ${textColor}`}>
                {purchaseSuccess ? '구매 완료' : selectedService.name}
              </h3>
              <div className="w-8"></div> {/* 빈 공간으로 중앙 정렬 */}
            </div>

            {/* 구매 완료 화면 */}
            {purchaseSuccess ? (
              <div className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h4 className={`text-xl font-medium mb-2 ${textColor}`}>구매가 완료되었습니다!</h4>
                <p className={`mb-6 ${textMuted}`}>{selectedService.name} 서비스가 성공적으로 구매되었습니다.</p>
                <button 
                  className={`w-full py-3 rounded-lg ${buttonPrimary}`}
                  title="확인"
                  onClick={closeModal}
                >
                  확인
                </button>
              </div>
            ) : showConfirmation ? (
              /* 구매 확인 화면 */
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-yellow-500" />
                </div>
                <h4 className={`text-lg font-medium text-center mb-2 ${textColor}`}>구매 확인</h4>
                <p className={`text-center mb-4 ${textMuted}`}>
                  {selectedService.name} 서비스를 {selectedService.price.toFixed(5)} SIRO로 구매하시겠습니까?
                </p>
                <div className="flex gap-3">
                  <button 
                    className={`flex-1 py-3 rounded-lg ${buttonSecondary}`}
                    title="취소"
                    onClick={() => setShowConfirmation(false)}
                  >
                    취소
                  </button>
                  <button 
                    className={`flex-1 py-3 rounded-lg ${buttonPrimary}`}
                    title="구매 확인"
                    onClick={handlePurchase}
                  >
                    구매 확인
                  </button>
                </div>
              </div>
            ) : (
              /* 서비스 상세 정보 화면 */
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${itemBg} rounded-lg flex items-center justify-center`}>
                    {selectedService.icon}
                  </div>
                  <div>
                    <h4 className={`font-medium ${textColor}`}>{selectedService.name}</h4>
                    <p className={`text-sm ${textMuted}`}>{selectedService.description}</p>
                  </div>
                </div>

                <div className={`border-t border-b ${dividerColor} py-4 my-4`}>
                  <div className="flex justify-between mb-2">
                    <span className={textMuted}>가격</span>
                    <span className={`font-medium ${textColor}`}>{selectedService.price.toFixed(5)} SIRO</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={textMuted}>기간</span>
                    <span className={`font-medium ${textColor}`}>{selectedService.duration}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className={`font-medium mb-2 ${textColor}`}>혜택</h5>
                  <ul className="space-y-2">
                    {selectedService.benefits?.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className={`text-sm ${textColor}`}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  className={`w-full py-3 rounded-lg ${buttonPrimary}`}
                  title="구매하기"
                  onClick={handleConfirmPurchase}
                >
                  구매하기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesTab;
