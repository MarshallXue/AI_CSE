import { useState } from 'react';
import { ChevronRight, Download, RefreshCw } from 'lucide-react';
import {
  IOSStatusBar, BackNav, BottomNav,
  NavigateFn,
} from './shared';

interface Props {
  navigate: NavigateFn;
  goBack: () => void;
  onTabChange: (tab: 'today' | 'wrongbank' | 'review' | 'profile') => void;
}

// ─── Page 12: Profile Home ────────────────────────────────────────────────────

export function ProfileHomePage({ navigate, goBack, onTabChange }: Props) {
  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-hidden">
      <IOSStatusBar />

      {/* Header */}
      <div className="px-[20px] pt-[4px] pb-[16px] flex-shrink-0">
        <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[22px] text-[#1b2d4f] tracking-[-0.3px]">我的</p>
      </div>

      <div className="flex-1 overflow-y-auto px-[16px] pb-[8px]">
        {/* User card */}
        <div className="bg-[#1e3a5f] rounded-[16px] p-[20px] mb-[14px]"
          style={{ boxShadow: '0 4px 16px rgba(30,58,95,0.25)' }}>
          <div className="flex items-center gap-[14px]">
            <div className="w-[52px] h-[52px] rounded-full bg-[rgba(255,255,255,0.2)] flex items-center justify-center flex-shrink-0">
              <span className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[20px] text-white">岸</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-[8px]">
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[17px] text-white">备考用户</p>
                <span className="bg-[rgba(255,255,255,0.2)] text-white text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] px-[8px] py-[2px] rounded-[20px]">
                  会员中
                </span>
              </div>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[rgba(255,255,255,0.7)] mt-[2px]">
                备考中 · 国考/省考
              </p>
            </div>
          </div>
          {/* Today learning status */}
          <div className="mt-[16px] pt-[14px] border-t border-[rgba(255,255,255,0.12)]">
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[rgba(255,255,255,0.6)] mb-[8px]">今日学习状态</p>
            <div className="flex items-center gap-[6px]">
              <div className="flex-1 bg-[rgba(255,255,255,0.15)] rounded-full h-[6px] overflow-hidden">
                <div className="bg-white h-full rounded-full" style={{width:'65%'}}/>
              </div>
              <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[rgba(255,255,255,0.7)]">65%</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-[8px] mb-[14px]">
          {[
            { label: '连续学习', value: '14天', color: '#2b5fbf' },
            { label: '累计错题', value: '154', color: '#c84b2f' },
            { label: '累计精读', value: '28篇', color: '#2e7a3c' },
            { label: '导出讲义', value: '12份', color: '#c09a30' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-[12px] p-[10px] text-center" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[16px]" style={{ color }}>{value}</p>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[10px] text-[#9baabb] mt-[2px] leading-[15px]">{label}</p>
            </div>
          ))}
        </div>

        {/* Function entries */}
        <div className="bg-white rounded-[14px] mb-[12px] overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {[
            { icon: '👑', label: '会员权益', sublabel: '年度会员 · 到期2027.06', action: () => navigate('membership'), accent: '#c09a30' },
            { icon: '📤', label: '导出记录', sublabel: '共 12 份', action: () => navigate('export-history') },
            { icon: '📁', label: '资料夹管理', sublabel: '6 个文件夹', action: undefined },
            { icon: '📊', label: '学习数据', sublabel: '查看详细分析', action: undefined },
          ].map(({ icon, label, sublabel, action, accent }, i) => (
            <button
              key={label}
              onClick={action}
              className={`w-full flex items-center justify-between px-[16px] py-[14px] active:bg-[#f8f8f8] text-left ${
                i < 3 ? 'border-b border-[#f5f5f5]' : ''
              }`}
            >
              <div className="flex items-center gap-[12px]">
                <span className="text-[20px] w-[28px] text-center">{icon}</span>
                <div>
                  <p className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[15px] text-[#1b2d4f]">{label}</p>
                  {sublabel && (
                    <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#9baabb] mt-[1px]">{sublabel}</p>
                  )}
                </div>
              </div>
              <ChevronRight size={16} strokeWidth={2} className="text-[#c8d4e0]"/>
            </button>
          ))}
        </div>

        {/* Settings */}
        <div className="bg-white rounded-[14px] mb-[12px] overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {[
            { icon: '⚙️', label: '设置', sublabel: '通知 · 隐私 · 字体大小' },
            { icon: '❓', label: '帮助与反馈', sublabel: '常见问题' },
          ].map(({ icon, label, sublabel }, i) => (
            <button
              key={label}
              className={`w-full flex items-center justify-between px-[16px] py-[14px] active:bg-[#f8f8f8] text-left ${i < 1 ? 'border-b border-[#f5f5f5]' : ''}`}
            >
              <div className="flex items-center gap-[12px]">
                <span className="text-[20px] w-[28px] text-center">{icon}</span>
                <div>
                  <p className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[15px] text-[#1b2d4f]">{label}</p>
                  {sublabel && (
                    <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#9baabb] mt-[1px]">{sublabel}</p>
                  )}
                </div>
              </div>
              <ChevronRight size={16} strokeWidth={2} className="text-[#c8d4e0]"/>
            </button>
          ))}
        </div>
      </div>

      <BottomNav activeTab="profile" onTabChange={onTabChange} />
    </div>
  );
}

