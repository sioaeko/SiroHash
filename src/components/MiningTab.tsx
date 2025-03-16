import React, { useState } from 'react';
import InfoCard from './InfoCard';
import RecentBlocks from './RecentBlocks';
import useMining from '../hooks/useMining';

interface MiningTabProps {
  darkMode?: boolean;
}

const MiningTab: React.FC<MiningTabProps> = ({ darkMode = true }) => {
  const [selectedSubTab, setSelectedSubTab] = useState<'work' | 'friends'>('work');
  const {
    isMining,
    energy,
    hashRate,
    income,
    blockNumber,
    complexity,
    onlineUsers,
    reward,
    recentBlocks,
    formatHashRate,
    formatIncome,
    toggleMining
  } = useMining();

  // 다크모드/라이트모드에 따른 스타일
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const borderColor = darkMode ? 'border-[#2a2a2a]' : 'border-gray-200';
  const tabBg = darkMode ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a]' : 'bg-gray-100 hover:bg-gray-200';

  return (
    <>
      {/* Info Card */}
      <InfoCard 
        energy={energy}
        income={income}
        blockNumber={blockNumber}
        complexity={complexity}
        reward={reward}
        onlineUsers={onlineUsers}
        isMining={isMining}
        hashRate={hashRate}
        formatIncome={formatIncome}
        formatHashRate={formatHashRate}
        darkMode={darkMode}
      />

      {/* Mining Button */}
      <button 
        className={`w-full py-3 rounded-xl mb-4 transition-colors ${
          isMining 
            ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' 
            : darkMode 
              ? `${tabBg} ${textColor}` 
              : 'bg-lime-500 text-white hover:bg-lime-600'
        }`}
        onClick={toggleMining}
        disabled={energy <= 0}
      >
        {isMining ? '채굴 중지' : '채굴 시작'}
      </button>

      {/* Tabs */}
      <div className="mb-4">
        <div className={`flex border-b ${borderColor}`}>
          <button 
            className={`flex-1 py-2 text-center ${textColor} ${selectedSubTab === 'work' ? 'border-b-2 border-[#a3e635]' : ''}`}
            onClick={() => setSelectedSubTab('work')}
          >
            채굴
          </button>
          <button 
            className={`flex-1 py-2 text-center ${textColor} ${selectedSubTab === 'friends' ? 'border-b-2 border-[#a3e635]' : ''}`}
            onClick={() => setSelectedSubTab('friends')}
          >
            테스트넷
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <RecentBlocks recentBlocks={recentBlocks} darkMode={darkMode} />
    </>
  );
};

export default MiningTab;
