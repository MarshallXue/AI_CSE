import { useState } from 'react';
import { Search, Plus, Camera, ChevronRight, FileText } from 'lucide-react';
import {
  IOSStatusBar, BackNav, AIInputBar, BottomNav,
  NavigateFn, Tag, SectionCard,
} from './shared';

interface Props {
  navigate: NavigateFn;
  goBack: () => void;
  onTabChange: (tab: 'today' | 'wrongbank' | 'review' | 'profile') => void;
}

// ─── Page 5: Wrong Bank Home ──────────────────────────────────────────────────

const folders = [
  {
    id: 'zl', name: '资料分析', count: 42, lastReview: '今天', tags: ['增长率', '比重'], newToday: 3,
    color: '#eef3ff', dotColor: '#2b5fbf',
  },
  {
    id: 'yl', name: '言语理解', count: 31, lastReview: '昨天', tags: ['主旨题', '细节题'], newToday: 1,
    color: '#f1f6e4', dotColor: '#5e7a1a',
  },
  {
    id: 'pd', name: '判断推理', count: 27, lastReview: '3天前', tags: ['图形推理', '类比'], newToday: 0,
    color: '#f5eeff', dotColor: '#7c4daf',
  },
  {
    id: 'sl', name: '数量关系', count: 18, lastReview: '5天前', tags: ['工程问题', '排列组合'], newToday: 2,
    color: '#fff4e8', dotColor: '#c07a30',
  },
  {
    id: 'cs', name: '常识时政', count: 36, lastReview: '今天', tags: ['时政', '政治理论'], newToday: 4,
    color: '#eaf5ec', dotColor: '#2e7a3c',
  },
  {
    id: 'sl2', name: '申论素材', count: 24, lastReview: '今天', tags: ['基层治理', '数字政府'], newToday: 2,
    color: '#fbf4e0', dotColor: '#c09a30',
    isEssay: true,
  },
];

