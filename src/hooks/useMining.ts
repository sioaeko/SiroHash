import { useState, useEffect, useCallback, useRef } from 'react';

interface Block {
  id: number;
  miner: string;
  time: string;
  reward: number;
  difficulty: number;
}

interface NetworkStats {
  complexity: number;
  onlineUsers: number;
  reward: number;
  difficulty: number;
  networkHashRate: number;
  blockTime: number;
}

interface UseMiningReturn {
  isMining: boolean;
  setIsMining: React.Dispatch<React.SetStateAction<boolean>>;
  energy: number;
  hashRate: number;
  income: number;
  blockNumber: number;
  complexity: number;
  onlineUsers: number;
  reward: number;
  recentBlocks: Block[];
  networkStats: NetworkStats;
  efficiency: number;
  miningPower: number;
  formatHashRate: (rate: number) => string;
  formatIncome: (amount: number) => string;
  toggleMining: () => void;
  addEnergy: (amount: number) => void;
  upgradeMiningPower: (amount: number) => void;
}

// 현실적인 채굴자 이름 목록
const MINERS = [
  'Satoshi', 'Vitalik', 'Nakamoto', 'CryptoKing', 'BlockMaster', 
  'HashQueen', 'MiningGuru', 'ByteWizard', 'ChainBreaker', 'CoinHunter',
  'Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Helen',
  'BitLord', 'HashRocket', 'NodeRunner', 'BlockSmith', 'CipherPunk',
  '서민석', '김지은', '이태호', '박서연', '정도현', '최유진'
];

