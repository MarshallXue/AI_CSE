import React, { useState } from 'react';
import { Camera, Check, ChevronDown, ChevronLeft, Quote, ScanText, SendHorizontal, Sparkles } from 'lucide-react';
import chaogeIcon from '../../assets/logos/chaoge-app-icon.jpg';
import claudeLogo from '../../assets/logos/claude-logo.svg';
import deepSeekLogo from '../../assets/logos/deepseek-logo.svg';
import fenbiIcon from '../../assets/logos/fenbi-app-icon.jpg';
import geminiLogo from '../../assets/logos/gemini-logo.svg';
import glmLogo from '../../assets/logos/glm-logo.svg';
import huashengAvatar from '../../assets/logos/huasheng13-avatar.jpg';
import kimiLogo from '../../assets/logos/kimi-logo.svg';
import mimoLogo from '../../assets/logos/mimo-logo.svg';
import openAiLogo from '../../assets/logos/openai-logo.svg';
import qwenLogo from '../../assets/logos/qwen-logo.svg';

export type PageId =
  | 'today' | 'news-detail' | 'ai-read' | 'practice' | 'export-preview'
  | 'wrongbank' | 'folder-detail' | 'ocr' | 'wrong-detail'
  | 'review' | 'flashcard-review' | 'hot-practice' | 'daily-report'
  | 'profile' | 'membership' | 'export-history';

export type NavigateFn = (page: PageId) => void;