export function WrongBankHomePage({ navigate, goBack, onTabChange }: Props) {
  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-hidden">
      <IOSStatusBar />

      {/* Header */}
      <div className="px-[20px] pt-[4px] pb-[12px] flex-shrink-0">
        <div className="flex items-center justify-between mb-[12px]">
          <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[22px] text-[#1b2d4f] tracking-[-0.3px]">错题库</p>
          <button className="bg-[#1e3a5f] rounded-[10px] flex items-center gap-[5px] px-[12px] py-[7px] active:opacity-80">
            <Plus size={14} strokeWidth={2.5} className="text-white"/>
            <span className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[13px] text-white">新建</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="bg-white rounded-[12px] h-[42px] flex items-center gap-[10px] px-[14px]"
          style={{ border: '0.5px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <Search size={15} strokeWidth={2} className="text-[#9baabb] flex-shrink-0"/>
          <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#b0bec8]">搜索错题、文件夹或知识点</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-[10px] px-[16px] mb-[12px] flex-shrink-0">
        {[
          { icon: Camera, label: '拍题录入', bg: '#eef3ff', color: '#2b5fbf' },
          { icon: FileText, label: '手动录入', bg: '#eaf5ec', color: '#2e7a3c' },
          { icon: Search, label: 'OCR识别', bg: '#fbf4e0', color: '#8a6a10' },
        ].map(({ icon: Icon, label, bg, color }) => (
          <button
            key={label}
            onClick={() => label === '拍题录入' || label === 'OCR识别' ? navigate('ocr') : undefined}
            className="flex-1 py-[10px] rounded-[12px] flex flex-col items-center gap-[4px] active:opacity-70"
            style={{ backgroundColor: bg }}
          >
            <Icon size={16} strokeWidth={2} style={{ color }}/>
            <span className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[12px]" style={{ color }}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Folders */}
      <div className="flex-1 overflow-y-auto px-[16px] pb-[8px]">
        <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[13px] text-[#9baabb] mb-[8px] tracking-[0.5px]">
          全部文件夹
        </p>
        <div className="space-y-[10px]">
          {folders.map(folder => (
            <button
              key={folder.id}
              className="w-full text-left bg-white rounded-[14px] p-[16px] active:opacity-90"
              style={{ boxShadow: '0px 1px 6px rgba(0,0,0,0.05), 0px 0px 0px 0.5px rgba(0,0,0,0.05)' }}
              onClick={() => navigate('folder-detail')}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-[12px]">
                  <div
                    className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: folder.color }}
                  >
                    <div className="w-[18px] h-[18px] rounded-[4px]" style={{ backgroundColor: folder.dotColor, opacity: 0.8 }}/>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-[8px]">
                      <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[15px] text-[#1b2d4f]">
                        {folder.name}
                      </p>
                      {folder.newToday > 0 && (
                        <span className="bg-[#c84b2f] text-white text-[10px] font-['Noto_Sans_SC:Bold',sans-serif] font-bold px-[5px] py-[1px] rounded-full min-w-[18px] text-center">
                          {folder.newToday}
                        </span>
                      )}
                    </div>
                    <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#9baabb] mt-[2px]">
                      {folder.isEssay ? `${folder.count} 条` : `${folder.count} 题`} · 最近复盘：{folder.lastReview}
                    </p>
                    <div className="flex items-center gap-[6px] mt-[6px] flex-wrap">
                      {folder.tags.map(t => (
                        <span
                          key={t}
                          className="text-[11px] font-['Noto_Sans_SC:Regular',sans-serif] px-[6px] py-[2px] rounded-[6px]"
                          style={{ backgroundColor: folder.color, color: folder.dotColor }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} strokeWidth={2} className="text-[#c8d4e0] mt-[10px] flex-shrink-0"/>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AIInputBar />
      <BottomNav activeTab="wrongbank" onTabChange={onTabChange} />
    </div>
  );
}

// ─── Page 6: Folder Detail ────────────────────────────────────────────────────

const wrongCards = [
  {
    id: 1, title: '粮食安全相关政策考点', source: '每日时政', reason: '概念混淆',
    status: '未复盘', statusColor: '#c84b2f', statusBg: '#fef0ec',
    tags: ['三农政策', '粮食安全'], aiAnalyzed: true,
  },
  {
    id: 2, title: '数字政府建设目标', source: '今日新闻', reason: '关键词记忆不牢',
    status: '待强化', statusColor: '#c07a30', statusBg: '#fff4e8',
    tags: ['数字政府', '行政管理'], aiAnalyzed: false,
  },
  {
    id: 3, title: '基层治理现代化', source: '手动录入', reason: '申论表达不准确',
    status: '已掌握', statusColor: '#2e7a3c', statusBg: '#eaf5ec',
    tags: ['基层治理', '申论素材'], aiAnalyzed: false,
  },
];

export function FolderDetailPage({ navigate, goBack, onTabChange }: Props) {
  const [activeFilter, setActiveFilter] = useState('全部');
  const filters = ['全部', '未复盘', '已掌握', 'AI解析过'];

  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-hidden">
      <IOSStatusBar />
      <BackNav title="常识时政" onBack={goBack}
        right={<button className="active:opacity-60"><Plus size={20} strokeWidth={2} className="text-[#2b5fbf]"/></button>}
      />

      {/* Subtitle */}
      <div className="px-[20px] pb-[10px] flex-shrink-0">
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#9baabb]">
          36 题 · 今日新增 4 · 最近复盘今天
        </p>
        {/* Filter tabs */}
        <div className="flex gap-[8px] mt-[10px] overflow-x-auto no-scrollbar">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-[12px] py-[6px] rounded-[20px] text-[13px] font-['Noto_Sans_SC:Medium',sans-serif] font-medium whitespace-nowrap flex-shrink-0 active:opacity-70 ${
                activeFilter === f
                  ? 'bg-[#1e3a5f] text-white'
                  : 'bg-white text-[#6b7e94] border border-[#e3e8f0]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[16px] pb-[8px]">
        {/* AI dialog entry */}
        <button
          className="w-full bg-[#eef3ff] rounded-[12px] p-[14px] mb-[12px] flex items-center justify-between active:opacity-80"
        >
          <div className="flex items-center gap-[10px]">
            <div className="w-[32px] h-[32px] rounded-full bg-[#2b5fbf] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[11px] font-bold">AI</span>
            </div>
            <div>
              <p className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[13px] text-[#1b2d4f]">本文件夹对话记录</p>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#7a8fa6]">只显示当前文件夹内的 AI 问答</p>
            </div>
          </div>
          <ChevronRight size={16} strokeWidth={2} className="text-[#c8d4e0]"/>
        </button>

        {/* Wrong question cards */}
        <div className="space-y-[10px]">
          {wrongCards.map(card => (
            <button
              key={card.id}
              className="w-full text-left bg-white rounded-[14px] p-[16px] active:opacity-90"
              style={{ boxShadow: '0px 1px 6px rgba(0,0,0,0.05), 0px 0px 0px 0.5px rgba(0,0,0,0.05)' }}
              onClick={() => navigate('wrong-detail')}
            >
              <div className="flex items-start justify-between mb-[8px]">
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[15px] text-[#1b2d4f] flex-1 pr-[8px] leading-[22px]">
                  {card.title}
                </p>
                <span
                  className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[11px] px-[8px] py-[3px] rounded-[20px] flex-shrink-0"
                  style={{ backgroundColor: card.statusBg, color: card.statusColor }}
                >
                  {card.status}
                </span>
              </div>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#9baabb] mb-[8px]">
                来源：{card.source} · 错因：{card.reason}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[6px] flex-wrap">
                  {card.tags.map(t => (
                    <span key={t} className="bg-[#eaf5ec] text-[#2e7a3c] text-[11px] font-['Noto_Sans_SC:Regular',sans-serif] px-[6px] py-[2px] rounded-[6px]">
                      {t}
                    </span>
                  ))}
                </div>
                {card.aiAnalyzed && (
                  <div className="flex items-center gap-[4px]">
                    <div className="w-[14px] h-[14px] rounded-full bg-[#eef3ff] flex items-center justify-center">
                      <span className="text-[8px] font-bold text-[#2b5fbf]">AI</span>
                    </div>
                    <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#7a8fa6]">已解析</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <AIInputBar placeholder="问AI，针对当前文件夹内容" />
      <BottomNav activeTab="wrongbank" onTabChange={onTabChange} />
    </div>
  );
}

// ─── Page 7: OCR / Photo Entry ────────────────────────────────────────────────

export function OCRPage({ navigate, goBack, onTabChange }: Props) {
  const [recognized, setRecognized] = useState(false);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-hidden">
      <IOSStatusBar />
      <BackNav title="添加错题" onBack={goBack} />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[8px]">
        {!recognized ? (
          /* Upload area */
          <>
            <div
              className="bg-white rounded-[16px] mb-[16px] flex flex-col items-center justify-center py-[48px] gap-[16px] active:bg-[#f8f8f8] cursor-pointer"
              style={{ border: '1.5px dashed #c8d4e0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              onClick={() => setRecognized(true)}
            >
              <div className="w-[60px] h-[60px] bg-[#eef3ff] rounded-[16px] flex items-center justify-center">
                <Camera size={28} strokeWidth={1.5} className="text-[#2b5fbf]"/>
              </div>
              <div className="text-center">
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[16px] text-[#1b2d4f] mb-[4px]">上传题目图片</p>
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#9baabb]">拍照 · 截图 · 拖图 · 手动输入</p>
              </div>
            </div>
            <div className="flex gap-[10px]">
              {[
                { label: '拍照上传', icon: Camera, bg: '#eef3ff', color: '#2b5fbf' },
                { label: '手动输入', icon: FileText, bg: '#eaf5ec', color: '#2e7a3c' },
              ].map(({ label, icon: Icon, bg, color }) => (
                <button
                  key={label}
                  onClick={() => setRecognized(true)}
                  className="flex-1 py-[14px] rounded-[12px] flex flex-col items-center gap-[6px] active:opacity-80"
                  style={{ backgroundColor: bg }}
                >
                  <Icon size={20} strokeWidth={1.8} style={{ color }}/>
                  <span className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[13px]" style={{ color }}>{label}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          /* OCR result */
          <>
            {/* Image preview placeholder */}
            <div
              className="bg-[#e8eef6] rounded-[12px] h-[120px] mb-[14px] flex items-center justify-center"
              style={{ border: '0.5px solid rgba(0,0,0,0.06)' }}
            >
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#9baabb]">题目图片已上传</p>
            </div>

            {/* OCR result form */}
            <div className="bg-white rounded-[14px] p-[16px] mb-[12px]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div className="flex items-center justify-between mb-[12px]">
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">识别结果</p>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="text-[#2b5fbf] text-[13px] font-['Noto_Sans_SC:Medium',sans-serif]"
                >
                  {editMode ? '完成编辑' : '手动修改'}
                </button>
              </div>

              {[
                { label: '题型', value: '单项选择题' },
                { label: '知识点', value: '粮食安全 · 农业政策' },
                { label: '用户答案', value: 'B' },
                { label: '正确答案', value: 'A' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-[10px] mb-[10px]">
                  <p className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[13px] text-[#9baabb] w-[70px] flex-shrink-0 pt-[1px]">{label}</p>
                  {editMode ? (
                    <div className="flex-1 bg-[#f5f8fc] rounded-[8px] px-[10px] py-[8px] border border-[#dce5f0]">
                      <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#1b2d4f]">{value}</p>
                    </div>
                  ) : (
                    <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#2c3e52] flex-1">{value}</p>
                  )}
                </div>
              ))}

              <div className="h-[0.5px] bg-[#f0f0f0] my-[12px]"/>

              <div>
                <p className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[13px] text-[#9baabb] mb-[6px]">题干</p>
                <div className={`rounded-[8px] px-[12px] py-[10px] ${editMode ? 'bg-[#f5f8fc] border border-[#dce5f0]' : 'bg-[#f8fafc]'}`}>
                  <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#2c3e52] leading-[24px]">
                    下列哪项最能体现材料中"粮食安全"的政策导向？
                  </p>
                </div>
              </div>

              <div className="mt-[10px]">
                <p className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[13px] text-[#9baabb] mb-[6px]">选项</p>
                {['A. 推动农业科技赋能，提高粮食综合生产能力', 'B. 减少基层治理投入，降低公共服务成本', 'C. 以城市更新替代乡村建设', 'D. 主要依靠进口保障粮食供给'].map((opt, i) => (
                  <div
                    key={i}
                    className={`rounded-[8px] px-[12px] py-[8px] mb-[6px] ${opt.startsWith('A') ? 'border border-[#2e7a3c] bg-[#e8f5e9]' : editMode ? 'bg-[#f5f8fc] border border-[#dce5f0]' : 'bg-[#f8fafc]'}`}
                  >
                    <p className={`font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] leading-[22px] ${opt.startsWith('A') ? 'text-[#2e7a3c]' : 'text-[#2c3e52]'}`}>{opt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-[8px]">
              <button
                onClick={() => navigate('wrong-detail')}
                className="w-full py-[13px] rounded-[12px] bg-[#1e3a5f] text-white font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[15px] active:opacity-80"
                style={{ boxShadow: '0 2px 6px rgba(30,58,95,0.3)' }}
              >
                交给 AI 解析
              </button>
              <div className="flex gap-[8px]">
                <button
                  className="flex-1 py-[11px] rounded-[12px] bg-white font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[14px] text-[#1e3a5f] active:opacity-80 border border-[#dce5f0]"
                >
                  确认识别
                </button>
                <button
                  className="flex-1 py-[11px] rounded-[12px] bg-white font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[14px] text-[#6b7e94] active:opacity-80 border border-[#dce5f0]"
                >
                  重新识别
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <BottomNav activeTab="wrongbank" onTabChange={onTabChange} />
    </div>
  );
}

// ─── Page 8: Wrong Detail ─────────────────────────────────────────────────────

export function WrongDetailPage({ navigate, goBack, onTabChange }: Props) {
  const [activeSkill, setActiveSkill] = useState('基础拆解');
  const skills = ['基础拆解', '速解技巧', '考场策略', '严格纠错'];
  const [mastered, setMastered] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-hidden">
      <IOSStatusBar />
      <BackNav title="错题解析" onBack={goBack}
        right={
          <span className="text-[11px] font-['Noto_Sans_SC:Regular',sans-serif] text-[#9baabb] bg-[#eaf5ec] px-[8px] py-[3px] rounded-[20px]">
            保存至：常识时政
          </span>
        }
      />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[8px]">
        {/* Question */}
        <div className="bg-white rounded-[14px] p-[16px] mb-[12px]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-[8px] mb-[10px]">
            <Tag label="单选题" bg="#f0f0f8" color="#6b7e94"/>
            <Tag label="常识时政" bg="#eaf5ec" color="#2e7a3c"/>
          </div>
          <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] text-[#1b2d4f] leading-[26px] mb-[14px]">
            下列哪项最能体现材料中"粮食安全"的政策导向？
          </p>
          {['A. 推动农业科技赋能，提高粮食综合生产能力', 'B. 减少基层治理投入，降低公共服务成本', 'C. 以城市更新替代乡村建设', 'D. 主要依靠进口保障粮食供给'].map((opt, i) => {
            const isCorrect = i === 0;
            const isWrong = i === 1;
            return (
              <div
                key={i}
                className={`px-[12px] py-[10px] rounded-[10px] mb-[6px] font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] leading-[22px] ${
                  isCorrect ? 'bg-[#e8f5e9] text-[#2e7a3c] border border-[#2e7a3c]'
                  : isWrong ? 'bg-[#fff3f0] text-[#c84b2f] border border-[#c84b2f]'
                  : 'bg-[#f8fafc] text-[#4a5e73] border border-transparent'
                }`}
              >
                {opt}
                {isCorrect && <span className="ml-[6px] text-[12px]">✓ 正确答案</span>}
                {isWrong && <span className="ml-[6px] text-[12px]">✗ 你的选择</span>}
              </div>
            );
          })}
        </div>

        {/* AI Analysis */}
        <div className="bg-white rounded-[14px] overflow-hidden mb-[12px]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center justify-between px-[16px] pt-[14px] pb-[10px] border-b border-[#f0f0f0]">
            <div className="flex items-center gap-[8px]">
              <div className="w-[24px] h-[24px] rounded-full bg-[#eef3ff] flex items-center justify-center">
                <span className="text-[9px] font-bold text-[#2b5fbf]">AI</span>
              </div>
              <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">AI 解析</p>
            </div>
            {/* Skill tabs */}
            <div className="flex gap-[4px] overflow-x-auto no-scrollbar">
              {skills.map(skill => (
                <button
                  key={skill}
                  onClick={() => setActiveSkill(skill)}
                  className={`px-[8px] py-[3px] rounded-[12px] text-[11px] whitespace-nowrap flex-shrink-0 font-['Noto_Sans_SC:Medium',sans-serif] font-medium active:opacity-70 ${
                    activeSkill === skill
                      ? 'bg-[#1e3a5f] text-white'
                      : 'bg-[#f0f4f8] text-[#6b7e94]'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="p-[16px] space-y-[12px]">
            <div>
              <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[13px] text-[#1b2d4f] mb-[6px]">解题步骤</p>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#4a5e73] leading-[22px]">
                题目问"粮食安全政策导向"，关键词是"藏粮于地、藏粮于技"和"科技赋能"。A项直接体现农业科技赋能，符合材料核心。B、C、D项均与粮食安全政策无关或相悖。
              </p>
            </div>
            <div className="h-[0.5px] bg-[#f0f0f0]"/>
            <div>
              <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[13px] text-[#c84b2f] mb-[6px]">错因分析</p>
              <div className="bg-[#fff3f0] rounded-[8px] p-[10px]">
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#c84b2f] leading-[22px]">
                  误选B项，原因是将"农业政策"与"基层治理"混淆。粮食安全政策的核心是"提升生产能力"，而非"降低成本"。
                </p>
              </div>
            </div>
            <div className="h-[0.5px] bg-[#f0f0f0]"/>
            <div>
              <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[13px] text-[#c09a30] mb-[6px]">同类题提醒</p>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#4a5e73] leading-[22px]">
                农业科技类选题，优先选择"科技赋能"、"生产能力"相关选项，排除"依赖进口"类干扰项。
              </p>
            </div>
            <div className="h-[0.5px] bg-[#f0f0f0]"/>
            <div>
              <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[13px] text-[#2b5fbf] mb-[6px]">下次复盘建议</p>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#4a5e73] leading-[22px]">
                建议明天复盘"粮食安全政策"知识点，重点记忆"藏粮于地、藏粮于技"的具体内涵。
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-[8px]">
          <button
            className="w-full py-[13px] rounded-[12px] bg-[#1e3a5f] text-white font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[15px] active:opacity-80"
            style={{ boxShadow: '0 2px 6px rgba(30,58,95,0.3)' }}
          >
            加入趁热打铁
          </button>
          <div className="flex gap-[8px]">
            <button
              className="flex-1 py-[11px] rounded-[12px] bg-white font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[14px] text-[#1e3a5f] active:opacity-80 border border-[#dce5f0]"
            >
              保存到文件夹
            </button>
            <button
              onClick={() => setMastered(!mastered)}
              className={`flex-1 py-[11px] rounded-[12px] font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[14px] active:opacity-80 border ${
                mastered ? 'bg-[#eaf5ec] text-[#2e7a3c] border-[#2e7a3c]' : 'bg-white text-[#6b7e94] border-[#dce5f0]'
              }`}
            >
              {mastered ? '✓ 已掌握' : '标记已掌握'}
            </button>
          </div>
        </div>
      </div>

      <AIInputBar placeholder="问AI，继续追问此题…" />
      <BottomNav activeTab="wrongbank" onTabChange={onTabChange} />
    </div>
  );
}
