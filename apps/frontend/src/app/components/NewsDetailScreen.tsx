import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  Bookmark,
  MoreHorizontal,
  ArrowUp,
  Camera,
  Scan,
  Quote,
  ChevronDown,
  BookOpen,
  RotateCcw,
  Star,
  User,
  Sparkles,
  Lightbulb,
  PenLine,
  ClipboardList,
  Download,
  CheckCircle2,
} from "lucide-react";

type NavTab = "today" | "wrongbank" | "review" | "profile";

// ─── Status Bar ───────────────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div
      className="relative flex items-center justify-between"
      style={{ height: 54, paddingLeft: 22, paddingRight: 20, paddingTop: 14, flexShrink: 0 }}
    >
      <span style={{ fontSize: 15.5, fontWeight: 600, color: "#1B2D4F", letterSpacing: -0.3, lineHeight: 1 }}>
        9:41
      </span>
      <div
        className="absolute"
        style={{ left: "50%", top: 12, transform: "translateX(-50%)", width: 118, height: 34, backgroundColor: "#0A0A0A", borderRadius: 20 }}
      />
      <div className="flex items-center gap-[6px]">
        <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
          <rect x="0" y="6" width="3.5" height="7" rx="1" fill="#1B2D4F" opacity="0.4" />
          <rect x="4.8" y="4" width="3.5" height="9" rx="1" fill="#1B2D4F" opacity="0.6" />
          <rect x="9.6" y="2" width="3.5" height="11" rx="1" fill="#1B2D4F" opacity="0.8" />
          <rect x="14.4" y="0" width="3.5" height="13" rx="1" fill="#1B2D4F" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="10.5" r="1.5" fill="#1B2D4F" />
          <path d="M4.8 7.8C5.8 6.7 6.8 6.1 8 6.1C9.2 6.1 10.2 6.7 11.2 7.8" stroke="#1B2D4F" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
          <path d="M2.2 5.2C3.8 3.5 5.8 2.6 8 2.6C10.2 2.6 12.2 3.5 13.8 5.2" stroke="#1B2D4F" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
        </svg>
        <div className="flex items-center">
          <div style={{ width: 26, height: 13, border: "1.5px solid #1B2D4F", borderRadius: 4, padding: "1.5px", opacity: 0.8 }}>
            <div style={{ width: "78%", height: "100%", backgroundColor: "#1B2D4F", borderRadius: 2 }} />
          </div>
          <div style={{ width: 2, height: 5, backgroundColor: "#1B2D4F", borderRadius: "0 1px 1px 0", marginLeft: 1, opacity: 0.6 }} />
        </div>
      </div>
    </div>
  );
}

// ─── Nav Bar ──────────────────────────────────────────────────────────────────
function NavBar({ onBack }: { onBack: () => void }) {
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 14px 0 8px",
        height: 44,
        borderBottom: "0.5px solid rgba(0,0,0,0.07)",
        backgroundColor: "#F2F4F8",
        flexShrink: 0,
      }}
    >
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          border: "none",
          background: "none",
          cursor: "pointer",
          padding: "6px 8px 6px 4px",
          color: "#1F5EFF",
          borderRadius: 8,
        }}
      >
        <ChevronLeft size={22} color="#1F5EFF" strokeWidth={2} style={{ marginLeft: -2 }} />
        <span style={{ fontSize: 16, color: "#1F5EFF", fontWeight: 400 }}>精读</span>
      </button>
      <span style={{ fontSize: 16, fontWeight: 600, color: "#1B2D4F", letterSpacing: -0.3 }}>
        每日时政精读
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          style={{ border: "none", background: "none", cursor: "pointer", padding: "4px 6px", borderRadius: 8 }}
        >
          <Bookmark
            size={19}
            color={bookmarked ? "#1E3A5F" : "#8FA3B8"}
            fill={bookmarked ? "#1E3A5F" : "none"}
            strokeWidth={1.8}
          />
        </button>
        <button style={{ border: "none", background: "none", cursor: "pointer", padding: "4px 6px", borderRadius: 8 }}>
          <MoreHorizontal size={19} color="#8FA3B8" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}

