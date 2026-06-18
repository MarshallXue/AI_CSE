import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUp,
  Camera,
  Scan,
  Quote,
  BookOpen,
  RotateCcw,
  Star,
  User,
} from "lucide-react";
import { NewsTab } from "./NewsTab";
import { VocabTab } from "./VocabTab";

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

const navItems = [
  { id: "today" as NavTab, Icon: BookOpen, label: "今日" },
  { id: "wrongbank" as NavTab, Icon: RotateCcw, label: "错题库" },
  { id: "review" as NavTab, Icon: Star, label: "复盘" },
  { id: "profile" as NavTab, Icon: User, label: "我的" },
];

export function TodayScreen({
  onOpenDetail,
  onTabChange,
}: {
  onOpenDetail?: () => void;
  onTabChange?: (tab: NavTab) => void;
}) {
  const [contentTab, setContentTab] = useState<ContentTab>("news");
  const [navTab, setNavTab] = useState<NavTab>("today");
  const [aiQuery, setAiQuery] = useState("");
  const [aiFocused, setAiFocused] = useState(false);

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
      <div style={{ flexShrink: 0, padding: "10px 20px 14px", display: "flex", justifyContent: "center" }}>
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
        <motion.div
          animate={{ y: aiFocused ? -6 : 0 }}
          transition={{ duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ width: "91%", pointerEvents: "all" }}
        >
          {/* Quick action chips — fade up when focused */}
          <AnimatePresence>
            {aiFocused && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  display: "flex",
                  gap: 7,
                  marginBottom: 9,
                  paddingLeft: 4,
                }}
              >
                {[
                  { Icon: Camera, label: "拍照" },
                  { Icon: Scan, label: "截图" },
                  { Icon: Quote, label: "引用文字" },
                ].map(({ Icon, label }) => (
                  <button
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "5px 12px 5px 10px",
                      borderRadius: 20,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #EBF0F7",
                      fontSize: 12,
                      color: "#4A5E72",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.06), 0 0 0 0 transparent",
                      cursor: "pointer",
                      fontWeight: 400,
                      letterSpacing: 0.1,
                    }}
                  >
                    <Icon size={13} color="#64748B" strokeWidth={1.6} />
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              minHeight: 52,
              padding: "0 10px 0 16px",
              borderRadius: 20,
              backgroundColor: "#FFFFFF",
              border: aiFocused
                ? "1.5px solid #1F5EFF"
                : "1px solid #E2E8F0",
              boxShadow: aiFocused
                ? "0 4px 20px rgba(31,94,255,0.10), 0 1px 4px rgba(0,0,0,0.05)"
                : "0 2px 10px rgba(0,0,0,0.06), 0 0 0 0 transparent",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              gap: 10,
            }}
          >
            {/* Chat icon — bare, no pill background */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ flexShrink: 0, transition: "opacity 0.2s" }}
            >
              <path
                d="M17 10.5C17 14.09 13.87 17 10 17C8.9 17 7.86 16.75 6.94 16.31L3 17.5L4.31 13.87C3.49 12.87 3 11.73 3 10.5C3 6.91 6.13 4 10 4C13.87 4 17 6.91 17 10.5Z"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="7.5" cy="10.5" r="1" fill="#64748B" />
              <circle cx="10" cy="10.5" r="1" fill="#64748B" />
              <circle cx="12.5" cy="10.5" r="1" fill="#64748B" />
            </svg>

            {/* Input field */}
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onFocus={() => setAiFocused(true)}
              onBlur={() => setAiFocused(false)}
              placeholder="问AI，选中文字、拍照或截图都可以"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: 14,
                color: "#1B2D4F",
                caretColor: "#1F5EFF",
                fontWeight: 400,
                lineHeight: 1,
                padding: 0,
              }}
              className="placeholder:text-[#7A8798]"
            />

            {/* Send button */}
            <button
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                flexShrink: 0,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: aiQuery.length > 0 ? "#1F5EFF" : "#EAF1FF",
                transition: "background-color 0.18s ease",
              }}
            >
              <ArrowUp
                size={16}
                color={aiQuery.length > 0 ? "#FFFFFF" : "#1F5EFF"}
                strokeWidth={2.2}
              />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Tab Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 83,
          backgroundColor: "rgba(246,248,251,0.96)",
          backdropFilter: "blur(20px)",
          borderTop: "0.5px solid rgba(0,0,0,0.08)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-start",
            paddingTop: 10,
            flex: 1,
          }}
        >
          {navItems.map(({ id, Icon, label }) => {
            const active = navTab === id;
            return (
              <button
                key={id}
                onClick={() => {
                  setNavTab(id);
                  onTabChange?.(id);
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  minWidth: 56,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px 8px",
                }}
              >
                <Icon
                  size={22}
                  color={active ? "#1E3A5F" : "#AABCCC"}
                  strokeWidth={active ? 2.1 : 1.6}
                />
                <span
                  style={{
                    fontSize: 10.5,
                    color: active ? "#1E3A5F" : "#AABCCC",
                    fontWeight: active ? 600 : 400,
                    letterSpacing: 0.2,
                  }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Home indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 8,
          }}
        >
          <div
            style={{
              width: 134,
              height: 5,
              backgroundColor: "rgba(27,45,79,0.2)",
              borderRadius: 3,
            }}
          />
        </div>
      </div>
    </div>
  );
}
