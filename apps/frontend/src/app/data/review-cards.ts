export type ReviewDeckId = 'wrong' | 'vocab' | 'policy';
export type ReviewMasteryLevel = 'unmastered' | 'reinforce' | 'mastered';

export interface ReviewDeckOption {
  id: ReviewDeckId;
  label: string;
  count: number;
  color: string;
  bg: string;
}

export interface ReviewCard {
  id: string;
  deckId: ReviewDeckId;
  title: string;
  meta: string;
  prompt: string;
  answer: string;
  analysis: string;
  tags: string[];
}

export interface MasteryFeedbackOption {
  id: ReviewMasteryLevel;
  label: string;
  detail: string;
  color: string;
  bg: string;
}

export const reviewDecks: ReviewDeckOption[] = [
  { id: 'wrong', label: '错题', count: 12, color: 'var(--app-red)', bg: 'var(--app-red-soft)' },
  { id: 'vocab', label: '词汇', count: 16, color: 'var(--app-green)', bg: 'var(--app-green-soft)' },
  { id: 'policy', label: '时政', count: 8, color: 'var(--app-amber)', bg: 'var(--app-amber-soft)' },
];

export const reviewCards: ReviewCard[] = [
  {
    id: 'wrong-1',
    deckId: 'wrong',
    title: '资料分析 · 增长率比较',
    meta: '错题复盘 · 下次复习：明天',
    prompt: '某地数字经济增加值由 860 亿元增长至 946 亿元。下列关于增长率的判断，哪一项最准确？',
    answer: '增长率约为 10.0%。',
    analysis: '先算增长量 946 - 860 = 86，再用 86 / 860。遇到接近整十的分母时可以先估算，避免被选项中的 9.1% 和 11.2% 干扰。',
    tags: ['未掌握', '资料分析', '增长率'],
  },
  {
    id: 'vocab-1',
    deckId: 'vocab',
    title: '今日词汇 · 现代治理',
    meta: '词汇复习 · 已学习词汇组',
    prompt: '在申论材料中，“韧性治理”通常强调治理体系面对风险冲击时的 ____、____ 和恢复能力。',
    answer: '适应能力、调节能力。',
    analysis: '这个词常和城市治理、公共安全、基层治理放在一起考，答题时可落到“预警、响应、恢复、改进”的链条。',
    tags: ['需巩固', '申论表达', '高频词'],
  },
  {
    id: 'policy-1',
    deckId: 'policy',
    title: '时政考点 · 经济政策',
    meta: '时政考点 · 新闻精读后加入',
    prompt: '中央经济工作会议强调，要以 ____ 引领现代化产业体系建设，扩大内需和稳外贸协同发力。',
    answer: '科技创新。',
    analysis: '挖空处是政策逻辑的核心关键词。记忆时不要只背词，还要连到“新质生产力、产业升级、供给结构优化”。',
    tags: ['需巩固', '经济政策', '挖空考点'],
  },
];

export const masteryFeedbackOptions: MasteryFeedbackOption[] = [
  { id: 'unmastered', label: '未掌握', detail: '缩短间隔', color: 'var(--app-red)', bg: 'var(--app-red-soft)' },
  { id: 'reinforce', label: '需巩固', detail: '按期再见', color: 'var(--app-amber)', bg: 'var(--app-amber-soft)' },
  { id: 'mastered', label: '已掌握', detail: '停止推送', color: 'var(--app-green)', bg: 'var(--app-green-soft)' },
];
