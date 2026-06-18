import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  IOSStatusBar, BackNav, AIInputBar, BottomNav,
  NavigateFn, Tag,
} from './shared';

interface Props {
  navigate: NavigateFn;
  goBack: () => void;
  onTabChange: (tab: 'today' | 'wrongbank' | 'review' | 'profile') => void;
}

// ─── Page 9: Review Home ───────────────────────────────────────────────────────

export function ReviewHomePage({ navigate, goBack, onTabChange }: Props) {
  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-hidden">
      <IOSStatusBar />

      {/* Title */}
      <div className="px-[20px] pt-[4px] pb-[12px] flex-shrink-0">
        <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[22px] text-[#1b2d4f] tracking-[-0.3px]">今日复盘</p>
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#9baabb] mt-[2px]">2026年6月18日 · 连续学习第 14 天</p>
      </div>

      <div className="flex-1 overflow-y-auto px-[16px] pb-[8px]">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-[8px] mb-[16px]">
          {[
            { label: '今日错题', value: '8', color: '#c84b2f', bg: '#fff3f0' },
            { label: '待复盘', value: '5', color: '#c07a30', bg: '#fff4e8' },
            { label: '已掌握', value: '3', color: '#2e7a3c', bg: '#eaf5ec' },
            { label: '连续天数', value: '14', color: '#2b5fbf', bg: '#eef3ff' },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className="bg-white rounded-[12px] p-[10px] text-center" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[22px]" style={{ color }}>{value}</p>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#9baabb] mt-[2px] leading-[16px]">{label}</p>
            </div>
          ))}
        </div>

        {/* Hot practice card */}
        <div
          className="bg-[#1e3a5f] rounded-[16px] p-[20px] mb-[14px] cursor-pointer active:opacity-90"
          style={{ boxShadow: '0 4px 16px rgba(30,58,95,0.25)' }}
          onClick={() => navigate('hot-practice')}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-[8px] mb-[8px]">
                <div className="w-[28px] h-[28px] rounded-[8px] bg-[rgba(255,255,255,0.15)] flex items-center justify-center">
                  <span className="text-[14px]">🔥</span>
                </div>
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[17px] text-white">趁热打铁</p>
              </div>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[rgba(255,255,255,0.75)] leading-[20px] mb-[14px]">
                根据今天的错题和阅读内容生成强化练习
              </p>
              <div className="flex items-center gap-[6px] flex-wrap">
                {['粮食安全', '基层治理', '增长率'].map(t => (
                  <span key={t} className="bg-[rgba(255,255,255,0.15)] text-white text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] px-[8px] py-[3px] rounded-[20px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-[4px]">
              <div className="bg-[rgba(255,255,255,0.2)] rounded-[10px] px-[10px] py-[6px] text-center">
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[20px] text-white">5</p>
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[10px] text-[rgba(255,255,255,0.7)]">推荐题</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-[14px] pt-[12px] border-t border-[rgba(255,255,255,0.12)]">
            <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[rgba(255,255,255,0.6)]">复盘记录：今日已完成 3 项</span>
            <ChevronRight size={16} className="text-[rgba(255,255,255,0.5)]"/>
          </div>
        </div>

        {/* Today weaknesses */}
        <div className="bg-white rounded-[14px] p-[16px] mb-[12px]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-[8px] mb-[12px]">
            <div className="w-[3px] h-[16px] bg-[#c84b2f] rounded-full"/>
            <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">今日薄弱点</p>
          </div>
          <div className="flex flex-wrap gap-[8px] mb-[10px]">
            {[
              { label: '粮食安全', bg: '#fbf4e0', color: '#8a6a10' },
              { label: '基层治理', bg: '#eaf5ec', color: '#2e7a3c' },
              { label: '增长率', bg: '#eef3ff', color: '#2b5fbf' },
            ].map(({ label, bg, color }) => (
              <span key={label} className="text-[13px] font-['Noto_Sans_SC:Medium',sans-serif] px-[10px] py-[5px] rounded-[8px]" style={{ backgroundColor: bg, color }}>
                {label}
              </span>
            ))}
          </div>
          <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#9baabb]">
            推荐加练：5 题 · 建议今日完成
          </p>
        </div>

        {/* Tomorrow plan */}
        <div className="bg-white rounded-[14px] p-[16px] mb-[12px]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-[8px] mb-[12px]">
            <div className="w-[3px] h-[16px] bg-[#2b5fbf] rounded-full"/>
            <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">明日计划</p>
          </div>
          {[
            { label: '资料分析', time: '20 分钟', icon: '📊' },
            { label: '常识时政', time: '10 分钟', icon: '📰' },
            { label: '错题回看', time: '15 分钟', icon: '📋' },
          ].map(({ label, time, icon }) => (
            <div key={label} className="flex items-center justify-between py-[8px] border-b border-[#f5f5f5] last:border-none">
              <div className="flex items-center gap-[10px]">
                <span className="text-[16px]">{icon}</span>
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#2c3e52]">{label}</p>
              </div>
              <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#9baabb]">{time}</span>
            </div>
          ))}
        </div>

        {/* View daily report */}
        <button
          onClick={() => navigate('daily-report')}
          className="w-full bg-white rounded-[14px] p-[16px] flex items-center justify-between active:opacity-80"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center gap-[10px]">
            <div className="w-[36px] h-[36px] rounded-[10px] bg-[#eef3ff] flex items-center justify-center">
              <span className="text-[16px]">📈</span>
            </div>
            <div>
              <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">今日复盘报告</p>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#9baabb]">查看今日完整学习数据</p>
            </div>
          </div>
          <ChevronRight size={16} strokeWidth={2} className="text-[#c8d4e0]"/>
        </button>
      </div>

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
              🎉 趁热打铁完成！
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
              { label: '精读', value: '2 篇', icon: '📖', color: '#2b5fbf', bg: '#eef3ff' },
              { label: '配套题', value: '8 道', icon: '✏️', color: '#c09a30', bg: '#fbf4e0' },
              { label: '错题复盘', value: '5 道', icon: '🔄', color: '#2e7a3c', bg: '#eaf5ec' },
            ].map(({ label, value, icon, color, bg }) => (
              <div key={label} className="rounded-[12px] p-[12px] text-center" style={{ backgroundColor: bg }}>
                <p className="text-[20px] mb-[4px]">{icon}</p>
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
            { label: '今日错题回看', detail: '8 道', icon: '🔄' },
            { label: '时政词汇复习', detail: '10 个', icon: '📚' },
            { label: '5 道强化练习', detail: '趁热打铁', icon: '🔥' },
          ].map(({ label, detail, icon }) => (
            <div key={label} className="flex items-center justify-between py-[9px] border-b border-[#f5f5f5] last:border-none">
              <div className="flex items-center gap-[10px]">
                <span className="text-[16px]">{icon}</span>
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
