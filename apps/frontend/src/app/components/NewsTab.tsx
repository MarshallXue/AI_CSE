import { useState } from "react";
import { Bookmark, Clock, ChevronRight } from "lucide-react";
import img0 from "../../imports/economic-policy.jpg";
import img1 from "../../imports/digital-infrastructure.jpg";

interface NewsItem {
  id: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  title: string;
  summary: string;
  examTag: string;
  readTime: number;
  isHot?: boolean;
  saved?: boolean;
  image?: string;
}

const newsData: NewsItem[] = [
  {
    id: "1",
    category: "经济政策",
    categoryColor: "#2B5FBF",
    categoryBg: "#EEF3FF",
    title: "中央经济工作会议部署下半年重点任务",
    summary: "着力扩内需、稳外贸、深化供给侧结构性改革，新质生产力成为核心关键词，强调以科技创新驱动产业升级。",
    examTag: "宏观调控 · 新质生产力",
    readTime: 4,
    isHot: true,
    image: img0,
  },
  {
    id: "2",
    category: "数字经济",
    categoryColor: "#1E7A6A",
    categoryBg: "#E6F5F2",
    title: "国务院印发《数字中国建设整体布局规划（2026年版）》",
    summary: "明确到2030年数字基础设施全面升级、数据要素市场基本建成的核心建设目标与路径。",
    examTag: "数字中国战略",
    readTime: 3,
    image: img1,
  },
  {
    id: "3",
    category: "三农政策",
    categoryColor: "#2E7A3C",
    categoryBg: "#EAF5EC",
    title: "农业农村部：夏粮丰收在望，粮食安全形势持续向好",
    summary: "多地夏粮产量创历史新高，农业科技赋能效果显著，耕地保护红线严守政策落实到位。",
    examTag: "粮食安全 · 乡村振兴",
    readTime: 3,
  },
  {
    id: "4",
    category: "生态文明",
    categoryColor: "#5E7A1A",
    categoryBg: "#F1F6E4",
    title: "生态环境部：全国碳市场扩容，钢铁建材等行业纳入",
    summary: "碳市场第三履约期正式启动，钢铁、建材、有色金属行业企业将参与配额交易，推动双碳目标落实。",
    examTag: "碳达峰 · 双碳目标",
    readTime: 4,
  },
];

function NewsCard({ item, onOpenDetail }: { item: NewsItem; onOpenDetail?: () => void }) {
  const [saved, setSaved] = useState(item.saved ?? false);

  return (
    <div
      className="bg-white rounded-xl mx-4 mb-3"
      style={{
        borderRadius: 12,
        boxShadow: "0 1px 6px rgba(0,0,0,0.05), 0 0 0 0.5px rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            height: 148,
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
      <div className="p-4">
        {/* Top row */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 rounded-md"
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: item.categoryColor,
                backgroundColor: item.categoryBg,
                letterSpacing: 0.2,
              }}
            >
              {item.category}
            </span>
            {item.isHot && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#C84B2F",
                  backgroundColor: "#FEF0EC",
                  padding: "1px 7px",
                  borderRadius: 4,
                  letterSpacing: 0.3,
                }}
              >
                热点
              </span>
            )}
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className="p-1"
            style={{ opacity: 0.7 }}
          >
            <Bookmark
              size={16}
              color={saved ? "#1E3A5F" : "#B0BEC8"}
              fill={saved ? "#1E3A5F" : "none"}
            />
          </button>
        </div>

        {/* Title */}
        <p
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#1B2D4F",
            lineHeight: 1.45,
            marginBottom: 8,
            letterSpacing: -0.2,
          }}
        >
          {item.title}
        </p>

        {/* Summary */}
        <p
          style={{
            fontSize: 13,
            color: "#6B7E94",
            lineHeight: 1.6,
            marginBottom: 12,
          }}
        >
          {item.summary}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "#C09A30" }}
            />
            <span
              style={{
                fontSize: 11,
                color: "#8A6A10",
                backgroundColor: "#FBF4E0",
                padding: "2px 7px",
                borderRadius: 4,
                fontWeight: 500,
              }}
            >
              考点：{item.examTag}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} color="#B0BEC8" />
            <span style={{ fontSize: 11, color: "#B0BEC8" }}>{item.readTime}分钟</span>
          </div>
        </div>
      </div>

      {/* Read button */}
      <button
        onClick={() => onOpenDetail?.()}
        className="flex items-center justify-between px-4 py-2.5 w-full"
        style={{
          borderTop: "0.5px solid rgba(0,0,0,0.06)",
          backgroundColor: "#FAFBFC",
          border: "none",
          cursor: "pointer",
          borderRadius: "0 0 12px 12px",
        }}
      >
        <span style={{ fontSize: 12, color: "#8FA0B0" }}>精读全文，AI 解析考点</span>
        <ChevronRight size={14} color="#B0BEC8" />
      </button>
    </div>
  );
}

export function NewsTab({ onOpenDetail }: { onOpenDetail?: () => void }) {
  return (
    <div className="pt-1 pb-4">
      {/* Progress hint */}
      <div className="mx-4 mb-3 flex items-center justify-between">
        <span style={{ fontSize: 12, color: "#9BAABB" }}>今日 4 篇 · 已读 0 篇</span>
        <div className="flex items-center gap-1.5">
          <div
            className="rounded-full overflow-hidden"
            style={{ width: 72, height: 4, backgroundColor: "#E4E9F0" }}
          >
            <div
              className="h-full rounded-full"
              style={{ width: "0%", backgroundColor: "#1E3A5F" }}
            />
          </div>
          <span style={{ fontSize: 11, color: "#9BAABB" }}>0%</span>
        </div>
      </div>

      {newsData.map((item) => (
        <NewsCard key={item.id} item={item} onOpenDetail={onOpenDetail} />
      ))}

      {/* Bottom hint */}
      <p
        className="text-center mt-2 mb-2"
        style={{ fontSize: 11, color: "#B8C5D0" }}
      >
        每日 04:00 更新
      </p>
    </div>
  );
}
