import React from 'react';
import { ChevronLeft } from 'lucide-react';

export type PageId =
  | 'today' | 'news-detail' | 'ai-read' | 'practice' | 'export-preview'
  | 'wrongbank' | 'folder-detail' | 'ocr' | 'wrong-detail'
  | 'review' | 'hot-practice' | 'daily-report'
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
  return (
    <div className="flex-shrink-0 flex justify-center items-center px-[18px] py-[8px]">
      <div
        className="bg-white rounded-[20px] h-[52px] w-full flex items-center gap-[10px] px-[17px] pr-[11px] cursor-pointer active:opacity-90"
        style={{ border: '0.833px solid #e2e8f0', boxShadow: '0px 2px 5px rgba(0,0,0,0.06)' }}
        onClick={onFocus}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2a3 3 0 00-3 3v5a3 3 0 006 0V5a3 3 0 00-3-3z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 10a6 6 0 0012 0M10 16v3M7.5 19h5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p className="flex-1 text-[#7a8798] text-[14px] font-['Noto_Sans_SC:Regular',sans-serif] font-normal truncate">
          {placeholder ?? '问AI，选中文字、拍照或截图都可以'}
        </p>
        <div className="bg-[#eaf1ff] rounded-full w-[32px] h-[32px] flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 12V4M4.5 7.5L8 4l3.5 3.5" stroke="#1F5EFF" strokeWidth="1.47" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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
  return (
    <div
      className="flex-shrink-0 h-[83px]"
      style={{ background: 'rgba(246,248,251,0.96)', borderTop: '0.833px solid rgba(0,0,0,0.08)' }}
    >
      <div className="flex items-start justify-around pt-[10px]">
        {([
          ['today', '今日', TodayNavIcon],
          ['wrongbank', '错题库', WrongBankNavIcon],
          ['review', '复盘', ReviewNavIcon],
          ['profile', '我的', ProfileNavIcon],
        ] as const).map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className="flex flex-col items-center gap-[3px] px-[8px] py-[2px] min-w-[56px] active:opacity-70"
          >
            <Icon active={activeTab === id} />
            <span
              className="text-[10.5px] tracking-[0.2px]"
              style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                fontWeight: activeTab === id ? 700 : 400,
                color: activeTab === id ? '#1e3a5f' : '#aabccc',
              }}
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
      className={`px-[18px] py-[10px] rounded-[10px] font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] active:opacity-80 ${
        primary
          ? 'bg-[#1e3a5f] text-white'
          : 'bg-[#eef3fb] text-[#1e3a5f]'
      } ${className}`}
      style={primary ? { boxShadow: '0px 1px 3px rgba(30,58,95,0.25)' } : {}}
    >
      {label}
    </button>
  );
}
