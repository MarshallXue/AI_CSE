import imgImage from "figma:asset/db3e97bce6dff2d2aa83a665dc86fe890adce95a.png";
import imgImage2026 from "figma:asset/fb41ef05e5ae251b2883e570f174daad39f34930.png";
import { IOSStatusBar, AIInputBar, BottomNav, NavigateFn, ExamTag, ClockIcon, BookmarkIcon } from './shared';

interface Props {
  navigate: NavigateFn;
  onTabChange: (tab: 'today' | 'wrongbank' | 'review' | 'profile') => void;
}

function NewsCardWithImage({
  img,
  tag,
  tagBg,
  tagColor,
  hotTag,
  title,
  summary,
  examLabel,
  readTime,
  onClick,
}: {
  img: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  hotTag?: boolean;
  title: string;
  summary: string;
  examLabel: string;
  readTime: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="bg-white rounded-[12px] overflow-hidden cursor-pointer active:opacity-90"
      style={{ boxShadow: '0px 1px 6px rgba(0,0,0,0.05), 0px 0px 0px 0.5px rgba(0,0,0,0.05)' }}
      onClick={onClick}
    >
      <img alt={title} className="w-full h-[148px] object-cover pointer-events-none" src={img} />
      <div className="p-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <span
              className="px-[8px] py-[3px] rounded-[8px] text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] font-medium"
              style={{ backgroundColor: tagBg, color: tagColor }}
            >
              {tag}
            </span>
            {hotTag && (
              <span className="bg-[#fef0ec] text-[#c84b2f] text-[10px] font-['Noto_Sans_SC:Bold',sans-serif] font-bold px-[7px] py-[1px] rounded-[4px] tracking-[0.3px]">
                热点
              </span>
            )}
          </div>
          <button className="opacity-70 p-[4px]"><BookmarkIcon /></button>
        </div>
        <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[15px] text-[#1b2d4f] leading-[21.75px] tracking-[-0.2px] mt-[10px]">
          {title}
        </p>
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] font-normal text-[13px] text-[#6b7e94] leading-[20.8px] mt-[8px]">
          {summary}
        </p>
        <div className="flex items-center justify-between mt-[12px]">
          <ExamTag label={examLabel} />
          <div className="flex items-center gap-[4px]">
            <ClockIcon />
            <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[#b0bec8] text-[11px]">{readTime}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-[16px] py-[10px] bg-[#fafbfc]">
        <span className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[12px] text-[#8fa0b0]">
          精读全文，AI 解析考点
        </span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 3l4 4-4 4" stroke="#B0BEC8" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

function NewsCardNoImage({
  tag,
  tagBg,
  tagColor,
  title,
  summary,
  examLabel,
  readTime,
  onClick,
}: {
  tag: string;
  tagBg: string;
  tagColor: string;
  title: string;
  summary: string;
  examLabel: string;
  readTime: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="bg-white rounded-[12px] overflow-hidden cursor-pointer active:opacity-90"
      style={{ boxShadow: '0px 1px 6px rgba(0,0,0,0.05), 0px 0px 0px 0.5px rgba(0,0,0,0.05)' }}
      onClick={onClick}
    >
      <div className="p-[16px]">
        <div className="flex items-center justify-between">
          <span
            className="px-[8px] py-[3px] rounded-[8px] text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] font-medium"
            style={{ backgroundColor: tagBg, color: tagColor }}
          >
            {tag}
          </span>
          <button className="opacity-70 p-[4px]"><BookmarkIcon /></button>
        </div>
        <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[15px] text-[#1b2d4f] leading-[21.75px] tracking-[-0.2px] mt-[10px]">
          {title}
        </p>
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] font-normal text-[13px] text-[#6b7e94] leading-[20.8px] mt-[8px]">
          {summary}
        </p>
        <div className="flex items-center justify-between mt-[12px]">
          <ExamTag label={examLabel} />
          <div className="flex items-center gap-[4px]">
            <ClockIcon />
            <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[#b0bec8] text-[11px]">{readTime}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-[16px] py-[10px] bg-[#fafbfc]">
        <span className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[12px] text-[#8fa0b0]">
          精读全文，AI 解析考点
        </span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 3l4 4-4 4" stroke="#B0BEC8" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

export function TodayHomePage({ navigate, onTabChange }: Props) {
  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-hidden">
      <IOSStatusBar />

      {/* Tab switch */}
      <div className="flex justify-center px-[20px] pt-[10px] pb-[14px] flex-shrink-0">
        <div className="bg-[#e3e8f0] rounded-[10px] p-[3px] flex">
          <button className="bg-[#1e3a5f] rounded-[8px] px-[18px] py-[6px]"
            style={{ boxShadow: '0px 1px 2.5px rgba(30,58,95,0.28)' }}>
            <span className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[13px] text-white tracking-[0.1px]">今日新闻</span>
          </button>
          <button className="rounded-[8px] px-[18px] py-[6px]">
            <span className="font-['Noto_Sans_SC:Regular',sans-serif] font-normal text-[13px] text-[#7a8fa6] tracking-[0.1px]">今日词汇</span>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center justify-between px-[16px] mb-[4px] flex-shrink-0">
        <span className="font-['Noto_Sans_SC:Regular',sans-serif] font-normal text-[12px] text-[#9baabb]">今日 4 篇 · 已读 0 篇</span>
        <div className="flex items-center gap-[6px]">
          <div className="bg-[#e4e9f0] h-[4px] w-[72px] rounded-full overflow-hidden">
            <div className="bg-[#1e3a5f] h-full rounded-full" style={{width:'0%'}}/>
          </div>
          <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[#9baabb] text-[11px]">0%</span>
        </div>
      </div>

      {/* Scrollable news list */}
      <div className="flex-1 overflow-y-auto px-[16px] pb-[4px] space-y-[12px] pt-[4px]">
        <NewsCardWithImage
          img={imgImage}
          tag="经济政策"
          tagBg="#eef3ff"
          tagColor="#2b5fbf"
          hotTag
          title="中央经济工作会议部署下半年重点任务"
          summary="着力扩内需、稳外贸、深化供给侧结构性改革，新质生产力成为核心关键词，强调以科技创新驱动产业升级。"
          examLabel="考点：宏观调控 · 新质生产力"
          readTime="4分钟"
        />
        <NewsCardWithImage
          img={imgImage2026}
          tag="数字经济"
          tagBg="#e6f5f2"
          tagColor="#1e7a6a"
          title="国务院印发《数字中国建设整体布局规划（2026年版）》"
          summary="明确到2030年数字基础设施全面升级、数据要素市场基本建成的核心建设目标与路径。"
          examLabel="考点：数字中国战略"
          readTime="3分钟"
        />
        <NewsCardNoImage
          tag="三农政策"
          tagBg="#eaf5ec"
          tagColor="#2e7a3c"
          title="农业农村部：夏粮丰收在望，粮食安全形势持续向好"
          summary="多地夏粮产量创历史新高，农业科技赋能效果显著，耕地保护红线严守政策落实到位。"
          examLabel="考点：粮食安全 · 乡村振兴"
          readTime="3分钟"
          onClick={() => navigate('news-detail')}
        />
        <NewsCardNoImage
          tag="生态文明"
          tagBg="#f1f6e4"
          tagColor="#5e7a1a"
          title="生态环境部：全国碳市场扩容，钢铁建材等行业纳入"
          summary="碳市场第三履约期正式启动，钢铁、建材、有色金属行业企业将参与配额交易，推动双碳目标落实。"
          examLabel="考点：碳达峰 · 双碳目标"
          readTime="4分钟"
        />
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[#b8c5d0] text-[11px] text-center py-[8px]">每日 04:00 更新</p>
      </div>

      <AIInputBar onFocus={() => navigate('ai-read')} />
      <BottomNav activeTab="today" onTabChange={onTabChange} />
    </div>
  );
}
