import React from 'react';

interface InfoCardProps {
  energy: number;
  income: number;
  blockNumber: number;
  complexity: number;
  reward: number;
  onlineUsers: number;
  isMining: boolean;
  hashRate: number;
  formatIncome: (amount: number) => string;
  formatHashRate: (rate: number) => string;
  darkMode?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  energy,
  income,
  blockNumber,
  complexity,
  reward,
  onlineUsers,
  isMining,
  hashRate,
  formatIncome,
  formatHashRate,
  darkMode = true
}) => {
  const getEnergyPercentage = () => {
    return (energy / 4500) * 100;
  };

  // 다크모드/라이트모드에 따른 스타일
  const bgColor = darkMode ? 'bg-[#1a1a1a]' : 'bg-white';
  const textColor = darkMode ? 'text-gray-200' : 'text-gray-800';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const buttonBg = darkMode ? 'bg-[#2a2a2a]' : 'bg-gray-200';
  const badgeBg = darkMode ? 'bg-[#4a4a4a]' : 'bg-gray-300';
  const barBg = darkMode ? 'bg-[#2a2a2a]' : 'bg-gray-200';
  const energyBarWidth = `w-[${getEnergyPercentage()}%]`;

  return (
    <div className={`${bgColor} rounded-2xl p-4 mb-4 shadow-sm`}>
      <div className="flex justify-between items-center mb-4">
        <span className={textColor}>정보</span>
        <button className={`flex items-center gap-1 ${buttonBg} rounded-full px-3 py-1 text-sm`}>
          VIP 상태 <span className={`${badgeBg} rounded-full w-5 h-5 flex items-center justify-center`}>1</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className={textMuted}>에너지</span>
          <div className="flex items-center gap-2">
            <div className={`w-32 h-2 ${barBg} rounded-full overflow-hidden`}>
              <div 
                className={`h-full bg-[#a3e635] transition-all duration-300 ${energyBarWidth}`}
              ></div>
            </div>
            <span className={textColor}>{energy}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className={textMuted}>수입</span>
          <span className={textColor}>{formatIncome(income)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className={textMuted}>해시레이트</span>
          <span className={textColor}>
            {isMining ? formatHashRate(hashRate) : '0 H/s'}
          </span>
        </div>

        <div className="border-t border-solid mt-3 pt-3 grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <span className={textMuted}>블록 번호</span>
            <span className={textColor}>{blockNumber}</span>
          </div>
          <div className="flex flex-col">
            <span className={textMuted}>복잡도</span>
            <span className={textColor}>{complexity.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className={textMuted}>보상</span>
            <span className={textColor}>{reward.toLocaleString()} SIRO</span>
          </div>
          <div className="flex flex-col">
            <span className={textMuted}>온라인</span>
            <span className={textColor}>{onlineUsers.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