// ─── Accordion Card ───────────────────────────────────────────────────────────
function AccordionCard({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  badge,
  defaultOpen,
  children,
}: {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  badge?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        marginBottom: 10,
        border: "0.5px solid rgba(0,0,0,0.07)",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "13px 16px",
          border: "none",
          background: "none",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 9,
              backgroundColor: iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={15} color={iconColor} strokeWidth={1.8} />
          </div>
          <span style={{ fontSize: 14.5, fontWeight: 600, color: "#1B2D4F", letterSpacing: -0.1 }}>
            {title}
          </span>
          {badge && (
            <span
              style={{
                fontSize: 10.5,
                color: "#2E7A3C",
                backgroundColor: "#EAF5EC",
                padding: "1px 7px",
                borderRadius: 4,
                fontWeight: 500,
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <ChevronDown size={16} color="#A0B0C0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 16px 16px",
                borderTop: "0.5px solid rgba(0,0,0,0.06)",
                paddingTop: 14,
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Dot List Item ────────────────────────────────────────────────────────────
function DotItem({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 9, marginBottom: 9 }}>
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: accent ? "#1F5EFF" : "#B0BEC8",
          marginTop: 8,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 13.5, color: "#2C3A4A", lineHeight: 1.7 }}>{children}</span>
    </div>
  );
}

// ─── Article Body ─────────────────────────────────────────────────────────────
function ArticleBody() {
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  const body: React.CSSProperties = {
    fontSize: 15.5,
    color: "#2A3A4A",
    lineHeight: 1.88,
    letterSpacing: 0.05,
    marginBottom: 18,
  };

  const heading: React.CSSProperties = {
    fontSize: 15,
    fontWeight: 600,
    color: "#1B2D4F",
    letterSpacing: -0.1,
    marginBottom: 10,
    marginTop: 22,
  };

  return (
    <div style={{ padding: "0 20px 4px" }}>
      {/* Lead paragraph */}
      <p style={body}>
        农业农村部最新数据显示，2026年夏粮生产形势持续向好，主产区小麦长势均衡，预计全国夏粮总产量将再创历史新高，连续第六年保持稳定增长态势。
      </p>

      {/* Section 1 */}
      <p style={heading}>一、政策支撑：强农惠农政策持续发力</p>
      <p style={body}>
        中央一号文件连续多年将"粮食安全"列为首要任务，明确提出"18亿亩耕地红线必须守住"的底线要求。各级政府积极推进"藏粮于地、藏粮于技"战略，加大农业科技投入，推广良种良法配套，截至2025年底，高标准农田累计建设面积已达10亿亩，为粮食稳产增产奠定了坚实基础。
      </p>

      {/* Section 2 */}
      <p style={heading}>二、科技赋能：农业现代化水平显著提升</p>
      <p style={body}>
        目前，全国农作物耕种收综合机械化率已超过73%，北斗导航农机自动驾驶系统累计应用面积突破1亿亩。智慧农业、精准农业的快速推广有效提升了粮食生产效率，农业气象监测、病虫害防控等数字化手段的广泛应用，大幅降低了自然灾害对粮食生产的冲击。
      </p>

      {/* Section 3 — with highlighted quote */}
      <p style={heading}>三、战略意义：粮食安全是"国之大者"</p>
      <p style={{ ...body, marginBottom: 8 }}>
        粮食安全是"国之大者"，须臾不可懈怠。习近平总书记多次强调：
        <span
          style={{
            backgroundColor: "rgba(253, 210, 50, 0.2)",
            borderRadius: 3,
            padding: "1px 0",
            cursor: "pointer",
          }}
          onClick={() => setAiPanelOpen(!aiPanelOpen)}
        >
          "中国人的饭碗任何时候都要牢牢端在自己手中，我们的饭碗应该主要装中国粮。"
        </span>
      </p>

      {/* 问AI trigger */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <button
          onClick={() => setAiPanelOpen(!aiPanelOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 13px",
            borderRadius: 20,
            backgroundColor: aiPanelOpen ? "#1F5EFF" : "#EEF3FF",
            border: "none",
            cursor: "pointer",
            fontSize: 12.5,
            color: aiPanelOpen ? "#FFFFFF" : "#1F5EFF",
            fontWeight: 500,
            transition: "all 0.18s ease",
          }}
        >
          <Sparkles size={12} color={aiPanelOpen ? "#fff" : "#1F5EFF"} strokeWidth={2} />
          问AI
        </button>
      </div>

      {/* AI quick-response panel */}
      <AnimatePresence>
        {aiPanelOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              backgroundColor: "#F2F7FF",
              borderRadius: 12,
              padding: 14,
              marginBottom: 16,
              border: "1px solid #D8E8FF",
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#1E3A5F",
                marginBottom: 8,
                letterSpacing: 0.3,
              }}
            >
              ✦ AI 考点解析
            </p>
            <p style={{ fontSize: 13.5, color: "#2A3A4A", lineHeight: 1.75, marginBottom: 12 }}>
              这是习近平总书记关于粮食安全的{" "}
              <strong style={{ color: "#1E3A5F", fontWeight: 600 }}>核心原文表述</strong>，申论必背。
              考查时注意关键词精确性：
            </p>
            {["\"任何时候\"不可替换为\"通常\"或\"一般情况\"", "申论大作文引用时须完整引用", "判断题常考原文辨析，注意\"主要装中国粮\""].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 7 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#1F5EFF", marginTop: 8, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#374F66", lineHeight: 1.65 }}>{t}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 12.5,
                  color: "#1F5EFF",
                  backgroundColor: "#DAE8FF",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                加入笔记
              </button>
              <button
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 12.5,
                  color: "#6B8099",
                  backgroundColor: "transparent",
                  border: "1px solid #D0DCE8",
                  cursor: "pointer",
                }}
              >
                更多解析
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p style={body}>
        在全球粮食供应链不稳定、地缘政治冲突频发的背景下，中国坚持把粮食安全作为治国理政的头等大事，不仅保障了14亿人口的口粮需求，也为全球粮食安全贡献了重要力量。
      </p>

      {/* Section 4 */}
      <p style={heading}>四、乡村振兴：夏粮丰收彰显战略成效</p>
      <p style={{ ...body, marginBottom: 28 }}>
        夏粮丰收不仅是农业生产的成果，更是乡村振兴战略落地见效的重要体现。各地通过发展现代农业产业体系、完善农村基础设施、稳步提升农民收入水平，逐步实现了巩固拓展脱贫攻坚成果与全面推进乡村振兴的有效衔接，切实让农民共享农业发展红利。
      </p>
    </div>
  );
}

// ─── Practice Card ────────────────────────────────────────────────────────────
function PracticeCard() {
  const questions = [
    { type: "单选", text: "我国耕地保护红线面积为多少？", hint: "A. 12亿亩  B. 15亿亩  C. 18亿亩  D. 20亿亩" },
    { type: "单选", text: "\"藏粮于技\"的核心指向是？", hint: "A. 储粮仓储  B. 科技兴农  C. 进口粮食  D. 限制出口" },
    { type: "判断", text: "我国综合机械化率已突破80%。", hint: "注意：正确数据为73%以上" },
  ];
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        marginBottom: 10,
        border: "0.5px solid rgba(0,0,0,0.07)",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "13px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 9,
              backgroundColor: "#EDF7ED",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ClipboardList size={15} color="#2E7A3C" strokeWidth={1.8} />
          </div>
          <span style={{ fontSize: 14.5, fontWeight: 600, color: "#1B2D4F" }}>配套练习</span>
        </div>
        <span style={{ fontSize: 11, color: "#2E7A3C", backgroundColor: "#EAF5EC", padding: "2px 8px", borderRadius: 4, fontWeight: 500 }}>
          已生成 3 题
        </span>
      </div>

      {/* Question previews */}
      <div style={{ borderTop: "0.5px solid rgba(0,0,0,0.06)", padding: "12px 16px 4px" }}>
        {questions.map((q, i) => (
          <div
            key={i}
            style={{
              padding: "10px 12px",
              backgroundColor: "#F8FAFB",
              borderRadius: 9,
              marginBottom: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: q.type === "判断" ? "#7A5C14" : "#1E3A5F",
                  backgroundColor: q.type === "判断" ? "#FBF4E0" : "#EEF3FF",
                  padding: "1px 7px",
                  borderRadius: 4,
                }}
              >
                {q.type}
              </span>
              <span style={{ fontSize: 11, color: "#9BAAB8" }}>第 {i + 1} 题</span>
            </div>
            <p style={{ fontSize: 13.5, color: "#2A3A4A", lineHeight: 1.6, marginBottom: 3 }}>{q.text}</p>
            <p style={{ fontSize: 12, color: "#8FA0B0", lineHeight: 1.5 }}>{q.hint}</p>
          </div>
        ))}
      </div>

      {/* Start button */}
      <div style={{ padding: "10px 16px 14px" }}>
        <button
          style={{
            width: "100%",
            padding: "12px 0",
            borderRadius: 10,
            backgroundColor: "#1E3A5F",
            border: "none",
            cursor: "pointer",
            fontSize: 15,
            fontWeight: 600,
            color: "#FFFFFF",
            letterSpacing: 0.2,
          }}
        >
          开始练习
        </button>
      </div>
    </div>
  );
}

