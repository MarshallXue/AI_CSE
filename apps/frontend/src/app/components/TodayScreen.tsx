import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CalendarDays, Settings2 } from "lucide-react";
import { AIInputBar, BottomNav, IOSStatusBar } from "./shared";
import { NewsTab } from "./NewsTab";
import {
  VocabTab,
  VOCAB_OPEN_CALENDAR_EVENT,
  VOCAB_OPEN_SETTINGS_EVENT,
} from "./VocabTab";

type ContentTab = "news" | "vocab";
type NavTab = "today" | "wrongbank" | "review" | "profile";

function HeaderIconButton({
  label,
  eventName,
  children,
}: {
  label: string;
  eventName: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event(eventName))}
      className="app-pressable flex h-[32px] w-[32px] items-center justify-center bg-[var(--app-surface)]"
      style={{
        borderRadius: "var(--app-radius-control)",
        boxShadow: "var(--app-shadow-hairline)",
      }}
      aria-label={label}
    >
      {children}
    </button>
  );
}

function getTodayLabel() {
  const today = new Date();
  return `${today.getMonth() + 1}月${today.getDate()}日`;
}

export function TodayScreen({
  onOpenDetail,
  onTabChange,
}: {
  onOpenDetail?: () => void;
  onTabChange?: (tab: NavTab) => void;
}) {
  const [contentTab, setContentTab] = useState<ContentTab>("news");
  const todayLabel = getTodayLabel();

  return (
    <div
      className="relative flex flex-col"
      style={{ height: "100%", backgroundColor: "var(--app-page)", overflow: "hidden" }}
    >
      {/* Status Bar */}
      <div style={{ flexShrink: 0 }}>
        <IOSStatusBar />
      </div>

      {/* Header */}
      <div
        style={{
          flexShrink: 0,
          padding: "8px 20px 13px",
        }}
      >
        <div className="mb-[12px] flex items-start justify-between gap-[12px]">
          <div>
            <p className="text-[12px] leading-[18px] text-[var(--app-muted)]">
              {todayLabel} · 04:00 更新
            </p>
            <h1 className="mt-[1px] text-[24px] font-bold leading-[32px] tracking-[-0.3px] text-[var(--app-ink)]">
              今日学习
            </h1>
          </div>

          {contentTab === "vocab" ? (
            <div className="flex shrink-0 gap-[7px] pt-[3px]">
              <HeaderIconButton label="打开词汇日历" eventName={VOCAB_OPEN_CALENDAR_EVENT}>
                <CalendarDays size={15} color="var(--app-navy)" strokeWidth={1.9} />
              </HeaderIconButton>
              <HeaderIconButton label="打开词汇设置" eventName={VOCAB_OPEN_SETTINGS_EVENT}>
                <Settings2 size={15} color="var(--app-navy)" strokeWidth={1.9} />
              </HeaderIconButton>
            </div>
          ) : (
            <span className="mt-[4px] rounded-full bg-[var(--app-surface)] px-[10px] py-[6px] text-[12px] font-medium text-[var(--app-muted)] shadow-[var(--app-shadow-hairline)]">
              公考晨读
            </span>
          )}
        </div>

        <div className="mb-[12px] flex flex-wrap gap-[7px]">
          <span className="rounded-full bg-[var(--app-surface)] px-[10px] py-[5px] text-[12px] text-[var(--app-body)] shadow-[var(--app-shadow-hairline)]">
            4 篇时政
          </span>
          <span className="rounded-full bg-[var(--app-surface)] px-[10px] py-[5px] text-[12px] text-[var(--app-body)] shadow-[var(--app-shadow-hairline)]">
            3 组词汇
          </span>
          <span className="rounded-full bg-[var(--app-navy-soft)] px-[10px] py-[5px] text-[12px] font-medium text-[var(--app-navy)]">
            读完可进入复盘
          </span>
        </div>

        <div className="flex justify-center">
          <div
            style={{
              display: "inline-flex",
              padding: 3,
              backgroundColor: "rgba(30,58,95,0.08)",
              borderRadius: "var(--app-radius-control)",
            }}
          >
            {(["news", "vocab"] as const).map((tab) => {
              const label = tab === "news" ? "今日新闻" : "今日词汇";
              const active = contentTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setContentTab(tab)}
                  style={{
                    position: "relative",
                    padding: "6px 18px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: active ? 600 : 400,
                    color: active ? "#FFFFFF" : "var(--app-muted)",
                    backgroundColor: active ? "var(--app-navy)" : "transparent",
                    boxShadow: active
                      ? "0 1px 5px rgba(30,58,95,0.28), 0 0 0 0.5px rgba(30,58,95,0.15)"
                      : "none",
                    letterSpacing: 0.1,
                    transition: "all 0.18s ease",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          paddingBottom: 168,
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
      >
        <AnimatePresence mode="wait">
          {contentTab === "news" ? (
            <motion.div
              key="news"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <NewsTab onOpenDetail={onOpenDetail} />
            </motion.div>
          ) : (
            <motion.div
              key="vocab"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <VocabTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Floating Input Bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 91,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 40,
          pointerEvents: "none",
        }}
      >
        <div style={{ width: "94%", pointerEvents: "all" }}>
          <AIInputBar />
        </div>
      </div>

      {/* Tab Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
        }}
      >
        <BottomNav activeTab="today" onTabChange={(tab) => onTabChange?.(tab)} />
      </div>
    </div>
  );
}
