import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CalendarDays, Settings2 } from "lucide-react";
import { AIInputBar, BottomNav } from "./shared";
import { NewsTab } from "./NewsTab";
import {
  VocabTab,
  VOCAB_OPEN_CALENDAR_EVENT,
  VOCAB_OPEN_SETTINGS_EVENT,
} from "./VocabTab";

type ContentTab = "news" | "vocab";
type NavTab = "today" | "wrongbank" | "review" | "profile";

function StatusBar() {
  return (
    <div
      className="relative flex items-center justify-between"
      style={{ height: 54, paddingLeft: 22, paddingRight: 20, paddingTop: 14 }}
    >
      {/* Time */}
      <span
        style={{
          fontSize: 15.5,
          fontWeight: 600,
          color: "#1B2D4F",
          letterSpacing: -0.3,
          lineHeight: 1,
        }}
      >
        9:41
      </span>

      {/* Dynamic island */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: 12,
          transform: "translateX(-50%)",
          width: 118,
          height: 34,
          backgroundColor: "#0A0A0A",
          borderRadius: 20,
        }}
      />

      {/* Status icons */}
      <div className="flex items-center gap-[6px]">
        {/* Signal */}
        <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
          <rect x="0" y="6" width="3.5" height="7" rx="1" fill="#1B2D4F" opacity="0.4" />
          <rect x="4.8" y="4" width="3.5" height="9" rx="1" fill="#1B2D4F" opacity="0.6" />
          <rect x="9.6" y="2" width="3.5" height="11" rx="1" fill="#1B2D4F" opacity="0.8" />
          <rect x="14.4" y="0" width="3.5" height="13" rx="1" fill="#1B2D4F" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="10.5" r="1.5" fill="#1B2D4F" />
          <path
            d="M4.8 7.8C5.8 6.7 6.8 6.1 8 6.1C9.2 6.1 10.2 6.7 11.2 7.8"
            stroke="#1B2D4F"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M2.2 5.2C3.8 3.5 5.8 2.6 8 2.6C10.2 2.6 12.2 3.5 13.8 5.2"
            stroke="#1B2D4F"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
        {/* Battery */}
        <div className="flex items-center">
          <div
            style={{
              width: 26,
              height: 13,
              border: "1.5px solid #1B2D4F",
              borderRadius: 4,
              padding: "1.5px",
              position: "relative",
              opacity: 0.8,
            }}
          >
            <div
              style={{
                width: "78%",
                height: "100%",
                backgroundColor: "#1B2D4F",
                borderRadius: 2,
              }}
            />
          </div>
          <div
            style={{
              width: 2,
              height: 5,
              backgroundColor: "#1B2D4F",
              borderRadius: "0 1px 1px 0",
              marginLeft: 1,
              opacity: 0.6,
            }}
          />
        </div>
      </div>
    </div>
  );
}

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
      className="flex h-[30px] w-[30px] items-center justify-center rounded-[10px] bg-white"
      style={{
        boxShadow: "0 5px 16px rgba(27,45,79,0.08), 0 0 0 0.833px rgba(27,45,79,0.05)",
      }}
      aria-label={label}
    >
      {children}
    </button>
  );
}

export function TodayScreen({
  onOpenDetail,
  onTabChange,
}: {
  onOpenDetail?: () => void;
  onTabChange?: (tab: NavTab) => void;
}) {
  const [contentTab, setContentTab] = useState<ContentTab>("news");

  return (
    <div
      className="relative flex flex-col"
      style={{ height: "100%", backgroundColor: "#F2F4F8", overflow: "hidden" }}
    >
      {/* Status Bar */}
      <div style={{ flexShrink: 0 }}>
        <StatusBar />
      </div>

      {/* Header — segmented control only, centered */}
      <div
        style={{
          flexShrink: 0,
          padding: "10px 20px 14px",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Segmented Control */}
        <div
          style={{
            display: "inline-flex",
            padding: 3,
            backgroundColor: "#E3E8F0",
            borderRadius: 10,
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
                  color: active ? "#FFFFFF" : "#7A8FA6",
                  backgroundColor: active ? "#1E3A5F" : "transparent",
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

        {contentTab === "vocab" && (
          <div
            style={{
              position: "absolute",
              right: 20,
              top: 10,
              display: "flex",
              gap: 7,
              alignItems: "center",
            }}
          >
            <HeaderIconButton label="打开词汇日历" eventName={VOCAB_OPEN_CALENDAR_EVENT}>
              <CalendarDays size={15} color="#1E3A5F" strokeWidth={1.9} />
            </HeaderIconButton>
            <HeaderIconButton label="打开词汇设置" eventName={VOCAB_OPEN_SETTINGS_EVENT}>
              <Settings2 size={15} color="#1E3A5F" strokeWidth={1.9} />
            </HeaderIconButton>
          </div>
        )}
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