// ─── Export Section ───────────────────────────────────────────────────────────
function ExportSection() {
  const [selected, setSelected] = useState("解析");
  const options = ["练习版", "含解析版", "PDF讲义"];
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: "14px 16px",
        marginBottom: 10,
        border: "0.5px solid rgba(0,0,0,0.07)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            backgroundColor: "#F0F4FA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Download size={15} color="#4A6280" strokeWidth={1.8} />
        </div>
        <span style={{ fontSize: 14.5, fontWeight: 600, color: "#1B2D4F" }}>导出本文讲义</span>
      </div>

      {/* Format selector */}
      <div style={{ display: "flex", gap: 7, marginBottom: 12 }}>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            style={{
              padding: "5px 12px",
              borderRadius: 8,
              fontSize: 12.5,
              fontWeight: 500,
              border: selected === opt ? "1.5px solid #1E3A5F" : "1px solid #E2E8F0",
              backgroundColor: selected === opt ? "#EEF3FF" : "transparent",
              color: selected === opt ? "#1E3A5F" : "#7A8FA6",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        style={{
          width: "100%",
          padding: "10px 0",
          borderRadius: 9,
          backgroundColor: "transparent",
          border: "1px solid #D4DCEA",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 500,
          color: "#4A6280",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
        }}
      >
        <Download size={14} color="#4A6280" strokeWidth={1.8} />
        导出 · {selected}
      </button>
    </div>
  );
}

// ─── AI Input Bar ─────────────────────────────────────────────────────────────
function AIInputBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  return (
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
        animate={{ y: focused ? -6 : 0 }}
        transition={{ duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ width: "91%", pointerEvents: "all" }}
      >
        <AnimatePresence>
          {focused && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex", gap: 7, marginBottom: 9, paddingLeft: 4 }}
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
                    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                    cursor: "pointer",
                    fontWeight: 400,
                  }}
                >
                  <Icon size={13} color="#64748B" strokeWidth={1.6} />
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            minHeight: 52,
            padding: "0 10px 0 16px",
            borderRadius: 20,
            backgroundColor: "#FFFFFF",
            border: focused ? "1.5px solid #1F5EFF" : "1px solid #E2E8F0",
            boxShadow: focused
              ? "0 4px 20px rgba(31,94,255,0.10), 0 1px 4px rgba(0,0,0,0.05)"
              : "0 2px 10px rgba(0,0,0,0.06)",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            gap: 10,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
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
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
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
              padding: 0,
            }}
            className="placeholder:text-[#7A8798]"
          />
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
              backgroundColor: query.length > 0 ? "#1F5EFF" : "#EAF1FF",
              transition: "background-color 0.18s ease",
            }}
          >
            <ArrowUp size={16} color={query.length > 0 ? "#FFFFFF" : "#1F5EFF"} strokeWidth={2.2} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Tab Bar ──────────────────────────────────────────────────────────────────
