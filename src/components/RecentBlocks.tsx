import React from 'react';
import { Clock, Pickaxe, User, Award, BarChart2 } from 'lucide-react';

interface Block {
  id: number;
  miner: string;
  time: string;
  reward: number;
  difficulty: number;
}

interface RecentBlocksProps {
  recentBlocks: Block[];
  darkMode?: boolean;
}

const RecentBlocks: React.FC<RecentBlocksProps> = ({ 
  recentBlocks,
  darkMode = true
}) => {
  // 다크모드/라이트모드에 따른 스타일
  const bgColor = darkMode ? 'bg-[#1a1a1a]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const blockBg = darkMode ? 'bg-[#222]' : 'bg-gray-100';
  const blockHoverBg = darkMode ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-200';
  const accentColor = 'text-[#a3e635]';
  const mutedTextColor = darkMode ? 'text-gray-400' : 'text-gray-500';
  const labelBg = darkMode ? 'bg-[#333]' : 'bg-gray-200';

  return (
    <div className={`${bgColor} rounded-xl p-4`}>
      <h3 className={`text-lg mb-3 font-semibold flex items-center gap-2 ${textColor}`}>
        <Pickaxe className={`w-5 h-5 ${accentColor}`} />
        <span>최근 채굴된 블록</span>
      </h3>
      <div className="space-y-3">
        {recentBlocks.map((block) => (
          <div 
            key={block.id} 
            className={`${blockBg} rounded-lg p-3 border-l-4 border-[#a3e635] transition-all ${blockHoverBg}`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${accentColor}`}>#{block.id}</span>
                <span className={`text-xs ${labelBg} px-2 py-0.5 rounded-full ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  {block.miner === 'You' ? '나의 블록' : '네트워크 블록'}
                </span>
              </div>
              <div className={`flex items-center gap-1 text-xs ${mutedTextColor}`}>
                <Clock className="w-3 h-3" />
                <span>{block.time}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span className="overflow-hidden text-ellipsis">
                  {block.miner === 'You' ? 
                    <span className="text-yellow-400 font-medium">나</span> : 
                    block.miner}
                </span>
              </div>
              
              <div className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <Award className="w-3.5 h-3.5 text-yellow-400" />
                <span>{block.reward.toLocaleString()} SIRO</span>
              </div>
              
              <div className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
                <span>난이도 {block.difficulty.toFixed(2)}</span>
              </div>
              
              <div className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <Pickaxe className="w-3.5 h-3.5 text-green-400" />
                <span>
                  {Math.floor(Math.random() * 500 + 150)}개 트랜잭션
                </span>
              </div>
            </div>
            
            {block.miner === 'You' && (
              <div className="mt-2 text-xs text-yellow-400 bg-yellow-400/10 rounded px-2 py-1 flex items-center">
                <Award className="w-3 h-3 mr-1" /> 
                채굴 보상이 지급되었습니다: {block.reward.toLocaleString()} SIRO
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlocks;
