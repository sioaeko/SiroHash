import { useState, useEffect } from 'react';
import { Sun, Moon, MoreVertical, Diamond } from 'lucide-react';

interface HeaderProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
  setActiveTab?: (tab: 'mining' | 'stats' | 'services' | 'tasks' | 'info') => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode = true, toggleDarkMode, setActiveTab }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMenu) {
        const target = event.target as HTMLElement;
        if (!target.closest('.menu-container')) {
          setShowMenu(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);
  
  const handleToggleDarkMode = () => {
    if (toggleDarkMode) {
      toggleDarkMode();
    }
    setShowMenu(false);
  };
  
  const handleInfoClick = () => {
    if (setActiveTab) {
      setActiveTab('info');
    }
    setShowMenu(false);
  };
  
  return (
    <header className={`sticky top-0 z-50 p-4 flex items-center gap-3 shadow-sm ${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
      <div className="flex items-center gap-2">
        <Diamond className={`w-6 h-6 ${darkMode ? 'text-[#a3e635]' : 'text-emerald-500'}`} />
        <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          SiroHash
        </span>
      </div>
      <div className="ml-auto relative menu-container">
        <button 
          onClick={() => setShowMenu(!showMenu)} 
          className={`touch-target p-2 rounded-full ${darkMode ? 'hover:bg-[#2a2a2a] active:bg-[#3a3a3a]' : 'hover:bg-gray-200 active:bg-gray-300'}`}
          aria-label="메뉴 열기"
        >
          <MoreVertical className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
        </button>
        
        {showMenu && (
          <div className={`absolute right-0 top-12 ${darkMode ? 'bg-[#2a2a2a] text-white' : 'bg-white text-gray-800'} rounded-md shadow-lg w-56 py-2 z-10`}>
            <button
              className={`w-full px-4 py-3 text-left flex items-center gap-2 ${darkMode ? 'hover:bg-[#3a3a3a] active:bg-[#444]' : 'hover:bg-gray-100 active:bg-gray-200'}`}
              onClick={handleToggleDarkMode}
            >
              {darkMode ? (
                <>
                  <Sun className="w-5 h-5" />
                  <span className="text-base">라이트 모드</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span className="text-base">다크 모드</span>
                </>
              )}
            </button>
            <div className={`border-t ${darkMode ? 'border-[#444]' : 'border-gray-200'} my-1`}></div>
            <button 
              className={`w-full px-4 py-3 text-left flex items-center gap-2 ${darkMode ? 'hover:bg-[#3a3a3a] active:bg-[#444]' : 'hover:bg-gray-100 active:bg-gray-200'}`}
              onClick={handleInfoClick}
            >
              <span className="text-base">앱 정보</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