export const useMining = (): UseMiningReturn => {
  // 기본 상태 값들
  const [isMining, setIsMining] = useState(false);
  const [energy, setEnergy] = useState(4500);
  const [hashRate, setHashRate] = useState(0);
  const [income, setIncome] = useState(0);
  const [blockNumber, setBlockNumber] = useState(1319839);
  const [efficiency, setEfficiency] = useState(85); // 채굴 효율 (%)
  const [miningPower, setMiningPower] = useState(1); // 채굴 성능 배수

  // 네트워크 통계 상태 관리
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    complexity: 27743,
    onlineUsers: 23416,
    reward: 3500,
    difficulty: 2.7,
    networkHashRate: 156.3,
    blockTime: 156 // 평균 블록 시간 (초)
  });

  const [recentBlocks, setRecentBlocks] = useState<Block[]>([
    { id: 1319838, miner: 'Satoshi', time: '22:46', reward: 3500, difficulty: 2.68 },
    { id: 1319837, miner: 'Vitalik', time: '22:44', reward: 3500, difficulty: 2.67 },
    { id: 1319836, miner: 'BlockMaster', time: '22:41', reward: 3500, difficulty: 2.69 }
  ]);

  // 타이머 및 블록 마이닝 간격 추적용 ref
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const networkUpdateIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastBlockTimeRef = useRef<number>(Date.now());
  const blockChanceRef = useRef<number>(0.05); // 초당 블록 발견 확률 기본값

  // 네트워크 통계 업데이트 함수
  const updateNetworkStats = useCallback(() => {
    setNetworkStats(prev => {
      // 복잡성 변동: 5% 이내로 랜덤하게 변동
      const complexityChange = prev.complexity * (1 + (Math.random() - 0.5) * 0.01);
      
      // 온라인 유저 수 변동: 30명 이내로 변동
      const usersChange = prev.onlineUsers + Math.floor((Math.random() - 0.5) * 60);
      
      // 네트워크 해시레이트 변동
      const hashRateChange = prev.networkHashRate * (1 + (Math.random() - 0.5) * 0.02);
      
      // 난이도 변동: 0.01 이내로 변동
      const difficultyChange = Math.max(1, prev.difficulty + (Math.random() - 0.5) * 0.01);
      
      // 블록 보상 변동 (간헐적으로만 변동)
      const rewardChange = Math.random() > 0.98 
        ? prev.reward + (Math.random() > 0.5 ? 50 : -50)
        : prev.reward;
      
      // 블록 시간 변동
      const blockTimeChange = Math.max(30, Math.min(300, prev.blockTime + (Math.random() - 0.5) * 10));

      // 블록 발견 확률 업데이트
      blockChanceRef.current = 1 / (blockTimeChange * 10); // 조정 가능한 값

      return {
        complexity: Math.floor(complexityChange),
        onlineUsers: Math.max(1000, Math.floor(usersChange)),
        reward: Math.floor(Math.max(1000, rewardChange)),
        difficulty: parseFloat(difficultyChange.toFixed(2)),
        networkHashRate: parseFloat(hashRateChange.toFixed(1)),
        blockTime: Math.floor(blockTimeChange)
      };
    });
  }, []);

  // 채굴 효율성 및 마이닝 파워 업데이트
  const updateMiningStats = useCallback(() => {
    // 채굴 효율성: 랜덤하게 소폭 변동
    setEfficiency(prev => {
      const newEfficiency = prev + (Math.random() - 0.5) * 1;
      return Math.min(100, Math.max(70, newEfficiency));
    });
    
    // 마이닝 파워는 유지 (업그레이드 시 증가하는 값)
  }, []);

  // 마이닝 파워 업그레이드 (서비스 구매 시 사용)
  const upgradeMiningPower = useCallback((amount: number) => {
    setMiningPower(prev => prev + amount);
  }, []);

  // 블록 마이닝 시뮬레이션
  const simulateBlockMining = useCallback(() => {
    const now = Date.now();
    const timeSinceLastBlock = (now - lastBlockTimeRef.current) / 1000; // 초 단위
    const chanceMultiplier = hashRate / 10; // 해시레이트가 높을수록 발견 확률 증가
    const adjustedChance = blockChanceRef.current * timeSinceLastBlock * chanceMultiplier;
    
    // 블록 발견 확률에 따라 블록 생성
    if (Math.random() < adjustedChance) {
      const newBlock = blockNumber + 1;
      setBlockNumber(newBlock);
      
      // 마이너 선택 (80% 확률로 다른 마이너, 20% 확률로 사용자)
      const isUserMiner = Math.random() < 0.2;
      const miner = isUserMiner ? 'You' : MINERS[Math.floor(Math.random() * MINERS.length)];
      
      // 현재 시간
      const time = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
      
      // 난이도 약간 변경
      const blockDifficulty = networkStats.difficulty + (Math.random() - 0.5) * 0.05;
      
      // 새로운 블록을 저장
      const newBlockData: Block = {
        id: newBlock,
        miner,
        time,
        reward: networkStats.reward,
        difficulty: parseFloat(blockDifficulty.toFixed(2))
      };
      
      setRecentBlocks(prev => [newBlockData, ...prev.slice(0, 9)]); // 최대 10개 블록 저장
      
      // 사용자가 채굴한 경우 수입 증가
      if (isUserMiner) {
        setIncome(prev => prev + networkStats.reward * 0.00001);
      }
      
      // 블록 타임 리셋
      lastBlockTimeRef.current = now;
    }
  }, [blockNumber, hashRate, networkStats.difficulty, networkStats.reward]);

  // 채굴 시뮬레이션
  useEffect(() => {
    if (isMining) {
      // 채굴 타이머 설정
      intervalRef.current = setInterval(() => {
        // 에너지 감소 (정수 단위로 변경)
        setEnergy(prev => {
          // 해시레이트가 높을수록 에너지 소모 증가, 항상 정수로 차감
          const energyDecreaseRate = Math.ceil(5 * (hashRate / 10 + 1));
          const newEnergy = Math.max(0, prev - energyDecreaseRate);
          if (newEnergy === 0) {
            setIsMining(false);
          }
          return newEnergy;
        });
        
        // 해시레이트 변동
        setHashRate(prev => {
          const baseRate = miningPower * (efficiency / 100); // 기본 해시레이트
          const fluctuation = (Math.random() - 0.5) * 0.2; // 변동폭
          const networkFactor = 1 + (Math.sin(Date.now() / 10000) * 0.1); // 네트워크 부하에 따른 변동
          
          return Math.max(0, prev + fluctuation) * baseRate * networkFactor;
        });
        
        // 수입 증가 (해시레이트와 네트워크 난이도에 따라)
        const incomeRate = (hashRate / networkStats.networkHashRate) * 0.00001;
        setIncome(prev => prev + (incomeRate * networkStats.reward / networkStats.difficulty));
        
        // 블록 마이닝 시뮬레이션
        simulateBlockMining();
        
      }, 1000);
    } else {
      // 채굴 중지 시 해시레이트 리셋
      setHashRate(0);
      
      // 타이머 클리어
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isMining, blockNumber, hashRate, miningPower, efficiency, networkStats, simulateBlockMining]);

  // 네트워크 상태 주기적 업데이트
  useEffect(() => {
    // 초기 통계 업데이트
    updateNetworkStats();
    
    // 10초마다 네트워크 통계 업데이트
    networkUpdateIntervalRef.current = setInterval(() => {
      updateNetworkStats();
      updateMiningStats();
    }, 10000);
    
    // 블록 자동 생성 (채굴 상태와 무관하게 네트워크에서 블록이 계속 생성됨)
    const autoBlockInterval = setInterval(() => {
      const newBlock = blockNumber + 1;
      setBlockNumber(newBlock);
      
      // 마이너 선택
      const miner = MINERS[Math.floor(Math.random() * MINERS.length)];
      
      // 현재 시간
      const time = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
      
      // 난이도 약간 변경
      const blockDifficulty = networkStats.difficulty + (Math.random() - 0.5) * 0.05;
      
      // 보상 약간 변경
      const blockReward = Math.floor(networkStats.reward * (1 + (Math.random() - 0.5) * 0.01));
      
      // 새로운 블록을 저장
      const newBlockData: Block = {
        id: newBlock,
        miner,
        time,
        reward: blockReward,
        difficulty: parseFloat(blockDifficulty.toFixed(2))
      };
      
      setRecentBlocks(prev => [newBlockData, ...prev.slice(0, 9)]); // 최대 10개 블록 저장
      
      // 네트워크 상태도 업데이트
      setNetworkStats(prev => ({
        ...prev,
        complexity: prev.complexity + Math.floor(Math.random() * 10),
        onlineUsers: Math.max(1000, prev.onlineUsers + Math.floor((Math.random() - 0.5) * 20))
      }));
      
    }, 5000); // 5초마다 새 블록 생성
    
    return () => {
      if (networkUpdateIntervalRef.current) {
        clearInterval(networkUpdateIntervalRef.current);
        networkUpdateIntervalRef.current = null;
      }
      clearInterval(autoBlockInterval);
    };
  }, [blockNumber, networkStats.difficulty, networkStats.reward, updateNetworkStats, updateMiningStats]);

  // 해시레이트 포맷팅
  const formatHashRate = useCallback((rate: number) => {
    if (rate < 1) return rate.toFixed(2);
    if (rate < 1000) return Math.floor(rate).toString();
    return `${(rate/1000).toFixed(1)}k`;
  }, []);

  // 수입 포맷팅
  const formatIncome = useCallback((amount: number) => {
    if (amount < 0.00001) return '0.00000';
    return amount.toFixed(5);
  }, []);

  // 채굴 토글
  const toggleMining = useCallback(() => {
    if (energy > 0) {
      setIsMining(prev => !prev);
    }
  }, [energy]);

  // 에너지 추가 (작업 완료 등에서 사용)
  const addEnergy = useCallback((amount: number) => {
    setEnergy(prev => Math.min(9999, prev + amount));
  }, []);

  return {
    isMining,
    setIsMining,
    energy,
    hashRate,
    income,
    blockNumber,
    complexity: networkStats.complexity,
    onlineUsers: networkStats.onlineUsers,
    reward: networkStats.reward,
    recentBlocks,
    networkStats,
    efficiency,
    miningPower,
    formatHashRate,
    formatIncome,
    toggleMining,
    addEnergy,
    upgradeMiningPower
  };
};

export default useMining;