// ─── Page 13: Membership ──────────────────────────────────────────────────────

export function MembershipPage({ navigate, goBack, onTabChange }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<'month' | 'quarter' | 'year'>('year');

  const plans = [
    { id: 'month' as const, label: '月度会员', price: '68', unit: '元/月', save: null },
    { id: 'quarter' as const, label: '季度会员', price: '168', unit: '元/季', save: '优惠 17%' },
    { id: 'year' as const, label: '年度会员', price: '468', unit: '元/年', save: '优惠 43%' },
  ];

  const benefits = [
    { icon: '📰', label: '每日时政精读', desc: '每日 4 篇官方材料精读解析' },
    { icon: '📖', label: '今日词汇', desc: '每日时政词汇学习与记忆' },
    { icon: '✏️', label: '配套练习生成', desc: 'AI 生成配套选择题与判断题' },
    { icon: '📄', label: 'PDF 讲义导出', desc: '高质量讲义一键导出，含解析版' },
    { icon: '🤖', label: 'AI 伴读', desc: '选中文字即可问AI，无次数限制' },
    { icon: '🔄', label: '错题智能复盘', desc: 'AI 分析错因，生成复盘建议' },
    { icon: '🔥', label: '趁热打铁强化', desc: '根据当日错题自动生成强化练习' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-hidden">
      <IOSStatusBar />
      <BackNav title="会员权益" onBack={goBack} />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[8px]">
        {/* Hero */}
        <div className="bg-[#1e3a5f] rounded-[16px] p-[20px] mb-[16px] text-center"
          style={{ boxShadow: '0 4px 16px rgba(30,58,95,0.25)' }}>
          <div className="w-[48px] h-[48px] rounded-full bg-[rgba(255,255,255,0.15)] flex items-center justify-center mx-auto mb-[10px]">
            <span className="text-[24px]">👑</span>
          </div>
          <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[20px] text-white mb-[4px]">岸岸通会员</p>
          <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[rgba(255,255,255,0.7)]">
            专注公考备考，高效学习工具
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-[14px] p-[16px] mb-[14px]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f] mb-[12px]">会员权益</p>
          <div className="space-y-[12px]">
            {benefits.map(({ icon, label, desc }) => (
              <div key={label} className="flex items-start gap-[12px]">
                <span className="text-[18px] mt-[1px] flex-shrink-0">{icon}</span>
                <div>
                  <p className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[14px] text-[#1b2d4f]">{label}</p>
                  <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#9baabb] mt-[1px]">{desc}</p>
                </div>
                <div className="ml-auto">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7.5" fill="#2e7a3c"/>
                    <path d="M5 8l2.5 2.5L11 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="mb-[14px]">
          <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f] mb-[10px]">选择套餐</p>
          <div className="space-y-[8px]">
            {plans.map(plan => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full text-left px-[16px] py-[14px] rounded-[14px] border-[1.5px] flex items-center justify-between active:opacity-90 ${
                  selectedPlan === plan.id
                    ? 'border-[#1e3a5f] bg-[#eef3fb]'
                    : 'border-[#e3e8f0] bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center gap-[8px]">
                    <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[15px] text-[#1b2d4f]">{plan.label}</p>
                    {plan.save && (
                      <span className="bg-[#c84b2f] text-white text-[10px] font-['Noto_Sans_SC:Bold',sans-serif] px-[6px] py-[1px] rounded-[4px]">
                        {plan.save}
                      </span>
                    )}
                  </div>
                  <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#9baabb] mt-[2px]">{plan.unit}</p>
                </div>
                <div className="text-right">
                  <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[22px] text-[#1b2d4f]">
                    ¥{plan.price}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          className="w-full py-[16px] rounded-[14px] bg-[#1e3a5f] text-white font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[16px] active:opacity-80 mb-[10px]"
          style={{ boxShadow: '0 4px 12px rgba(30,58,95,0.3)' }}
        >
          开通会员
        </button>
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#b0bec8] text-center">
          支持随时取消 · 安全加密支付
        </p>
      </div>

      <BottomNav activeTab="profile" onTabChange={onTabChange} />
    </div>
  );
}

// ─── Page 14: Export History ───────────────────────────────────────────────────

const exportRecords = [
  {
    id: 1, title: '今日讲义', date: '6月18日', type: '含解析版', format: 'PDF',
    subtitle: '农业农村部：夏粮丰收在望',
  },
  {
    id: 2, title: '新闻精读讲义', date: '6月17日', type: '练习版', format: 'PDF',
    subtitle: '数字政府建设新进展',
  },
  {
    id: 3, title: '错题复盘报告', date: '6月16日', type: '含解析版', format: 'PDF',
    subtitle: '常识时政专题',
  },
  {
    id: 4, title: '配套练习 PDF', date: '6月15日', type: '练习版', format: 'PDF',
    subtitle: '粮食安全专题',
  },
];

export function ExportHistoryPage({ navigate, goBack, onTabChange }: Props) {
  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-hidden">
      <IOSStatusBar />
      <BackNav title="导出记录" onBack={goBack} />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[8px]">
        {/* Summary */}
        <div className="flex items-center justify-between bg-white rounded-[14px] px-[16px] py-[14px] mb-[14px]"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div>
            <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[17px] text-[#1b2d4f]">共 12 份导出记录</p>
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#9baabb] mt-[2px]">本月已导出 4 份</p>
          </div>
          <div className="flex items-center gap-[6px]">
            <Download size={16} strokeWidth={2} className="text-[#2b5fbf]"/>
            <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[13px] text-[#2b5fbf]">批量下载</span>
          </div>
        </div>

        {/* Records list */}
        <div className="space-y-[10px]">
          {exportRecords.map(record => (
            <div key={record.id} className="bg-white rounded-[14px] p-[16px]"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div className="flex items-start justify-between mb-[8px]">
                <div className="flex-1 pr-[8px]">
                  <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[15px] text-[#1b2d4f]">{record.title}</p>
                  <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#9baabb] mt-[2px]">{record.subtitle}</p>
                </div>
                <div className="flex items-center gap-[4px] flex-shrink-0">
                  <span className="bg-[#f0f4f8] text-[#6b7e94] text-[11px] font-['Noto_Sans_SC:Regular',sans-serif] px-[7px] py-[2px] rounded-[6px]">
                    {record.format}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <span className="bg-[#eef3ff] text-[#2b5fbf] text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] px-[7px] py-[2px] rounded-[6px]">
                    {record.type}
                  </span>
                  <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#b0bec8]">
                    {record.date}
                  </span>
                </div>
                <button className="flex items-center gap-[4px] text-[#1e3a5f] active:opacity-70 bg-[#eef3fb] px-[10px] py-[6px] rounded-[8px]">
                  <RefreshCw size={12} strokeWidth={2}/>
                  <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[12px]">重新导出</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#b8c5d0] text-center mt-[12px] pb-[4px]">
          仅保留近 30 天记录
        </p>
      </div>

      <BottomNav activeTab="profile" onTabChange={onTabChange} />
    </div>
  );
}
