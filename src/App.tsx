import { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import MiningTab from './components/MiningTab';
import TasksTab from './components/TasksTab';
import StatsTab from './components/StatsTab';
import ServicesTab from './components/ServicesTab';
import InfoTab from './components/InfoTab';
import './styles/mobile-optimization.css';

function App() {
  const [activeTab, setActiveTab] = useState<'mining' | 'stats' | 'services' | 'tasks' | 'info'>('mining');
  const [darkMode, setDarkMode] = useState(true);

  // 초기 다크모드 설정을 localStorage에서 가져옴
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  // 다크모드 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    
    // body 클래스 변경
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = 'white';
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      document.body.style.backgroundColor = '#f5f5f5';
      document.body.style.color = '#333';
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'mining':
        return <MiningTab darkMode={darkMode} />;
      case 'stats':
        return <StatsTab darkMode={darkMode} />;
      case 'services':
        return <ServicesTab darkMode={darkMode} />;
      case 'tasks':
        return <TasksTab darkMode={darkMode} />;
      case 'info':
        return <InfoTab darkMode={darkMode} />;
      default:
        return <MiningTab darkMode={darkMode} />;
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <div className="content-container">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        darkMode={darkMode} 
      />
    </div>
  );
}

export default App;
