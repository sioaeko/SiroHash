import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Star, 
  Trophy, 
  Calendar, 
  Gift, 
  Zap, 
  RefreshCw,
  Lock
} from 'lucide-react';
import '../styles/TasksTab.css';

// 작업 유형 정의
type TaskStatus = 'pending' | 'completed' | 'locked';
type TaskDifficulty = 'easy' | 'medium' | 'hard';
type TaskCategory = 'daily' | 'weekly' | 'achievement' | 'special';

// 작업 인터페이스
interface Task {
  id: string;
  title: string;
  description: string;
  reward: {
    type: 'coins' | 'energy' | 'boost' | 'premium';
    amount: number;
  };
  icon: React.ReactNode;
  status: TaskStatus;
  category: TaskCategory;
  difficulty: TaskDifficulty;
  progress?: {
    current: number;
    total: number;
  };
  expiresAt?: Date; // 일일/주간 작업의 만료 시간
  lockedReason?: string; // 작업이 잠겨있는 이유
}

interface TasksTabProps {
  darkMode?: boolean;
}

const TasksTab: React.FC<TasksTabProps> = ({ darkMode = true }) => {
  // 스타일 설정
  const bgColor = darkMode ? 'bg-[#1a1a1a]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const cardBg = darkMode ? 'bg-[#2a2a2a]' : 'bg-gray-100';
  const cardHoverBg = darkMode ? 'hover:bg-[#3a3a3a]' : 'hover:bg-gray-200';
  const buttonBg = darkMode ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a]' : 'bg-gray-200 hover:bg-gray-300';
  const buttonActiveBg = darkMode ? 'bg-[#a3e635] text-gray-800' : 'bg-lime-500 text-white';
  const progressBg = darkMode ? 'bg-[#3a3a3a]' : 'bg-gray-300';
  const progressFilledBg = darkMode ? 'bg-[#a3e635]' : 'bg-lime-500';
  
  // 활성 카테고리 상태
  const [activeCategory, setActiveCategory] = useState<TaskCategory>('daily');
  
  // 작업 데이터
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // 통계 데이터
  const [stats, setStats] = useState({
    totalCompleted: 0,
    totalRewards: 0,
    streak: 0,
    level: 1,
    experience: {
      current: 325,
      nextLevel: 1000
    }
  });

  // 작업 데이터 초기화
  useEffect(() => {
    // 시뮬레이션: 서버에서 데이터를 가져오는 것처럼 작업 데이터 초기화
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + (7 - nextWeek.getDay()));
    nextWeek.setHours(0, 0, 0, 0);
    
    // 실제 작업 데이터 세팅
    const mockTasks: Task[] = [
      // 일일 작업
      {
        id: 'daily-login',
        title: '일일 로그인',
        description: '오늘 앱에 로그인하셨습니다.',
        reward: {
          type: 'energy',
          amount: 50
        },
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        status: 'completed',
        category: 'daily',
        difficulty: 'easy',
        expiresAt: tomorrow
      },
      {
        id: 'daily-mine',
        title: '1시간 채굴하기',
        description: '오늘 1시간 동안 채굴을 진행하세요.',
        reward: {
          type: 'coins',
          amount: 0.00005
        },
        icon: <Clock className="w-5 h-5 text-blue-500" />,
        status: 'pending',
        category: 'daily',
        difficulty: 'easy',
        progress: {
          current: 28,
          total: 60
        },
        expiresAt: tomorrow
      },
      {
        id: 'daily-premium',
        title: '프리미엄 서비스 이용하기',
        description: '프리미엄 서비스를 한 번 이용하세요.',
        reward: {
          type: 'coins',
          amount: 0.00010
        },
        icon: <Star className="w-5 h-5 text-yellow-500" />,
        status: 'pending',
        category: 'daily',
        difficulty: 'medium',
        expiresAt: tomorrow
      },
      {
        id: 'daily-share',
        title: '친구 초대하기',
        description: '친구에게 초대 코드를 공유하세요.',
        reward: {
          type: 'boost',
          amount: 1
        },
        icon: <Gift className="w-5 h-5 text-purple-500" />,
        status: 'pending',
        category: 'daily',
        difficulty: 'hard',
        expiresAt: tomorrow
      },
      
      // 주간 작업
      {
        id: 'weekly-hashrate',
        title: '평균 해시레이트 1.5H/s 달성하기',
        description: '일주일 동안 평균 해시레이트 1.5H/s를 달성하세요.',
        reward: {
          type: 'coins',
          amount: 0.00025
        },
        icon: <Zap className="w-5 h-5 text-yellow-500" />,
        status: 'pending',
        category: 'weekly',
        difficulty: 'medium',
        progress: {
          current: 1.23,
          total: 1.5
        },
        expiresAt: nextWeek
      },
      {
        id: 'weekly-continuous',
        title: '7일 연속 채굴하기',
        description: '7일 연속으로 채굴을 진행하세요.',
        reward: {
          type: 'boost',
          amount: 3
        },
        icon: <Calendar className="w-5 h-5 text-red-500" />,
        status: 'pending',
        category: 'weekly',
        difficulty: 'hard',
        progress: {
          current: 3,
          total: 7
        },
        expiresAt: nextWeek
      },
      {
        id: 'weekly-service',
        title: '서비스 3번 구매하기',
        description: '이번 주에 서비스를 3번 구매하세요.',
        reward: {
          type: 'energy',
          amount: 200
        },
        icon: <RefreshCw className="w-5 h-5 text-teal-500" />,
        status: 'pending',
        category: 'weekly',
        difficulty: 'medium',
        progress: {
          current: 1,
          total: 3
        },
        expiresAt: nextWeek
      },
      
      // 업적
      {
        id: 'achievement-first-coin',
        title: '첫 코인 채굴',
        description: '첫 SIRO 코인을 채굴하세요.',
        reward: {
          type: 'premium',
          amount: 1
        },
        icon: <Trophy className="w-5 h-5 text-yellow-500" />,
        status: 'completed',
        category: 'achievement',
        difficulty: 'easy'
      },
      {
        id: 'achievement-1000-hours',
        title: '1,000시간 채굴',
        description: '누적 1,000시간 채굴을 달성하세요.',
        reward: {
          type: 'coins',
          amount: 0.00100
        },
        icon: <Trophy className="w-5 h-5 text-yellow-500" />,
        status: 'pending',
        category: 'achievement',
        difficulty: 'hard',
        progress: {
          current: 107,
          total: 1000
        }
      },
      {
        id: 'achievement-premium',
        title: '프리미엄 회원',
        description: '프리미엄 회원이 되세요.',
        reward: {
          type: 'boost',
          amount: 10
        },
        icon: <Star className="w-5 h-5 text-yellow-500" />,
        status: 'pending',
        category: 'achievement',
        difficulty: 'medium'
      },
      {
        id: 'achievement-level10',
        title: '레벨 10 달성',
        description: '레벨 10에 도달하세요.',
        reward: {
          type: 'premium',
          amount: 3
        },
        icon: <Trophy className="w-5 h-5 text-purple-500" />,
        status: 'locked',
        category: 'achievement',
        difficulty: 'hard',
        lockedReason: '레벨 5 이상 필요'
      },
      
      // 특별 미션
      {
        id: 'special-testnet',
        title: '테스트넷 참여',
        description: '베타 테스트넷에 참여하고 피드백을 남기세요.',
        reward: {
          type: 'coins',
          amount: 0.00050
        },
        icon: <Star className="w-5 h-5 text-blue-500" />,
        status: 'pending',
        category: 'special',
        difficulty: 'medium'
      },
      {
        id: 'special-community',
        title: '커뮤니티 기여자',
        description: '공식 커뮤니티에 가입하고 활동하세요.',
        reward: {
          type: 'boost',
          amount: 5
        },
        icon: <Trophy className="w-5 h-5 text-green-500" />,
        status: 'pending',
        category: 'special',
        difficulty: 'easy'
      }
    ];
    
    setTasks(mockTasks);
    
    // 기본 통계 설정
    setStats(prev => {
      const completedTasks = mockTasks.filter(task => task.status === 'completed');
      return {
        ...prev,
        totalCompleted: completedTasks.length,
        totalRewards: completedTasks.reduce((total, task) => {
          return task.reward.type === 'coins' ? total + task.reward.amount : total;
        }, 0)
      };
    });
  }, []);

  // 작업 완료 처리 함수
  const completeTask = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId && task.status === 'pending' 
          ? { ...task, status: 'completed' } 
          : task
      )
    );
    
    // 통계 업데이트 - 실제 앱에서는 서버와 동기화할 것
    setStats(prevStats => ({
      ...prevStats,
      totalCompleted: prevStats.totalCompleted + 1
    }));
  };

  // 작업 구성 요소 렌더링
  const renderTaskItem = (task: Task) => {
    const isLocked = task.status === 'locked';
    const isCompleted = task.status === 'completed';
    
    // 진행 상황이 있는 작업의 완료율 계산
    const progressPercentage = task.progress 
      ? Math.min(Math.round((task.progress.current / task.progress.total) * 100), 100) 
      : 0;
    
    // 보상 표시 형식 처리
    const formatReward = (reward: Task['reward']) => {
      switch (reward.type) {
        case 'coins':
          return `${reward.amount.toFixed(5)} SIRO`;
        case 'energy':
          return `${reward.amount} 에너지`;
        case 'boost':
          return `${reward.amount}시간 부스터`;
        case 'premium':
          return `${reward.amount}일 프리미엄`;
        default:
          return '';
      }
    };

    return (
      <div 
        key={task.id} 
        className={`task-item ${cardBg} ${isLocked ? 'opacity-70' : cardHoverBg}`}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              {task.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-medium ${textColor}`}>{task.title}</h3>
                {isLocked && <Lock className="w-4 h-4 text-gray-500" />}
              </div>
              <p className={`text-sm ${textMuted}`}>{task.description}</p>
              {task.progress && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className={textMuted}>진행률</span>
                    <span className={textMuted}>{progressPercentage}%</span>
                  </div>
                  <div className={`w-full h-1.5 ${progressBg} rounded-full overflow-hidden`}>
                    <div 
                      className={`tasks-progress-bar ${progressFilledBg}`}
                      data-progress={progressPercentage}
                    />
                  </div>
                  <div className="mt-1 text-xs">
                    <span className={textMuted}>
                      {task.progress.current} / {task.progress.total}
                      {task.category === 'weekly' && task.id === 'weekly-hashrate' && ' H/s'}
                    </span>
                  </div>
                </div>
              )}
              {task.expiresAt && (
                <div className="flex items-center mt-1 text-xs">
                  <Clock className="w-3 h-3 mr-1 text-gray-500" />
                  <span className={textMuted}>
                    {task.expiresAt.toLocaleDateString()} 만료
                  </span>
                </div>
              )}
              {isLocked && task.lockedReason && (
                <p className="text-xs text-orange-500 mt-1">{task.lockedReason}</p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className={`text-xs font-medium mb-1 px-2 py-0.5 rounded-full difficulty-${task.difficulty}`}>
              {task.difficulty === 'easy' ? '쉬움' : task.difficulty === 'medium' ? '보통' : '어려움'}
            </div>
            <div className="flex flex-col items-end mt-auto">
              <div className="flex items-center text-xs">
                <Gift className="w-3 h-3 mr-1 text-purple-500" />
                <span className={textColor}>{formatReward(task.reward)}</span>
              </div>
              {!isCompleted && !isLocked && (
                <button
                  onClick={() => completeTask(task.id)}
                  className={`task-button ${buttonActiveBg}`}
                  disabled={isLocked}
                >
                  {task.progress && task.progress.current < task.progress.total ? '진행 중' : '완료하기'}
                </button>
              )}
              {isCompleted && (
                <span className="completed-badge">
                  <CheckCircle className="w-3 h-3 mr-1" /> 완료됨
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 현재 카테고리의 작업만 필터링
  const filteredTasks = tasks.filter(task => task.category === activeCategory);
  
  // 완료된 작업 수
  const completedTasksCount = filteredTasks.filter(task => task.status === 'completed').length;
  
  // 카테고리 내 총 작업 수
  const categoryTotalCount = tasks.filter(task => task.category === activeCategory).length;

  // 레벨 경험치 진행 비율 계산
  const expProgressPercentage = (stats.experience.current / stats.experience.nextLevel) * 100;
  
  // 카테고리별 아이콘 가져오기
  const getCategoryIcon = (category: TaskCategory) => {
    switch (category) {
      case 'daily':
        return <Clock className="w-4 h-4 inline-block" />;
      case 'weekly':
        return <Calendar className="w-4 h-4 inline-block" />;
      case 'achievement':
        return <Trophy className="w-4 h-4 inline-block" />;
      case 'special':
        return <Star className="w-4 h-4 inline-block" />;
      default:
        return null;
    }
  };
  
  // 카테고리 이름 가져오기
  const getCategoryName = (category: TaskCategory) => {
    switch (category) {
      case 'daily':
        return '일일 미션';
      case 'weekly':
        return '주간 미션';
      case 'achievement':
        return '업적';
      case 'special':
        return '특별 미션';
      default:
        return '';
    }
  };
  
  // 카테고리 완료 상태 렌더링
  const renderCategoryCompletion = (category: 'daily' | 'weekly') => {
    const categoryTasks = tasks.filter(task => task.category === category);
    const completed = categoryTasks.filter(task => task.status === 'completed').length;
    const total = categoryTasks.length;
    
    if (total === 0) return null;
    
    return (
      <span className="text-xs ml-1 opacity-80">
        ({completed}/{total})
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* 헤더 및 통계 */}
      <div className={`${bgColor} rounded-xl p-4`}>
        <h3 className={`text-lg mb-4 ${textColor}`}>작업 통계</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <p className={`text-sm ${textMuted}`}>완료한 작업</p>
            <p className={`text-xl font-medium ${textColor}`}>{stats.totalCompleted}</p>
          </div>
          <div className="space-y-1">
            <p className={`text-sm ${textMuted}`}>연속 달성</p>
            <p className={`text-xl font-medium ${textColor}`}>{stats.streak}일</p>
          </div>
        </div>
        
        {/* 레벨 프로그레스 바 */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <p className={textMuted}>현재 레벨</p>
            <p className={textColor}>Lv. {stats.level}</p>
          </div>
          <div className={`level-progress-container ${progressBg}`}>
            <div 
              className={`tasks-progress-bar ${progressFilledBg}`}
              data-progress={expProgressPercentage}
            />
          </div>
          <div className="flex justify-between text-xs">
            <p className={textMuted}>경험치</p>
            <p className={textMuted}>{stats.experience.current} / {stats.experience.nextLevel}</p>
          </div>
        </div>
      </div>
      
      {/* 카테고리 탭 */}
      <div className="flex overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {(['daily', 'weekly', 'achievement', 'special'] as TaskCategory[]).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`task-category-tab mr-2 ${
              activeCategory === category
                ? buttonActiveBg
                : buttonBg
            }`}
          >
            {getCategoryIcon(category)}
            <span className="ml-1">
              {getCategoryName(category)}
              {category === 'daily' && renderCategoryCompletion('daily')}
              {category === 'weekly' && renderCategoryCompletion('weekly')}
            </span>
          </button>
        ))}
      </div>

      {/* 작업 목록 */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className={`text-lg ${textColor}`}>{getCategoryName(activeCategory)}</h3>
          <div className="text-sm">
            <span className={textColor}>{completedTasksCount}/{categoryTotalCount} 완료</span>
          </div>
        </div>
        
        {filteredTasks.length > 0 ? (
          <div className="space-y-3">
            {filteredTasks.map(renderTaskItem)}
          </div>
        ) : (
          <div className={`${cardBg} rounded-lg p-6 text-center ${textMuted}`}>
            이 카테고리에 작업이 없습니다.
          </div>
        )}
        
        {/* 새로고침 버튼 */}
        <div className="mt-4 flex justify-center">
          <button 
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md ${buttonBg} text-sm`}
            onClick={() => {
              // 작업 목록 새로고침 시뮬레이션
              setTimeout(() => {
                // 실제로는 서버에서 최신 작업을 가져오는 로직
                alert('작업 목록이 업데이트되었습니다!');
              }, 500);
            }}
          >
            <RefreshCw className="w-4 h-4" /> 새로고침
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksTab;
