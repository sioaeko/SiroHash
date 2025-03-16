import React from 'react';

interface TasksProps {
  darkMode?: boolean;
}

const Tasks: React.FC<TasksProps> = ({ darkMode = true }) => {
  // 다크모드/라이트모드에 따른 스타일
  const bgColor = darkMode ? 'bg-[#1a1a1a]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const buttonBg = darkMode ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a]' : 'bg-gray-200 hover:bg-gray-300';

  return (
    <div className="space-y-4">
      <div className={`${bgColor} rounded-xl p-4`}>
        <h3 className={`text-lg mb-4 ${textColor}`}>작업</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className={`font-medium ${textColor}`}>게시물 리트윗하기</p>
              <p className={`text-sm ${textMuted}`}>+2000 에너지</p>
            </div>
            <button className={`${buttonBg} px-4 py-1 rounded-lg text-sm transition-colors`}>시작</button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className={`font-medium ${textColor}`}>채널 구독</p>
              <p className={`text-sm ${textMuted}`}>+1000 에너지</p>
            </div>
            <button className={`${buttonBg} px-4 py-1 rounded-lg text-sm transition-colors`}>시작</button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className={`font-medium ${textColor}`}>부스트 채널</p>
              <p className={`text-sm ${textMuted}`}>+100 에너지</p>
            </div>
            <button className={`${buttonBg} px-4 py-1 rounded-lg text-sm transition-colors`}>시작</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
