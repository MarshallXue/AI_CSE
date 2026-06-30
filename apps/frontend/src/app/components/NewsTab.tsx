import { useState } from "react";
import { Bookmark, ChevronRight, Clock } from "lucide-react";

interface NewsItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  examTag: string;
  readTime: number;
  isHot?: boolean;
  saved?: boolean;
}

const newsData: NewsItem[] = [
  {
    id: "1",
    category: "经济政策",
    title: "中央经济工作会议部署下半年重点任务",
    summary: "着力扩内需、稳外贸、深化供给侧结构性改革，新质生产力成为核心关键词，强调以科技创新驱动产业升级。",
    examTag: "宏观调控 · 新质生产力",
    readTime: 4,
    isHot: true,
  },
  {
    id: "2",
    category: "数字经济",
    title: "国务院印发《数字中国建设整体布局规划（2026年版）》",
    summary: "明确到2030年数字基础设施全面升级、数据要素市场基本建成的核心建设目标与路径。",
    examTag: "数字中国战略",
    readTime: 3,
  },
  {
    id: "3",
    category: "三农政策",
    title: "农业农村部：夏粮丰收在望，粮食安全形势持续向好",
    summary: "多地夏粮产量创历史新高，农业科技赋能效果显著，耕地保护红线严守政策落实到位。",
    examTag: "粮食安全 · 乡村振兴",
    readTime: 3,
  },
  {
    id: "4",
    category: "生态文明",
    title: "生态环境部：全国碳市场扩容，钢铁建材等行业纳入",
    summary: "碳市场第三履约期正式启动，钢铁、建材、有色金属行业企业将参与配额交易，推动双碳目标落实。",
    examTag: "碳达峰 · 双碳目标",
    readTime: 4,
  },
];

function NewsCard({
  item,
  opened,
  onOpen,
}: {
  item: NewsItem;
  opened: boolean;
  onOpen: () => void;
}) {
  const [saved, setSaved] = useState(item.saved ?? false);

  return (
    <article
      className="app-pressable mx-4 mb-3 overflow-hidden rounded-[var(--app-radius-card)] bg-[var(--app-surface)]"
      style={{
        border: "1px solid rgba(30,58,95,0.07)",
        boxShadow: "var(--app-shadow-hairline)",
      }}
    >
      <div className="p-[16px]">
        <div className="mb-[10px] flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <span className="text-[11.5px] font-medium leading-[18px] text-[var(--app-muted)]">
              {item.category}
            </span>
            {item.isHot && (
              <span className="rounded-full bg-[var(--app-amber-soft)] px-[7px] py-[2px] text-[10.5px] font-medium leading-[15px] text-[var(--app-amber)]">
                高频考点
              </span>
            )}
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className="app-pressable flex h-[30px] w-[30px] items-center justify-center rounded-full"
            style={{ backgroundColor: saved ? "var(--app-navy-soft)" : "transparent" }}
            aria-label={saved ? "取消收藏新闻" : "收藏新闻"}
          >
            <Bookmark
              size={16}
              color={saved ? "var(--app-navy)" : "var(--app-faint)"}
              fill={saved ? "var(--app-navy)" : "none"}
            />
          </button>
        </div>

        <p className="app-text-pretty mb-[8px] text-[15px] font-bold leading-[22px] tracking-[-0.1px] text-[var(--app-ink)]">
          {item.title}
        </p>

        <p className="app-text-pretty mb-[12px] text-[13px] leading-[22px] text-[var(--app-body)]">
          {item.summary}
        </p>

        <div className="flex items-center justify-between gap-[12px]">
          <p className="min-w-0 text-[12px] leading-[18px] text-[var(--app-muted)]">
            <span className="font-medium text-[var(--app-body)]">考点</span>
            <span className="ml-[6px]">{item.examTag}</span>
          </p>
          <div className="flex shrink-0 items-center gap-[4px]">
            <Clock size={12} color="var(--app-faint)" />
            <span className="text-[11px] leading-[16px] text-[var(--app-faint)]">
              {item.readTime}分钟
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onOpen}
        className="flex w-full items-center justify-between px-[16px] py-[10px] text-left"
        style={{
          border: "none",
          borderTop: "1px solid rgba(30,58,95,0.06)",
          backgroundColor: opened ? "var(--app-navy-soft)" : "var(--app-paper)",
          borderRadius: "0 0 var(--app-radius-card) var(--app-radius-card)",
          cursor: "pointer",
        }}
      >
        <span
          className="text-[12px] leading-[18px]"
          style={{
            color: opened ? "var(--app-navy)" : "var(--app-muted)",
            fontWeight: opened ? 600 : 500,
          }}
        >
          {opened ? "已精读 · 时政考点待复盘" : "精读全文，AI 解析考点"}
        </span>
        <ChevronRight size={14} color={opened ? "var(--app-navy)" : "var(--app-faint)"} />
      </button>
    </article>
  );
}

export function NewsTab({ onOpenDetail }: { onOpenDetail?: () => void }) {
  const [openedIds, setOpenedIds] = useState<Set<string>>(new Set());

  const openNews = (id: string) => {
    setOpenedIds((current) => new Set(current).add(id));
    onOpenDetail?.();
  };

  return (
    <div className="pt-1 pb-4">
      <div className="mx-4 mb-3">
        <p className="text-[12px] leading-[18px] text-[var(--app-muted)]">
          轻读要点，必要时再进入全文解析。
        </p>
      </div>

      {newsData.map((item) => (
        <NewsCard
          key={item.id}
          item={item}
          opened={openedIds.has(item.id)}
          onOpen={() => openNews(item.id)}
        />
      ))}

      <p className="mt-2 mb-2 text-center text-[11px] text-[var(--app-faint)]">
        每日 04:00 更新
      </p>
    </div>
  );
}
