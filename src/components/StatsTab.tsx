import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LineChart, Clock, Activity, TrendingUp } from 'lucide-react';
import '../styles/StatsTab.css';

interface StatsTabProps {
  darkMode?: boolean;
}

const StatsTab: React.FC<StatsTabProps> = ({ darkMode = true }) => {
  const [activeChart, setActiveChart] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [chartData, setChartData] = useState<number[]>([]);
  const [miningStats, setMiningStats] = useState({
    totalMined: 0.00137,
    avgHashRate: 1.23,
    efficiency: 89.4,
    uptime: 7.3,
  });
  const [chartUnit, setChartUnit] = useState<'H/s' | 'KH/s' | 'MH/s'>('H/s');
  const chartUpdateInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // 다크모드/라이트모드에 따른 스타일
  const bgColor = darkMode ? 'bg-[#1a1a1a]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const chartBg = darkMode ? 'bg-[#2a2a2a]' : 'bg-gray-100';
  const buttonBg = darkMode ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a]' : 'bg-gray-200 hover:bg-gray-300';
  const buttonActiveBg = darkMode ? 'bg-[#a3e635] text-gray-800' : 'bg-lime-500 text-white';

  // 차트 데이터 생성 함수
  const generateChartData = useCallback((type: 'daily' | 'weekly' | 'monthly' | 'yearly') => {
    const dataPoints: number[] = [];
    const dataPointCount = type === 'daily' ? 24 : type === 'weekly' ? 7 : type === 'monthly' ? 30 : 12;

    for (let i = 0; i < dataPointCount; i++) {
      // 각 기간별 특성에 맞게 다양한 패턴 생성
      if (type === 'daily') {
        // 일간 데이터: 아침과 저녁에 높고, 새벽과 점심에 낮은 패턴
        const hour = i;
        const baseTrend = hour >= 8 && hour <= 23 ? 0.7 : 0.3;
        const peakHours = (hour >= 19 && hour <= 22) || (hour >= 9 && hour <= 11);
        const peakFactor = peakHours ? 0.3 : 0;
        dataPoints.push(baseTrend + peakFactor + Math.random() * 0.2);
      } else if (type === 'weekly') {
        // 주간 데이터: 주말에 높고 주중에는 일정한 패턴
        const day = i;
        const isWeekend = day === 5 || day === 6;
        const baseTrend = isWeekend ? 0.8 : 0.5;
        dataPoints.push(baseTrend + Math.random() * 0.3);
      } else if (type === 'monthly') {
        // 월간 데이터: 월초와 월말에 높은 패턴
        const day = i;
        const isStartOrEnd = day < 5 || day > 25;
        const baseTrend = isStartOrEnd ? 0.7 : 0.4;
        dataPoints.push(baseTrend + Math.random() * 0.3);
      } else {
        // 연간 데이터: 겨울과 여름에 높은 패턴
        const month = i;
        const isWinterOrSummer = month < 2 || (month > 5 && month < 8) || month > 10;
        const baseTrend = isWinterOrSummer ? 0.75 : 0.5;
        dataPoints.push(baseTrend + Math.random() * 0.25);
      }
    }

    // 단위에 따라 값을 조정
    const unitMultiplier = chartUnit === 'KH/s' ? 1000 : chartUnit === 'MH/s' ? 1000000 : 1;
    return dataPoints.map(point => point * unitMultiplier);
  }, [chartUnit]);

  // 차트 데이터 실시간 업데이트
  const updateChartDataRealtime = useCallback(() => {
    setChartData(prev => {
      if (!prev.length) return generateChartData(activeChart);
      
      // 약간의 변동을 주어 라이브 느낌 표현
      return prev.map(value => {
        const change = (Math.random() - 0.5) * 0.05 * value; // 값의 ±2.5% 랜덤 변화
        return Math.max(0, value + change);
      });
    });
  }, [activeChart, generateChartData]);

  // 차트 종류가 변경될 때 데이터 업데이트
  useEffect(() => {
    setChartData(generateChartData(activeChart));
    
    // 기존 인터벌 클리어
    if (chartUpdateInterval.current) {
      clearInterval(chartUpdateInterval.current);
    }
    
    // 새로운 인터벌 설정 (3초마다 차트 데이터 업데이트)
    chartUpdateInterval.current = setInterval(() => {
      updateChartDataRealtime();
    }, 3000);
    
    return () => {
      if (chartUpdateInterval.current) {
        clearInterval(chartUpdateInterval.current);
      }
    };
  }, [activeChart, chartUnit, generateChartData, updateChartDataRealtime]);

  // 통계 데이터 업데이트 
  useEffect(() => {
    const interval = setInterval(() => {
      setMiningStats(prev => ({
        totalMined: parseFloat((prev.totalMined + Math.random() * 0.0001).toFixed(5)),
        avgHashRate: parseFloat((prev.avgHashRate + (Math.random() - 0.5) * 0.1).toFixed(2)),
        efficiency: parseFloat((prev.efficiency + (Math.random() - 0.5) * 0.3).toFixed(1)),
        uptime: parseFloat((prev.uptime + Math.random() * 0.01).toFixed(1)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 차트 렌더링 함수
  const renderChart = useCallback(() => {
    const maxValue = Math.max(...chartData, 0.1); // 0으로 나누는 것 방지
    const normalizedData = chartData.map(value => (value / maxValue) * 100);

    return (
      <div className="relative">
        <div className={`h-40 flex items-end justify-between gap-1 ${chartBg} rounded-lg overflow-hidden p-2`}>
          {normalizedData.map((height, index) => (
            <div 
              key={index}
              className="relative flex-1 flex justify-center stats-chart-container"
            >
              <div 
                className={`stats-chart-bar stats-chart-bar-${activeChart}`}
                data-height={`${Math.max(1, height)}`}
              />
            </div>
          ))}
        </div>
        
        {/* Y축 가이드라인 오버레이 */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="relative h-full">
            <div className="absolute top-0 w-full border-t border-gray-700 border-dashed opacity-30" />
            <div className="absolute top-[25%] w-full border-t border-gray-700 border-dashed opacity-30" />
            <div className="absolute top-[50%] w-full border-t border-gray-700 border-dashed opacity-30" />
            <div className="absolute top-[75%] w-full border-t border-gray-700 border-dashed opacity-30" />
          </div>
        </div>
      </div>
    );
  }, [chartData, chartBg, activeChart]);

  // 차트 라벨 렌더링
  const renderChartLabels = useCallback(() => {
    if (activeChart === 'daily') {
      return (
        <div className="flex justify-between text-xs text-gray-400 mt-1 px-2">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:00</span>
        </div>
      );
    } else if (activeChart === 'weekly') {
      return (
        <div className="flex justify-between text-xs text-gray-400 mt-1 px-2">
          <span>월</span>
          <span>화</span>
          <span>수</span>
          <span>목</span>
          <span>금</span>
          <span>토</span>
          <span>일</span>
        </div>
      );
    } else if (activeChart === 'monthly') {
      return (
        <div className="flex justify-between text-xs text-gray-400 mt-1 px-2">
          <span>1일</span>
          <span>10일</span>
          <span>20일</span>
          <span>30일</span>
        </div>
      );
    } else {
      return (
        <div className="flex justify-between text-xs text-gray-400 mt-1 px-2">
          <span>1월</span>
          <span>4월</span>
          <span>8월</span>
          <span>12월</span>
        </div>
      );
    }
  }, [activeChart]);

  // 단위에 따른 값 변환 헬퍼 함수
  const formatHashRate = useCallback((value: number): string => {
    if (chartUnit === 'H/s') {
      return value.toFixed(2) + ' H/s';
    } else if (chartUnit === 'KH/s') {
      return (value / 1000).toFixed(2) + ' KH/s';
    } else {
      return (value / 1000000).toFixed(2) + ' MH/s';
    }
  }, [chartUnit]);

  return (
    <div className="space-y-4">
      {/* 통계 요약 카드 */}
      <div className={`${bgColor} rounded-xl p-4`}>
        <h3 className={`text-lg mb-4 ${textColor}`}>채굴 통계</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className={`text-sm ${textMuted}`}>총 채굴량</p>
            <p className={`text-xl font-medium ${textColor}`}>{miningStats.totalMined.toFixed(5)} SIRO</p>
          </div>
          <div className="space-y-1">
            <p className={`text-sm ${textMuted}`}>평균 해시레이트</p>
            <p className={`text-xl font-medium ${textColor}`}>{miningStats.avgHashRate.toFixed(2)} {chartUnit}</p>
          </div>
          <div className="space-y-1">
            <p className={`text-sm ${textMuted}`}>효율성</p>
            <p className={`text-xl font-medium ${textColor}`}>{miningStats.efficiency}%</p>
          </div>
          <div className="space-y-1">
            <p className={`text-sm ${textMuted}`}>가동 시간</p>
            <p className={`text-xl font-medium ${textColor}`}>{miningStats.uptime}h</p>
          </div>
        </div>
      </div>

      {/* 차트 카드 */}
      <div className={`${bgColor} rounded-xl p-4`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg ${textColor}`}>해시레이트 차트</h3>
          
          {/* 차트 타입 선택 버튼 */}
          <div className="flex gap-1">
            <button 
              className={`rounded-md p-1.5 transition-colors ${activeChart === 'daily' ? buttonActiveBg : buttonBg}`}
              onClick={() => setActiveChart('daily')}
              title="일별 차트"
              aria-label="일별 차트"
            >
              <Clock className="w-4 h-4" />
            </button>
            <button 
              className={`rounded-md p-1.5 transition-colors ${activeChart === 'weekly' ? buttonActiveBg : buttonBg}`}
              onClick={() => setActiveChart('weekly')}
              title="주별 차트"
              aria-label="주별 차트"
            >
              <Activity className="w-4 h-4" />
            </button>
            <button 
              className={`rounded-md p-1.5 transition-colors ${activeChart === 'monthly' ? buttonActiveBg : buttonBg}`}
              onClick={() => setActiveChart('monthly')}
              title="월별 차트"
              aria-label="월별 차트"
            >
              <LineChart className="w-4 h-4" />
            </button>
            <button 
              className={`rounded-md p-1.5 transition-colors ${activeChart === 'yearly' ? buttonActiveBg : buttonBg}`}
              onClick={() => setActiveChart('yearly')}
              title="연별 차트"
              aria-label="연별 차트"
            >
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* 단위 선택 버튼 */}
        <div className="flex mb-3 gap-2">
          <button 
            className={`text-xs py-1 px-2 rounded ${chartUnit === 'H/s' ? buttonActiveBg : buttonBg}`}
            onClick={() => setChartUnit('H/s')}
          >
            H/s
          </button>
          <button 
            className={`text-xs py-1 px-2 rounded ${chartUnit === 'KH/s' ? buttonActiveBg : buttonBg}`}
            onClick={() => setChartUnit('KH/s')}
          >
            KH/s
          </button>
          <button 
            className={`text-xs py-1 px-2 rounded ${chartUnit === 'MH/s' ? buttonActiveBg : buttonBg}`}
            onClick={() => setChartUnit('MH/s')}
          >
            MH/s
          </button>
        </div>

        {renderChart()}
        {renderChartLabels()}

        <div className="flex justify-between text-sm mt-4">
          <div className="space-y-1">
            <p className={textMuted}>최고치</p>
            <p className={textColor}>{formatHashRate(Math.max(...chartData))}</p>
          </div>
          <div className="space-y-1">
            <p className={textMuted}>최저치</p>
            <p className={textColor}>{formatHashRate(Math.min(...chartData))}</p>
          </div>
          <div className="space-y-1">
            <p className={textMuted}>평균</p>
            <p className={textColor}>{formatHashRate(chartData.reduce((a, b) => a + b, 0) / chartData.length)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTab;