const navItems = [
  { id: "today" as NavTab, Icon: BookOpen, label: "今日" },
  { id: "wrongbank" as NavTab, Icon: RotateCcw, label: "错题库" },
  { id: "review" as NavTab, Icon: Star, label: "复盘" },
  { id: "profile" as NavTab, Icon: User, label: "我的" },
];

function TabBar({ onTabChange }: { onTabChange?: (tab: NavTab) => void }) {
  const [active, setActive] = useState<NavTab>("today");
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 83,
        backgroundColor: "rgba(246,248,251,0.97)",
        backdropFilter: "blur(20px)",
        borderTop: "0.5px solid rgba(0,0,0,0.08)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start", paddingTop: 10, flex: 1 }}>
        {navItems.map(({ id, Icon, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => {
                setActive(id);
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
              <Icon size={22} color={isActive ? "#1E3A5F" : "#AABCCC"} strokeWidth={isActive ? 2.1 : 1.6} />
              <span style={{ fontSize: 10.5, color: isActive ? "#1E3A5F" : "#AABCCC", fontWeight: isActive ? 600 : 400, letterSpacing: 0.2 }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingBottom: 8 }}>
        <div style={{ width: 134, height: 5, backgroundColor: "rgba(27,45,79,0.18)", borderRadius: 3 }} />
      </div>
    </div>
  );
}

// ─── Section Divider ──────────────────────────────────────────────────────────
function SectionDivider({ label }: { label: string }) {
  return (
    <div
      style={{
        backgroundColor: "#EDF0F5",
        padding: "10px 20px 8px",
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div style={{ flex: 1, height: "0.5px", backgroundColor: "rgba(0,0,0,0.1)" }} />
      <span style={{ fontSize: 11.5, color: "#8FA3B8", fontWeight: 500, letterSpacing: 0.8 }}>{label}</span>
      <div style={{ flex: 1, height: "0.5px", backgroundColor: "rgba(0,0,0,0.1)" }} />
    </div>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export function NewsDetailScreen({
  onBack,
  onTabChange,
}: {
  onBack: () => void;
  onTabChange?: (tab: NavTab) => void;
}) {
  return (
    <div style={{ position: "relative", height: "100%", backgroundColor: "#F2F4F8", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <NavBar onBack={onBack} />

      {/* Article header */}
      <div style={{ flexShrink: 0, backgroundColor: "#FFFFFF", padding: "18px 20px 16px", borderBottom: "0.5px solid rgba(0,0,0,0.06)" }}>
        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {["三农政策", "粮食安全", "乡村振兴"].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11.5,
                fontWeight: 500,
                color: "#2E7A3C",
                backgroundColor: "#EAF5EC",
                padding: "2px 9px",
                borderRadius: 5,
                letterSpacing: 0.2,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#1B2D4F",
            lineHeight: 1.4,
            letterSpacing: -0.4,
            marginBottom: 12,
          }}
        >
          农业农村部：夏粮丰收在望，粮食安全形势持续向好
        </h1>

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#B0BEC8" }} />
            <span style={{ fontSize: 12, color: "#8FA0B0" }}>预计阅读 3 分钟</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#B0BEC8" }} />
            <span style={{ fontSize: 12, color: "#8FA0B0" }}>官方材料精读</span>
          </div>
        </div>
      </div>

      {/* Scrollable area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          paddingBottom: 168,
          backgroundColor: "#FFFFFF",
        } as React.CSSProperties}
      >
        {/* Article body */}
        <div style={{ paddingTop: 20 }}>
          <ArticleBody />
        </div>

        {/* AI learning section */}
        <SectionDivider label="AI 学习助手" />

        <div style={{ padding: "0 14px" }}>
          <AccordionCard
            icon={Sparkles}
            iconColor="#1F5EFF"
            iconBg="#EEF3FF"
            title="AI 考点提炼"
            defaultOpen
          >
            <DotItem accent>
              <strong>18亿亩耕地红线</strong> — 法定底线，选择题高频考点，注意与"15亿亩"区分
            </DotItem>
            <DotItem accent>
              <strong>藏粮于地、藏粮于技</strong> — 粮食安全核心战略，注意"于"字介词搭配不可改变
            </DotItem>
            <DotItem accent>
              <strong>综合机械化率 &gt; 73%</strong> — 数据考点，勿与"80%"混淆，判断题易错项
            </DotItem>
            <DotItem accent>
              <strong>习近平"饭碗论"</strong> — 申论必背原文，关键词"任何时候""主要装中国粮"
            </DotItem>
          </AccordionCard>

          <AccordionCard
            icon={Lightbulb}
            iconColor="#C09A30"
            iconBg="#FBF4E0"
            title="可能考法"
          >
            <DotItem>申论大作文：以"粮食安全"或"农业现代化"为主题的综合分析</DotItem>
            <DotItem>单选题：耕地红线数字辨析（18亿亩 vs 20亿亩）</DotItem>
            <DotItem>判断题：机械化率数据（73%以上，非80%）</DotItem>
            <DotItem>多选题：粮食安全保障措施的综合考查</DotItem>
          </AccordionCard>

          <AccordionCard
            icon={PenLine}
            iconColor="#1E7A6A"
            iconBg="#E6F5F2"
            title="申论可用表达"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "粮食安全是国之大者，须臾不可懈怠",
                "守住18亿亩耕地红线，筑牢国家粮食安全根基",
                "以藏粮于地、藏粮于技为战略支撑，推动粮食生产高质量发展",
              ].map((expr) => (
                <div
                  key={expr}
                  style={{
                    padding: "10px 12px",
                    backgroundColor: "#F4FAF8",
                    borderRadius: 8,
                    borderLeft: "3px solid #1E7A6A",
                  }}
                >
                  <p style={{ fontSize: 13.5, color: "#1E4A40", lineHeight: 1.65 }}>"{expr}"</p>
                </div>
              ))}
            </div>
          </AccordionCard>

          <PracticeCard />
          <ExportSection />
        </div>
      </div>

      <AIInputBar />
      <TabBar onTabChange={onTabChange} />
    </div>
  );
}
