import { useState } from 'react';
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Flame,
  LineChart,
  Newspaper,
  PencilLine,
  Play,
  RotateCcw,
  Settings2,
  type LucideIcon,
} from 'lucide-react';
import {
  IOSStatusBar, BackNav, AIInputBar, BottomNav,
  NavigateFn,
} from './shared';

interface Props {
  navigate: NavigateFn;
  goBack: () => void;
  onTabChange: (tab: 'today' | 'wrongbank' | 'review' | 'profile') => void;
}

function ReviewIconTile({
  Icon,
  bg = '#eef3ff',
  color = '#2b5fbf',
  size = 16,
}: {
  Icon: LucideIcon;
  bg?: string;
  color?: string;
  size?: number;
}) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[9px]"
      style={{
        width: size === 16 ? 32 : 28,
        height: size === 16 ? 32 : 28,
        backgroundColor: bg,
      }}
    >
      <Icon size={size} strokeWidth={1.85} color={color} />
    </span>
  );
}

// ─── Page 9: Review Home ───────────────────────────────────────────────────────

export function ReviewHomePage({ navigate, onTabChange }: Props) {
  const reviewTasks = [
    {
      title: '错题复盘',
      desc: '题干、答案、错因和解析一起回看',
      count: '12 张',
      state: '2 逾期',
      stateTone: 'text-[var(--app-red)] bg-[var(--app-red-soft)]',
      time: '约 11 分钟',
      Icon: ClipboardList,
      color: 'var(--app-red)',
      bg: 'var(--app-red-soft)',
    },
    {
      title: '词汇复习',
      desc: '只复习已经点开学习过的词汇组',
      count: '16 张',
      state: '今日到期',
      stateTone: 'text-[var(--app-green)] bg-[var(--app-green-soft)]',
      time: '约 8 分钟',
      Icon: BookOpen,
      color: 'var(--app-green)',
      bg: 'var(--app-green-soft)',
    },
    {
      title: '时政考点',
      desc: '读过新闻后生成的关键词挖空卡',
      count: '8 张',
      state: '1 逾期',
      stateTone: 'text-[var(--app-amber)] bg-[var(--app-amber-soft)]',
      time: '约 6 分钟',
      Icon: Newspaper,
      color: 'var(--app-amber)',
      bg: 'var(--app-amber-soft)',
    },
  ];

  return (
    <div className="app-page flex h-full flex-col overflow-hidden">
      <IOSStatusBar />

      <header className="flex-shrink-0 px-[20px] pb-[9px] pt-[4px]">
        <div className="flex items-start justify-between gap-[12px]">
          <div>
            <p className="text-[24px] font-bold tracking-[-0.3px] text-[var(--app-ink)]">今日复盘</p>
            <p className="mt-[2px] text-[13px] text-[var(--app-muted)]">6月30日 · 按艾宾浩斯间隔推送</p>
          </div>
          <button
            type="button"
            className="app-pressable flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white text-[var(--app-navy)] shadow-[var(--app-shadow-hairline)]"
            aria-label="复盘设置"
          >
            <Settings2 size={17} strokeWidth={1.9} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-[16px] pb-[10px]">
        <section className="mb-[16px] rounded-[24px] bg-[var(--app-navy)] p-[22px] text-white shadow-[0_18px_40px_rgba(30,58,95,0.24)]">
          <div className="flex items-center justify-between gap-[12px]">
            <div className="flex min-w-0 items-center gap-[10px]">
              <span className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[12px] bg-white/14 text-white">
                <CalendarDays size={17} strokeWidth={1.9} />
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-bold leading-[18px] text-white/82">今天全部复盘</p>
                <p className="mt-[7px] text-[34px] font-bold leading-[38px] tracking-[-0.6px]">36 张卡片</p>
              </div>
            </div>
            <div className="rounded-[18px] bg-white/16 px-[14px] py-[11px] text-right">
              <p className="text-[20px] font-bold leading-[22px]">25</p>
              <p className="text-[11px] leading-[15px] text-white/68">分钟</p>
            </div>
          </div>

          <p className="mt-[12px] max-w-[270px] text-[14px] leading-[23px] text-white/72">
            错题、词汇和时政考点会按你设置的顺序进入同一场闪卡会话。
          </p>

          <div className="mt-[18px] grid grid-cols-3 gap-[8px]">
            {[
              ['31', '到期'],
              ['3', '逾期'],
              ['12%', '已完成'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[15px] bg-white/14 px-[12px] py-[11px]">
                <p className="text-[17px] font-bold leading-[20px]">{value}</p>
                <p className="mt-[3px] text-[11px] leading-[15px] text-white/64">{label}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate('flashcard-review')}
            className="app-pressable mt-[18px] flex h-[52px] w-full items-center justify-center gap-[8px] rounded-[17px] bg-white text-[15px] font-bold text-[var(--app-navy)] shadow-[0_12px_26px_rgba(8,22,42,0.18)]"
          >
            <Play size={16} strokeWidth={2} fill="currentColor" />
            开始今日全部复盘
          </button>
        </section>

        <section className="mb-[10px]">
          <div className="mb-[10px] flex items-center justify-between px-[4px]">
            <p className="text-[16px] font-bold text-[var(--app-ink)]">分开复习</p>
            <span className="text-[12px] text-[var(--app-muted)]">可调整顺序</span>
          </div>

          <div className="app-card overflow-hidden rounded-[22px] p-0">
            {reviewTasks.map(({ title, desc, count, state, stateTone, time, Icon, color, bg }, index) => (
              <button
                key={title}
                type="button"
                onClick={() => navigate('flashcard-review')}
                className={`app-pressable flex min-h-[78px] w-full items-center gap-[12px] px-[16px] py-[13px] text-left ${
                  index < reviewTasks.length - 1 ? 'border-b border-[var(--app-hairline)]' : ''
                }`}
              >
                <span className="flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center rounded-[14px]" style={{ color, background: bg }}>
                  <Icon size={19} strokeWidth={1.9} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-[7px]">
                    <span className="block text-[16px] font-bold leading-[21px] text-[var(--app-ink)]">{title}</span>
                    <span className={`rounded-full px-[7px] py-[2px] text-[10.5px] font-bold leading-[14px] ${stateTone}`}>{state}</span>
                  </span>
                  <span className="mt-[4px] block text-[12px] leading-[17px] text-[var(--app-muted)]">{desc}</span>
                </span>
                <span className="flex w-[54px] flex-shrink-0 flex-col items-end text-right">
                  <span className="text-[15px] font-bold leading-[19px] text-[var(--app-ink)]">{count}</span>
                  <span className="mt-[2px] text-[11px] leading-[15px] text-[var(--app-muted)]">{time}</span>
                </span>
                <ChevronRight size={17} strokeWidth={2} className="flex-shrink-0 text-[var(--app-faint)]" />
              </button>
            ))}
          </div>
        </section>
      </main>

      <AIInputBar />
      <BottomNav activeTab="review" onTabChange={onTabChange} />
    </div>
  );
}

// ─── Page 10: Hot Practice ────────────────────────────────────────────────────

const hotQuestions = [
  {
    id: 1, topic: '数字政府', type: '单选题',
    stem: '以下关于"数字政府"建设的表述，哪项最为准确？',
    options: ['A. 数字政府建设以"数字技术"为唯一手段', 'B. 数字政府是以数据为关键要素，以政务信息化为基础的政府治理模式', 'C. 数字政府主要面向行政内部流程优化', 'D. 数字政府建设只需提升网络基础设施'],
    correctIndex: 1,
    explanation: 'B项正确。数字政府以数据为关键要素，以政务信息化为基础，面向政府治理全过程，不局限于技术手段或内部流程。',
    tag: '数字政府 · 行政管理',
  },
  {
    id: 2, topic: '基层治理', type: '单选题',
    stem: '基层治理现代化的核心要义是什么？',
    options: ['A. 强化行政管控，统一基层事务管理', 'B. 推进治理重心下移，激发基层自治活力', 'C. 减少基层政府职能，降低行政成本', 'D. 以数字技术替代传统治理手段'],
    correctIndex: 1,
    explanation: 'B项正确。基层治理现代化的核心在于推进治理重心下移，充分激发基层社区、群众的自治活力，实现多元共治。',
    tag: '基层治理 · 社会治理',
  },
  {
    id: 3, topic: '粮食安全', type: '判断题',
    stem: '"藏粮于地"是指将粮食储藏于耕地中，以备不时之需。',
    options: ['正确', '错误'],
    correctIndex: 1,
    explanation: '错误。"藏粮于地"是指保护耕地、确保农业生产能力，而非字面意义的"将粮食储藏于土地中"。',
    tag: '粮食安全 · 农业政策',
  },
];

export function HotPracticePage({ navigate, goBack, onTabChange }: Props) {
  const [answers, setAnswers] = useState<(string | null)[]>([null, null, null]);
  const [submitted, setSubmitted] = useState<boolean[]>([false, false, false]);

  const handleAnswer = (qIdx: number, ans: string) => {
    const a = [...answers]; a[qIdx] = ans; setAnswers(a);
  };
  const handleSubmit = (qIdx: number) => {
    const s = [...submitted]; s[qIdx] = true; setSubmitted(s);
  };

  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-hidden">
      <IOSStatusBar />
      <BackNav title="趁热打铁" onBack={goBack} />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[8px]">
        {/* Header info */}
        <div className="bg-[#1e3a5f] rounded-[14px] px-[16px] py-[14px] mb-[14px]" style={{ boxShadow: '0 4px 12px rgba(30,58,95,0.2)' }}>
          <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[15px] text-white mb-[4px]">根据今天的错题和阅读内容生成</p>
          <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[rgba(255,255,255,0.65)]">
            覆盖：数字政府 · 基层治理 · 粮食安全 · 资料分析增长率 · 言语主旨
          </p>
          <div className="flex items-center gap-[8px] mt-[10px]">
            <div className="flex-1 bg-[rgba(255,255,255,0.15)] rounded-full h-[4px] overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-300"
                style={{ width: `${(submitted.filter(Boolean).length / 3) * 100}%` }}
              />
            </div>
            <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[rgba(255,255,255,0.7)]">
              {submitted.filter(Boolean).length}/3
            </span>
          </div>
        </div>

        {/* Questions */}
        {hotQuestions.map((q, qIdx) => {
          const optLetters = ['A', 'B', 'C', 'D'];
          const isTF = q.options.length === 2;
          return (
            <div key={q.id} className="bg-white rounded-[14px] p-[16px] mb-[12px]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-[8px] mb-[10px]">
                <span className="bg-[rgba(30,58,95,0.08)] text-[#1e3a5f] text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] px-[8px] py-[2px] rounded-[6px]">
                  {q.type}
                </span>
                <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[11px] text-[#9baabb]">第 {q.id} 题</span>
                <span className="bg-[#fbf4e0] text-[#8a6a10] text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] px-[6px] py-[1px] rounded-[6px] ml-auto">
                  {q.topic}
                </span>
              </div>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] text-[#1b2d4f] leading-[26px] mb-[14px]">{q.stem}</p>

              {!submitted[qIdx] ? (
                <>
                  <div className={`${isTF ? 'flex gap-[10px]' : 'space-y-[8px]'} mb-[12px]`}>
                    {q.options.map((opt, i) => {
                      const letter = isTF ? opt : optLetters[i];
                      const isSelected = answers[qIdx] === letter;
                      return (
                        <button
                          key={i}
                          onClick={() => handleAnswer(qIdx, letter)}
                          className={`${isTF ? 'flex-1' : 'w-full'} text-left px-[12px] py-[10px] rounded-[10px] font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] border leading-[22px] active:opacity-70 ${
                            isSelected ? 'border-[#1e3a5f] bg-[#eef3fb] text-[#1e3a5f]' : 'border-[#e3e8f0] bg-white text-[#4a5e73]'
                          }`}
                        >
                          {isTF ? opt : opt}
                        </button>
                      );
                    })}
                  </div>
                  {answers[qIdx] && (
                    <button onClick={() => handleSubmit(qIdx)}
                      className="w-full py-[11px] rounded-[10px] bg-[#1e3a5f] text-white font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] active:opacity-80">
                      提交
                    </button>
                  )}
                </>
              ) : (
                <div>
                  <div className={`${isTF ? 'flex gap-[10px]' : 'space-y-[6px]'} mb-[10px]`}>
                    {q.options.map((opt, i) => {
                      const letter = isTF ? opt : optLetters[i];
                      const isCorrect = i === q.correctIndex;
                      const isChosen = answers[qIdx] === letter;
                      let cls = 'border-[#e3e8f0] bg-[#f8fafc] text-[#4a5e73]';
                      if (isCorrect) cls = 'border-[#2e7a3c] bg-[#e8f5e9] text-[#2e7a3c]';
                      else if (isChosen && !isCorrect) cls = 'border-[#c84b2f] bg-[#fff3f0] text-[#c84b2f]';
                      return (
                        <div key={i} className={`${isTF ? 'flex-1' : 'w-full'} px-[12px] py-[10px] rounded-[10px] font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] border leading-[22px] ${cls}`}>
                          {opt}
                        </div>
                      );
                    })}
                  </div>
                  <div className="bg-[#f8fafc] rounded-[8px] p-[12px] mb-[8px]">
                    <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[12px] text-[#6b7e94] mb-[4px]">解析</p>
                    <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#4a5e73] leading-[20px]">{q.explanation}</p>
                  </div>
                  <div className="flex items-center gap-[6px] flex-wrap">
                    {q.tag.split(' · ').map(t => (
                      <span key={t} className="bg-[#fbf4e0] text-[#8a6a10] text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] px-[8px] py-[2px] rounded-[6px]">{t}</span>
                    ))}
                    <button className="ml-auto font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#7c4daf] bg-[#f8f0ff] px-[8px] py-[3px] rounded-[6px] active:opacity-70">
                      加入错题库
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {submitted.every(Boolean) && (
          <div className="bg-[#eaf5ec] rounded-[14px] p-[16px] mb-[8px] text-center">
            <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[16px] text-[#2e7a3c] mb-[4px]">
              <span className="inline-flex items-center justify-center gap-[6px]">
                <CheckCircle2 size={17} strokeWidth={2} />
                趁热打铁完成！
              </span>
            </p>
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#5e9a6c]">
              正确 {submitted.filter((_, i) => answers[i] !== null).length}/3 · 加入今日复盘
            </p>
          </div>
        )}
      </div>

      <BottomNav activeTab="review" onTabChange={onTabChange} />
    </div>
  );
}

// ─── Page 11: Daily Report ────────────────────────────────────────────────────

export function DailyReportPage({ navigate, goBack, onTabChange }: Props) {
  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-hidden">
      <IOSStatusBar />
      <BackNav title="今日复盘报告" onBack={goBack} />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[8px]">
        {/* Date + summary */}
        <div className="bg-white rounded-[14px] p-[16px] mb-[12px]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#9baabb] mb-[10px]">2026年6月18日 · 连续复盘第 14 天</p>
          <div className="grid grid-cols-3 gap-[10px]">
            {[
              { label: '精读', value: '2 篇', Icon: BookOpen, color: '#2b5fbf', bg: '#eef3ff' },
              { label: '配套题', value: '8 道', Icon: PencilLine, color: '#c09a30', bg: '#fbf4e0' },
              { label: '错题复盘', value: '5 道', Icon: RotateCcw, color: '#2e7a3c', bg: '#eaf5ec' },
            ].map(({ label, value, Icon, color, bg }) => (
              <div key={label} className="rounded-[12px] p-[12px] text-center" style={{ backgroundColor: bg }}>
                <div className="mb-[5px] flex justify-center">
                  <Icon size={19} strokeWidth={1.9} style={{ color }} />
                </div>
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[16px]" style={{ color }}>{value}</p>
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#9baabb] mt-[2px]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weak modules */}
        <div className="bg-white rounded-[14px] p-[16px] mb-[12px]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-[8px] mb-[12px]">
            <div className="w-[3px] h-[16px] bg-[#c84b2f] rounded-full"/>
            <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">薄弱模块</p>
          </div>
          {[
            { label: '常识时政', errCount: 4, pct: 70, color: '#c84b2f', bg: '#fff3f0' },
            { label: '资料分析增长率', errCount: 3, pct: 55, color: '#c07a30', bg: '#fff4e8' },
          ].map(({ label, errCount, pct, color, bg }) => (
            <div key={label} className="mb-[10px] last:mb-0">
              <div className="flex items-center justify-between mb-[4px]">
                <p className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[13px] text-[#2c3e52]">{label}</p>
                <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px]" style={{ color }}>错 {errCount} 题</span>
              </div>
              <div className="bg-[#f0f0f0] rounded-full h-[6px] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }}/>
              </div>
            </div>
          ))}
        </div>

        {/* High frequency wrong reasons */}
        <div className="bg-white rounded-[14px] p-[16px] mb-[12px]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-[8px] mb-[12px]">
            <div className="w-[3px] h-[16px] bg-[#c07a30] rounded-full"/>
            <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">高频错因</p>
          </div>
          {[
            { rank: 1, label: '概念混淆', count: 3 },
            { rank: 2, label: '审题过快', count: 2 },
            { rank: 3, label: '关键词记忆不牢', count: 2 },
          ].map(({ rank, label, count }) => (
            <div key={label} className="flex items-center gap-[12px] py-[8px] border-b border-[#f5f5f5] last:border-none">
              <span className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                rank === 1 ? 'bg-[#c84b2f] text-white' : rank === 2 ? 'bg-[#c07a30] text-white' : 'bg-[#9baabb] text-white'
              }`}>{rank}</span>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#2c3e52] flex-1">{label}</p>
              <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#9baabb]">{count} 次</span>
            </div>
          ))}
        </div>

        {/* AI suggestions */}
        <div className="bg-white rounded-[14px] p-[16px] mb-[12px]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-[8px] mb-[12px]">
            <div className="w-[24px] h-[24px] rounded-full bg-[#eef3ff] flex items-center justify-center flex-shrink-0">
              <span className="text-[9px] font-bold text-[#2b5fbf]">AI</span>
            </div>
            <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">AI 建议</p>
          </div>
          {[
            '明天优先复盘粮食安全和基层治理知识点',
            '资料分析继续练习增长率比较类题型',
            '申论表达积累：关注"国之大者"类金句',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-[8px] mb-[8px] last:mb-0">
              <div className="w-[4px] h-[4px] rounded-full bg-[#2b5fbf] mt-[9px] flex-shrink-0"/>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#4a5e73] leading-[22px]">{tip}</p>
            </div>
          ))}
        </div>

        {/* Tomorrow plan */}
        <div className="bg-white rounded-[14px] p-[16px] mb-[8px]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-[8px] mb-[12px]">
            <div className="w-[3px] h-[16px] bg-[#2e7a3c] rounded-full"/>
            <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">明日计划</p>
          </div>
          {[
            { label: '今日错题回看', detail: '8 道', Icon: RotateCcw, bg: '#eef3ff', color: '#2b5fbf' },
            { label: '时政词汇复习', detail: '10 个', Icon: BookOpen, bg: '#eaf5ec', color: '#2e7a3c' },
            { label: '5 道强化练习', detail: '趁热打铁', Icon: Flame, bg: '#fff3f0', color: '#c84b2f' },
          ].map(({ label, detail, Icon, bg, color }) => (
            <div key={label} className="flex items-center justify-between py-[9px] border-b border-[#f5f5f5] last:border-none">
              <div className="flex items-center gap-[10px]">
                <ReviewIconTile Icon={Icon} bg={bg} color={color} size={15} />
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#2c3e52]">{label}</p>
              </div>
              <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#9baabb]">{detail}</span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav activeTab="review" onTabChange={onTabChange} />
    </div>
  );
}