export function IOSStatusBar() {
  return (
    <div className="flex items-center justify-between px-[22px] h-[54px] flex-shrink-0">
      <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[15.5px] leading-[15.5px] text-[#1b2d4f] tracking-[-0.3px]">9:41</p>
      <div className="flex items-center gap-[6px]">
        <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
          <rect x="0" y="7" width="3" height="6" rx="0.8" fill="#1B2D4F" opacity="0.4"/>
          <rect x="4.5" y="4.5" width="3" height="8.5" rx="0.8" fill="#1B2D4F" opacity="0.6"/>
          <rect x="9" y="2" width="3" height="11" rx="0.8" fill="#1B2D4F" opacity="0.8"/>
          <rect x="13.5" y="0" width="3" height="13" rx="0.8" fill="#1B2D4F"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="11" r="1.3" fill="#1B2D4F"/>
          <path d="M4.5 7.5C5.5 6.5 6.7 5.9 8 5.9s2.5.6 3.5 1.6" stroke="#1B2D4F" strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
          <path d="M1.5 4.5C3.3 2.8 5.5 1.8 8 1.8s4.7 1 6.5 2.7" stroke="#1B2D4F" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
        </svg>
        <div className="flex items-center">
          <div className="border border-[#1b2d4f] opacity-80 rounded-[3px] h-[13px] w-[25px] flex items-center px-[2.5px] gap-[0]">
            <div className="bg-[#1b2d4f] h-[8px] rounded-[1.5px]" style={{width:'65%'}}/>
          </div>
          <div className="bg-[#1b2d4f] h-[5px] w-[2px] rounded-r-[1px] opacity-60 ml-[1px]"/>
        </div>
      </div>
    </div>
  );
}

export function BackNav({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack: () => void;
  right?: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center justify-between h-[44px] flex-shrink-0 px-[4px]">
      <button
        onClick={onBack}
        className="flex items-center gap-[1px] px-[8px] py-[8px] active:opacity-60"
      >
        <ChevronLeft size={22} strokeWidth={2.2} className="text-[#2b5fbf]" />
        <span className="font-['Noto_Sans_SC:Regular',sans-serif] font-normal text-[17px] text-[#2b5fbf]">返回</span>
      </button>
      <span className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[17px] text-[#1b2d4f] absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
        {title}
      </span>
      <div className="px-[16px] min-w-[70px] flex justify-end text-[#2b5fbf]">
        {right ?? null}
      </div>
    </div>
  );
}

export function Tag({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span
      className="px-[8px] py-[3px] rounded-[8px] text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] font-medium whitespace-nowrap inline-block"
      style={{ backgroundColor: bg, color }}
    >
      {label}
    </span>
  );
}

export function ExamTag({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-[6px]">
      <div className="w-[4px] h-[4px] rounded-full bg-[#c09a30] flex-shrink-0" />
      <span className="bg-[#fbf4e0] text-[#8a6a10] text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] font-medium px-[7px] py-[2px] rounded-[4px] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export function AIInputBar({
  onFocus,
  placeholder,
}: {
  onFocus?: () => void;
  placeholder?: string;
}) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [lastPrompt, setLastPrompt] = useState('');
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const [picker, setPicker] = useState<'skill' | 'model' | null>(null);
  const [activeSkill, setActiveSkill] = useState('huasheng-shenlun');
  const [activeModel, setActiveModel] = useState('deepseek-v4-preview');
  const delegatesToPage = Boolean(onFocus);
  const focusMode = focused || actionMenuOpen || picker !== null;

  const skillOptions = [
    { id: 'huasheng-shenlun', teacher: '花生十三', label: '申论拆解', desc: '材料概括、规范表达、答案框架', avatarSrc: huashengAvatar, avatarAlt: '花生十三头像' },
    { id: 'chaoge-xingce', teacher: '超格', label: '行测速解', desc: '数量、判断、资料分析的解题路径', avatarSrc: chaogeIcon, avatarAlt: '超格教育图标' },
    { id: 'fenbi-basic', teacher: '粉笔', label: '基础精讲', desc: '概念扫盲、错因回放、知识点复盘', avatarSrc: fenbiIcon, avatarAlt: '粉笔图标' },
    { id: 'custom-exam', teacher: '自建', label: '我的考公技能', desc: '按你的笔记和错题训练个人策略', avatarSrc: fenbiIcon, avatarAlt: '自建技能图标' },
  ];

  const modelOptions = [
    { id: 'deepseek-v4-preview', label: 'DeepSeek-V4', desc: '最新预览模型，适合推理、拆题和错因分析', logoSrc: deepSeekLogo, logoAlt: 'DeepSeek logo' },
    { id: 'qwen3-7-max', label: 'Qwen3.7-Max', desc: '最新旗舰模型，适合中文表达、讲义整理和改写', logoSrc: qwenLogo, logoAlt: 'Qwen logo' },
    { id: 'claude-opus-4-8', label: 'Claude Opus 4.8', desc: '最新 Claude，适合长文理解、结构化分析和写作润色', logoSrc: claudeLogo, logoAlt: 'Claude logo' },
    { id: 'gpt-5-5', label: 'GPT-5.5', desc: '最新 GPT，适合通用问答、图文理解和综合生成', logoSrc: openAiLogo, logoAlt: 'OpenAI logo' },
    { id: 'gemini-3-1-pro', label: 'Gemini 3.1 Pro', desc: '最新 Gemini，适合多模态理解、资料归纳和检索辅助', logoSrc: geminiLogo, logoAlt: 'Gemini logo' },
    { id: 'kimi-k2-6', label: 'Kimi K2.6', desc: '最新 Kimi，适合长上下文、资料阅读和中文材料整理', logoSrc: kimiLogo, logoAlt: 'Kimi logo' },
    { id: 'glm-5-2', label: 'GLM-5.2', desc: '最新 GLM，适合中文问答、逻辑推理和知识讲解', logoSrc: glmLogo, logoAlt: 'GLM logo' },
    { id: 'mimo-v2-5-pro', label: 'MiMo-V2.5-Pro', desc: '最新 MiMo，适合数学推理、轻量分析和模型对比', logoSrc: mimoLogo, logoAlt: 'MiMo logo' },
  ];

  const selectedSkill = skillOptions.find((skill) => skill.id === activeSkill) ?? skillOptions[0];
  const selectedModel = modelOptions.find((model) => model.id === activeModel) ?? modelOptions[0];

  const quickActions = [
    { label: '拍照', Icon: Camera },
    { label: '截图', Icon: ScanText },
    { label: '引用文字', Icon: Quote },
  ];

  const commands = [
    { key: '/解析', text: '拆解材料观点' },
    { key: '/出题', text: '生成配套练习' },
    { key: '/讲义', text: '整理导出版式' },
  ];

  const submitPrompt = () => {
    if (delegatesToPage) {
      onFocus?.();
      return;
    }

    const cleanQuery = query.trim();
    if (!cleanQuery) return;
    setLastPrompt(cleanQuery);
    setQuery('');
    setFocused(false);
  };

  return (
    <div className={`relative flex-shrink-0 px-[16px] py-[8px] ${focusMode ? 'z-[80]' : 'z-0'}`}>
      {focusMode && <div className="pointer-events-none fixed inset-0 z-[60] bg-[rgba(18,31,52,0.32)]" />}
      <div
        className={`relative rounded-[24px] transition-shadow duration-200 ${
          focusMode ? 'z-[80] shadow-[0_18px_48px_rgba(18,31,52,0.24)]' : ''
        }`}
      >
        {(focused || actionMenuOpen || lastPrompt) && (
          <div className="mb-[7px] flex flex-col gap-[6px]">
            {actionMenuOpen && (
              <div className="flex gap-[6px] overflow-x-auto no-scrollbar">
                {quickActions.map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    className="app-pressable flex h-[28px] flex-shrink-0 items-center gap-[4px] rounded-full border border-[#dce6f2] bg-white px-[9px] font-['Noto_Sans_SC:Medium',sans-serif] text-[11.5px] text-[#52657d] shadow-[0_5px_14px_rgba(31,58,95,0.05)]"
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    <Icon size={12} strokeWidth={1.7} />
                    {label}
                  </button>
                ))}
              </div>
            )}
            {focused && (
              <div className="rounded-[16px] border border-[#dbe5f2] bg-white p-[6px] shadow-[0_10px_28px_rgba(31,58,95,0.11)]">
                <div className="flex gap-[6px]">
                  <button
                    type="button"
                    className={`app-pressable flex h-[34px] min-w-0 flex-1 items-center gap-[5px] rounded-full border px-[9px] text-left ${
                      picker === 'skill' ? 'border-[#1e3a5f] bg-[#eef4ff]' : 'border-[#e3ebf5] bg-[#f8fafc]'
                    }`}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => setPicker(picker === 'skill' ? null : 'skill')}
                  >
                    <span className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-[#dce6f2]">
                      <img src={selectedSkill.avatarSrc} alt={selectedSkill.avatarAlt} className="h-full w-full object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-['Noto_Sans_SC:Bold',sans-serif] text-[11.5px] text-[#1e3a5f]">{selectedSkill.teacher}</span>
                    </span>
                    <ChevronDown size={12} strokeWidth={1.9} className="flex-shrink-0 text-[#8da0b6]" />
                  </button>
                  <button
                    type="button"
                    className={`app-pressable flex h-[34px] min-w-0 flex-1 items-center gap-[5px] rounded-full border px-[9px] text-left ${
                      picker === 'model' ? 'border-[#1e3a5f] bg-[#eef4ff]' : 'border-[#e3ebf5] bg-[#f8fafc]'
                    }`}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => setPicker(picker === 'model' ? null : 'model')}
                  >
                    <span className="flex h-[20px] w-[24px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-white">
                      <img src={selectedModel.logoSrc} alt={selectedModel.logoAlt} className="max-h-[16px] max-w-[22px] object-contain" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-['Noto_Sans_SC:Bold',sans-serif] text-[11.5px] text-[#1e3a5f]">{selectedModel.label}</span>
                      <span className="block truncate font-['Noto_Sans_SC:Regular',sans-serif] text-[10.5px] text-[#6f8196]">最新模型</span>
                    </span>
                    <ChevronDown size={12} strokeWidth={1.9} className="flex-shrink-0 text-[#8da0b6]" />
                  </button>
                </div>
                {picker && (
                  <div className="mt-[6px] max-h-[142px] overflow-y-auto rounded-[13px] bg-[#f6f8fb] p-[4px]">
                    {(picker === 'skill' ? skillOptions : modelOptions).map((option) => {
                      const isActive = picker === 'skill' ? option.id === activeSkill : option.id === activeModel;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          className={`app-pressable flex w-full items-start gap-[7px] rounded-[10px] px-[8px] py-[6px] text-left ${
                            isActive ? 'bg-white shadow-[0_6px_14px_rgba(31,58,95,0.08)]' : ''
                          }`}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => {
                            if (picker === 'skill') setActiveSkill(option.id);
                            if (picker === 'model') setActiveModel(option.id);
                            setPicker(null);
                          }}
                        >
                          <span className="mt-[1px] flex h-[24px] w-[24px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-[#dce6f2]">
                            {'avatarSrc' in option ? (
                              <img src={option.avatarSrc} alt={option.avatarAlt} className="h-full w-full object-cover" />
                            ) : (
                              <img src={option.logoSrc} alt={option.logoAlt} className="max-h-[16px] max-w-[20px] object-contain" />
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-['Noto_Sans_SC:Bold',sans-serif] text-[11.5px] text-[#1e3a5f]">
                              {'teacher' in option ? `${option.teacher} · ${option.label}` : option.label}
                            </span>
                            <span className="mt-[1px] block font-['Noto_Sans_SC:Regular',sans-serif] text-[10.5px] leading-[15px] text-[#6f8196]">{option.desc}</span>
                          </span>
                          {isActive && (
                            <Check size={13} strokeWidth={2.2} className="mt-[3px] flex-shrink-0 text-[#1e3a5f]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            {focused && query.startsWith('/') && (
              <div className="rounded-[14px] border border-[#dbe5f2] bg-white p-[6px] shadow-[0_14px_36px_rgba(31,58,95,0.14)]">
                {commands.map((command) => (
                  <button
                    key={command.key}
                    type="button"
                    className="app-pressable flex w-full items-center justify-between rounded-[10px] px-[10px] py-[8px] text-left"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      setQuery(`${command.key} `);
                    }}
                  >
                    <span className="font-['Noto_Sans_SC:Bold',sans-serif] text-[12px] text-[#1e3a5f]">{command.key}</span>
                    <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#6f8196]">{command.text}</span>
                  </button>
                ))}
              </div>
            )}
            {lastPrompt && !focused && (
              <div className="rounded-[14px] border border-[#dbe5f2] bg-white px-[12px] py-[9px] shadow-[0_10px_24px_rgba(31,58,95,0.08)]">
                <p className="font-['Noto_Sans_SC:Medium',sans-serif] text-[12px] text-[#1e3a5f]">已加入 AI 任务队列</p>
                <p className="mt-[2px] truncate font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#6f8196]">{lastPrompt}</p>
              </div>
            )}
          </div>
        )}
        <div
          className={`flex min-h-[54px] w-full items-center gap-[10px] rounded-[22px] border bg-white px-[15px] pr-[9px] shadow-[0_10px_26px_rgba(31,58,95,0.09)] transition-all duration-200 ${
            focused ? 'border-[#2b5fbf] ring-4 ring-[#dce8ff]' : 'border-[#dbe5f2]'
          }`}
        >
          <button
            type="button"
            className={`app-pressable flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center rounded-full transition-colors ${
              actionMenuOpen ? 'bg-[#1e3a5f] text-white' : 'bg-[#eef4ff] text-[#1e3a5f]'
            }`}
            onMouseDown={(event) => event.preventDefault()}
            onClick={(event) => {
              event.currentTarget.blur();
              setActionMenuOpen((open) => !open);
              setFocused(false);
              setPicker(null);
            }}
            aria-label="展开拍照和引用工具"
          >
            <Sparkles size={16} strokeWidth={1.8} />
          </button>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => {
              setFocused(true);
              setActionMenuOpen(false);
              setPicker(null);
            }}
            onBlur={() => setFocused(false)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') submitPrompt();
            }}
            placeholder={placeholder ?? '问AI，选中文字、拍照或截图都可以'}
            className="min-w-0 flex-1 bg-transparent font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] leading-none text-[#1b2d4f] caret-[#2b5fbf] outline-none placeholder:text-[#7a8798]"
          />
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={submitPrompt}
            className={`app-pressable flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center rounded-full transition-colors ${
              query.trim() ? 'bg-[#1e3a5f] text-white' : 'bg-[#eaf1ff] text-[#1e3a5f]'
            }`}
            aria-label="发送 AI 问题"
          >
            <SendHorizontal size={15} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function BottomNav({
  activeTab,
  onTabChange,
}: {
  activeTab: 'today' | 'wrongbank' | 'review' | 'profile';
  onTabChange: (tab: 'today' | 'wrongbank' | 'review' | 'profile') => void;
}) {
  const items = [
    ['today', '今日', TodayNavIcon],
    ['wrongbank', '错题库', WrongBankNavIcon],
    ['review', '复盘', ReviewNavIcon],
    ['profile', '我的', ProfileNavIcon],
  ] as const;

  return (
    <div
      className="flex-shrink-0 h-[86px] border-t border-[#d9e3ef] bg-[rgba(246,248,251,0.9)] backdrop-blur-[20px]"
    >
      <div className="mx-[13px] mt-[9px] grid grid-cols-4 gap-[5px] rounded-[22px] bg-[#e7edf5] p-[4px]">
        {items.map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`app-pressable flex h-[43px] items-center justify-center gap-[5px] rounded-[18px] px-[6px] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2b5fbf] ${
              activeTab === id
                ? 'bg-white text-[#1e3a5f] shadow-[0_8px_18px_rgba(31,58,95,0.12)]'
                : 'text-[#8ba0b7]'
            }`}
            aria-current={activeTab === id ? 'page' : undefined}
          >
            <Icon active={activeTab === id} />
            <span
              className="font-['Noto_Sans_SC:Medium',sans-serif] text-[11px]"
            >
              {label}
            </span>
          </button>
        ))}
      </div>
      <div className="flex justify-center pt-[6px]">
        <div className="w-[134px] h-[5px] rounded-full" style={{ background: 'rgba(27,45,79,0.2)' }} />
      </div>
    </div>
  );
}

function TodayNavIcon({ active }: { active: boolean }) {
  const c = active ? '#1E3A5F' : '#AABCCC';
  const w = active ? 1.92 : 1.47;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 6.4v12.8" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 10.8L11 4.3l6.5 6.5" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function WrongBankNavIcon({ active }: { active: boolean }) {
  const c = active ? '#1E3A5F' : '#AABCCC';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="4" width="16" height="14" rx="2" stroke={c} strokeWidth="1.47"/>
      <path d="M3 9h16M7 2v4M15 2v4" stroke={c} strokeWidth="1.47" strokeLinecap="round"/>
      <path d="M7 13.5h2M12 13.5h4" stroke={c} strokeWidth="1.47" strokeLinecap="round"/>
    </svg>
  );
}

function ReviewNavIcon({ active }: { active: boolean }) {
  const c = active ? '#1E3A5F' : '#AABCCC';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="8" stroke={c} strokeWidth="1.47"/>
      <path d="M11 7v4l3 2.5" stroke={c} strokeWidth="1.47" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ProfileNavIcon({ active }: { active: boolean }) {
  const c = active ? '#1E3A5F' : '#AABCCC';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="8" r="4" stroke={c} strokeWidth="1.47"/>
      <path d="M3 19c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke={c} strokeWidth="1.47" strokeLinecap="round"/>
    </svg>
  );
}

export function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-white rounded-[12px] mx-[16px] ${className}`}
      style={{ boxShadow: '0px 1px 6px rgba(0,0,0,0.05), 0px 0px 0px 0.5px rgba(0,0,0,0.05)' }}
    >
      {children}
    </div>
  );
}

export function SectionHeader({ title, className = '' }: { title: string; className?: string }) {
  return (
    <p className={`font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[15px] text-[#1b2d4f] tracking-[-0.2px] ${className}`}>
      {title}
    </p>
  );
}

export function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" stroke="#B0BEC8" strokeWidth="1"/>
      <path d="M6 3v3l2 1.5" stroke="#B0BEC8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function BookmarkIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 2h8a1 1 0 011 1v10.5l-5-3-5 3V3a1 1 0 011-1z"
        stroke="#B0BEC8"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? '#B0BEC8' : 'none'}
      />
    </svg>
  );
}

export function ActionButton({
  label,
  primary = false,
  onClick,
  className = '',
}: {
  label: string;
  primary?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`app-pressable min-h-[40px] px-[18px] py-[10px] rounded-[12px] font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2b5fbf] ${
        primary
          ? 'bg-[#1e3a5f] text-white hover:bg-[#274c7a]'
          : 'bg-[#eef3fb] text-[#1e3a5f] hover:bg-[#e1ebf8]'
      } ${className}`}
      style={primary ? { boxShadow: '0px 8px 18px rgba(30,58,95,0.18)' } : {}}
    >
      {label}
    </button>
  );
}
