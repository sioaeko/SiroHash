import React from 'react';
import { Zap, Hash, BarChart2, CheckSquare, HelpCircle } from 'lucide-react';

type ActiveTab = 'mining' | 'stats' | 'services' | 'tasks' | 'info';

interface BottomNavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode?: boolean;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  setActiveTab,
  darkMode = true
}) => {
  // 다크모드/라이트모드에 따른 스타일 적용
  const bgColor = darkMode ? 'bg-[#1a1a1a]' : 'bg-white';
  const borderColor = darkMode ? 'border-[#2a2a2a]' : 'border-gray-200';
  const activeColor = 'text-[#a3e635]';
  const inactiveColor = darkMode ? 'text-gray-400' : 'text-gray-500';
  const activeBgColor = darkMode ? 'bg-[#2a2a2a]' : 'bg-gray-100';

  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${bgColor} border-t ${borderColor} pb-safe z-50 shadow-lg`}>
      <div className="flex justify-between max-w-md mx-auto px-2">
        <button 
          className={`flex flex-col items-center py-3 px-4 rounded-lg transition-colors ${
            activeTab === 'mining' 
              ? `${activeColor} ${activeBgColor}` 
              : `${inactiveColor} hover:bg-opacity-10 hover:bg-gray-500 active:bg-opacity-20 active:bg-gray-500`
          }`}
          onClick={() => setActiveTab('mining')}
        >
          <Zap className={`w-6 h-6 ${activeTab === 'mining' ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium mt-1">채굴</span>
        </button>
        <button 
          className={`flex flex-col items-center py-3 px-4 rounded-lg transition-colors ${
            activeTab === 'services' 
              ? `${activeColor} ${activeBgColor}` 
              : `${inactiveColor} hover:bg-opacity-10 hover:bg-gray-500 active:bg-opacity-20 active:bg-gray-500`
          }`}
          onClick={() => setActiveTab('services')}
        >
          <Hash className={`w-6 h-6 ${activeTab === 'services' ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium mt-1">서비스</span>
        </button>
        <button 
          className={`flex flex-col items-center py-3 px-4 rounded-lg transition-colors ${
            activeTab === 'stats' 
              ? `${activeColor} ${activeBgColor}` 
              : `${inactiveColor} hover:bg-opacity-10 hover:bg-gray-500 active:bg-opacity-20 active:bg-gray-500`
          }`}
          onClick={() => setActiveTab('stats')}
        >
          <BarChart2 className={`w-6 h-6 ${activeTab === 'stats' ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium mt-1">통계</span>
        </button>
        <button 
          className={`flex flex-col items-center py-3 px-4 rounded-lg transition-colors ${
            activeTab === 'tasks' 
              ? `${activeColor} ${activeBgColor}` 
              : `${inactiveColor} hover:bg-opacity-10 hover:bg-gray-500 active:bg-opacity-20 active:bg-gray-500`
          }`}
          onClick={() => setActiveTab('tasks')}
        >
          <CheckSquare className={`w-6 h-6 ${activeTab === 'tasks' ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium mt-1">작업</span>
        </button>
        <button 
          className={`flex flex-col items-center py-3 px-4 rounded-lg transition-colors ${
            activeTab === 'info' 
              ? `${activeColor} ${activeBgColor}` 
              : `${inactiveColor} hover:bg-opacity-10 hover:bg-gray-500 active:bg-opacity-20 active:bg-gray-500`
          }`}
          onClick={() => setActiveTab('info')}
        >
          <HelpCircle className={`w-6 h-6 ${activeTab === 'info' ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium mt-1">도움</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;
