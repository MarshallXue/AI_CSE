import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BookmarkPlus,
  Check,
  ChevronLeft,
  ChevronRight,
  Layers3,
  Volume2,
  X,
} from "lucide-react";

interface VocabItem {
  id: string;
  word: string;
  pinyin?: string;
  partOfSpeech: string;
  tags: string[];
  definition: string;
  example: string;
  source: string;
}

interface VocabGroup {
  id: string;
  title: string;
  type: string;
  description: string;
  examHint: string;
  masteredCount: number;
  words: VocabItem[];
}

const vocabGroups: VocabGroup[] = [
  {
    id: "productive-force",
    title: "发展动能辨析",
    type: "同义近义",
    description: "围绕经济高质量发展、产业升级和创新驱动的常见政策表达。",
    examHint: "常出现在时政常识、申论概括和公文表达题中。",
    masteredCount: 1,
    words: [
      {
        id: "1",
        word: "新质生产力",
        partOfSpeech: "名词",
        tags: ["高频考点", "2024年热词"],
        definition: "以科技创新为主导，摆脱传统增长路径依赖，具有高科技、高效能、高质量特征的先进生产力形态。",
        example: "习近平强调，要因地制宜发展新质生产力，推动传统产业转型升级。",
        source: "2024年两会政府工作报告",
      },
      {
        id: "1-2",
        word: "高质量发展",
        pinyin: "gāo zhì liàng fā zhǎn",
        partOfSpeech: "名词",
        tags: ["核心表述", "经济政策"],
        definition: "从有没有转向好不好，强调质量、效率、公平、可持续和安全的发展方式。",
        example: "推动高质量发展，是全面建设社会主义现代化国家的首要任务。",
        source: "党的二十大报告",
      },
      {
        id: "1-3",
        word: "新动能",
        pinyin: "xīn dòng néng",
        partOfSpeech: "名词",
        tags: ["经济表达"],
        definition: "由新技术、新产业、新业态、新模式形成的发展动力，强调增长来源的更新。",
        example: "要加快培育新动能，推动传统产业向数字化、智能化方向升级。",
        source: "政府工作报告常用表述",
      },
    ],
  },
  {
    id: "policy-method",
    title: "治理方法辨析",
    type: "易混表达",
    description: "区分政策制定、资源配置和多部门协作时常见的行政管理词。",
    examHint: "容易在言语填空、公文写作和基层治理材料中混用。",
    masteredCount: 0,
    words: [
      {
        id: "2",
        word: "精准施策",
        pinyin: "jīng zhǔn shī cè",
        partOfSpeech: "动词",
        tags: ["行政管理"],
        definition: "针对不同地区、不同群体、不同问题，制定并采取精确、有针对性的政策措施，避免“一刀切”。",
        example: "各地要因地制宜、精准施策，结合本地实际推动经济社会发展。",
        source: "中央政策文件常用表述",
      },
      {
        id: "2-2",
        word: "因地制宜",
        pinyin: "yīn dì zhì yí",
        partOfSpeech: "动词",
        tags: ["政策方法"],
        definition: "根据不同地区的自然条件、资源禀赋和发展阶段采取合适措施。",
        example: "发展县域特色产业，要因地制宜选择主导产业和发展路径。",
        source: "基层治理与乡村振兴材料",
      },
      {
        id: "3",
        word: "统筹协调",
        pinyin: "tǒng chóu xié tiáo",
        partOfSpeech: "动词",
        tags: ["综合管理"],
        definition: "对多方面工作进行全面衡量和整体安排，使各部门、各层级相互配合、协调运转。",
        example: "要统筹协调推进城乡一体化发展，促进资源要素合理流动。",
        source: "政府工作报告、公文写作常用词",
      },
    ],
  },
  {
    id: "shared-prosperity",
    title: "公平发展辨析",
    type: "申论高频",
    description: "辨析共同富裕、均衡发展和协调发展在材料分析中的侧重点。",
    examHint: "适合积累为综合分析题和大作文的规范表达。",
    masteredCount: 1,
    words: [
      {
        id: "4",
        word: "共同富裕",
        pinyin: "gòng tóng fù yù",
        partOfSpeech: "名词",
        tags: ["重大战略", "必考考点"],
        definition: "全体人民通过辛勤劳动和相互帮助，在物质生活和精神生活两个层面共同走向富裕的状态。",
        example: "扎实推进共同富裕，是中国式现代化的重要特征和本质要求。",
        source: "党的二十大报告",
      },
      {
        id: "4-2",
        word: "均衡发展",
        pinyin: "jūn héng fā zhǎn",
        partOfSpeech: "名词",
        tags: ["区域协调"],
        definition: "强调不同区域、城乡、群体之间发展水平差距逐步缩小，公共资源配置更加合理。",
        example: "推进义务教育均衡发展，关键是补齐薄弱地区和薄弱学校短板。",
        source: "公共服务均等化相关材料",
      },
      {
        id: "4-3",
        word: "协调发展",
        pinyin: "xié tiáo fā zhǎn",
        partOfSpeech: "名词",
        tags: ["新发展理念"],
        definition: "强调发展中的整体性和协同性，处理好区域、城乡、经济社会等多方面关系。",
        example: "协调发展注重解决发展不平衡问题，增强发展的整体效能。",
        source: "新发展理念相关材料",
      },
    ],
  },
];

function TagPill({ label, tone = "blue" }: { label: string; tone?: "blue" | "gold" | "green" }) {
  const colors = {
    blue: { color: "#2B5FBF", bg: "#EEF3FF" },
    gold: { color: "#8A6A10", bg: "#FBF4E0" },
    green: { color: "#2E7A3C", bg: "#EAF5EC" },
  }[tone];

  return (
    <span
      className="whitespace-nowrap rounded-[6px] px-[7px] py-[2px] font-['Noto_Sans_SC:Medium',sans-serif] text-[11px] font-medium"
      style={{ color: colors.color, backgroundColor: colors.bg }}
    >
      {label}
    </span>
  );
}

function MiniVocabCard({
  item,
  index,
}: {
  item: VocabItem;
  index: number;
}) {
  const transforms = [
    "translateY(0px) scale(1)",
    "translateY(12px) scale(0.955)",
    "translateY(24px) scale(0.91)",
  ];
  const opacity = [1, 0.74, 0.48][index] ?? 0.4;

  return (
    <div
      className="absolute left-0 right-0 rounded-[18px] bg-white p-[16px]"
      style={{
        top: 0,
        zIndex: 10 - index,
        opacity,
        transform: transforms[index] ?? transforms[2],
        boxShadow:
          index === 0
            ? "0 14px 32px rgba(27,45,79,0.11), 0 0 0 0.833px rgba(27,45,79,0.07)"
            : "0 10px 24px rgba(27,45,79,0.08), 0 0 0 0.833px rgba(27,45,79,0.05)",
      }}
    >
      <div className="mb-[8px] flex items-start justify-between gap-[10px]">
        <div>
          <p className="font-['Noto_Sans_SC:Bold',sans-serif] text-[20px] font-bold leading-[25px] tracking-[-0.3px] text-[#1B2D4F]">
            {item.word}
          </p>
          {item.pinyin && (
            <p className="mt-[2px] font-['Noto_Sans_SC:Regular',sans-serif] text-[11.5px] tracking-[0.45px] text-[#7A8FA6]">
              {item.pinyin}
            </p>
          )}
        </div>
        <TagPill label={item.partOfSpeech} />
      </div>
      <p className="line-clamp-2 font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] leading-[21px] text-[#53697f]">
        {item.definition}
      </p>
    </div>
  );
}

function VocabStackCard({
  group,
  onOpen,
}: {
  group: VocabGroup;
  onOpen: () => void;
}) {
  const progress = Math.round((group.masteredCount / group.words.length) * 100);

  return (
    <button
      onClick={onOpen}
      className="vocab-stack-pressable relative mx-4 mb-6 block w-[calc(100%-32px)] text-left"
      aria-label={`打开${group.title}`}
    >
      <div className="mb-[10px] flex items-center justify-between px-[2px]">
        <div className="flex items-center gap-[8px]">
          <span className="flex h-[28px] w-[28px] items-center justify-center rounded-[9px] bg-[#eef3ff]">
            <Layers3 size={15} color="#1E3A5F" strokeWidth={1.9} />
          </span>
          <div>
            <p className="font-['Noto_Sans_SC:Bold',sans-serif] text-[16px] font-bold text-[#1B2D4F]">
              {group.title}
            </p>
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#8da0b4]">
              {group.words.length} 张词卡 · {group.type}
            </p>
          </div>
        </div>
        <ChevronRight size={17} color="#9BAABB" strokeWidth={2} />
      </div>

      <div className="relative h-[150px]">
        {group.words.slice(0, 3).map((item, index) => (
          <MiniVocabCard key={item.id} item={item} index={index} />
        ))}
      </div>

      <div
        className="relative mt-[8px] rounded-[14px] bg-[#f7f9fc] px-[13px] py-[11px]"
        style={{ boxShadow: "0 0 0 0.833px rgba(27,45,79,0.04)" }}
      >
        <p className="mb-[6px] font-['Noto_Sans_SC:Medium',sans-serif] text-[12px] font-medium text-[#7a8fa6]">
          辨析提醒
        </p>
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12.5px] leading-[20px] text-[#40566d]">
          {group.examHint}
        </p>
        <div className="mt-[10px] flex items-center justify-between">
          <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#8da0b4]">
            已掌握 {group.masteredCount}/{group.words.length}
          </span>
          <div className="flex items-center gap-[7px]">
            <div className="h-[4px] w-[66px] overflow-hidden rounded-full bg-[#e4e9f0]">
              <div className="h-full rounded-full bg-[#1E3A5F]" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function ModalStackPreview({
  words,
  activeIndex,
}: {
  words: VocabItem[];
  activeIndex: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-[20px] top-[34px] z-0 h-[330px]">
      {[2, 1].map((offset) => {
        const item = words[(activeIndex + offset) % words.length];
        return (
          <div
            key={`${item.id}-${offset}`}
            className="absolute inset-x-0 rounded-[22px] bg-white"
            style={{
              height: 318,
              transform: `translateY(${offset * 10}px) scale(${1 - offset * 0.035})`,
              opacity: offset === 1 ? 0.46 : 0.24,
              boxShadow: "0 14px 34px rgba(4,16,32,0.16)",
            }}
          />
        );
      })}
    </div>
  );
}
function VocabDetailCard({ item }: { item: VocabItem }) {
  const [added, setAdded] = useState(false);

  return (
    <div
      className="min-h-[360px] rounded-[22px] bg-white p-[18px]"
      style={{
        boxShadow: "0 18px 42px rgba(27,45,79,0.16), 0 0 0 0.833px rgba(27,45,79,0.06)",
      }}
    >
      <div className="mb-[10px] flex items-start justify-between gap-[12px]">
        <div>
          <p className="font-['Noto_Sans_SC:Bold',sans-serif] text-[24px] font-bold leading-[32px] tracking-[-0.4px] text-[#1B2D4F]">
            {item.word}
          </p>
          {item.pinyin && (
            <p className="mt-[2px] font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] tracking-[0.5px] text-[#7A8FA6]">
              {item.pinyin}
            </p>
          )}
        </div>
        <div className="flex items-center gap-[8px]">
          <button className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#f2f6fb]">
            <Volume2 size={15} color="#6d8196" strokeWidth={1.8} />
          </button>
          <button
            onClick={() => setAdded(!added)}
            className="flex h-[32px] items-center gap-[5px] rounded-full px-[10px]"
            style={{
              backgroundColor: added ? "#EEF3FF" : "#f7f9fc",
              color: added ? "#2B5FBF" : "#7A8FA6",
            }}
          >
            {added ? <Check size={13} /> : <BookmarkPlus size={13} />}
            <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[11px] font-medium">
              {added ? "已加入" : "生词本"}
            </span>
          </button>
        </div>
      </div>

      <div className="mb-[14px] flex flex-wrap gap-[7px]">
        <TagPill label={item.partOfSpeech} />
        {item.tags.map((tag) => (
          <TagPill key={tag} label={tag} tone="gold" />
        ))}
      </div>

      <div className="mb-[14px] rounded-[16px] bg-[#f7f9fc] p-[14px]">
        <p className="mb-[6px] font-['Noto_Sans_SC:Bold',sans-serif] text-[12px] font-bold text-[#7A8FA6]">
          解释
        </p>
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] leading-[24px] text-[#2E4057]">
          {item.definition}
        </p>
      </div>

      <div className="rounded-[16px] bg-[#f4f7fb] p-[14px]">
        <p className="mb-[6px] font-['Noto_Sans_SC:Bold',sans-serif] text-[12px] font-bold text-[#7A8FA6]">
          例句
        </p>
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13.5px] leading-[23px] text-[#4A6070]">
          {item.example}
        </p>
      </div>

      <p className="mt-[12px] font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#B0BEC8]">
        来源：{item.source}
      </p>
    </div>
  );
}

function VocabGroupSheet({
  group,
  onClose,
}: {
  group: VocabGroup;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const activeItem = group.words[activeIndex];

  const go = (direction: -1 | 1) => {
    setActiveIndex((current) => {
      const next = current + direction;
      if (next < 0) return group.words.length - 1;
      if (next >= group.words.length) return 0;
      return next;
    });
  };

  return (
    <motion.div
      className="absolute inset-0 z-[80] flex items-center justify-center bg-[rgba(10,18,30,0.48)] px-[18px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-[360px]"
        initial={{ y: 18, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 18, scale: 0.96 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <ModalStackPreview words={group.words} activeIndex={activeIndex} />

        <div className="relative z-10 rounded-[28px] bg-[#eef3f8] p-[12px] shadow-[0_24px_70px_rgba(0,0,0,0.26)]">
          <button
            onClick={onClose}
            className="absolute right-[-8px] top-[-10px] z-30 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white shadow-[0_4px_14px_rgba(27,45,79,0.12)]"
            aria-label="关闭词汇辨析"
          >
            <X size={17} color="#52677E" strokeWidth={2} />
          </button>

          <div
            className="relative"
            onPointerDown={(event) => setDragStart(event.clientX)}
            onPointerUp={(event) => {
              if (dragStart === null) return;
              const delta = event.clientX - dragStart;
              if (Math.abs(delta) > 42) go(delta < 0 ? 1 : -1);
              setDragStart(null);
            }}
            onPointerCancel={() => setDragStart(null)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 28, rotate: 1.5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: -24, rotate: -1.2 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <VocabDetailCard item={activeItem} />
            </motion.div>
          </AnimatePresence>

            <button
              onClick={() => go(-1)}
              className="absolute left-[-6px] top-1/2 z-20 flex h-[36px] w-[36px] -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[0_8px_22px_rgba(27,45,79,0.16)]"
              aria-label="上一个词语"
            >
              <ChevronLeft size={19} color="#1E3A5F" strokeWidth={2.1} />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-[-6px] top-1/2 z-20 flex h-[36px] w-[36px] -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[0_8px_22px_rgba(27,45,79,0.16)]"
              aria-label="下一个词语"
            >
              <ChevronRight size={19} color="#1E3A5F" strokeWidth={2.1} />
            </button>
          </div>

          <div className="mt-[12px] flex items-center justify-center">
            <div className="flex items-center gap-[6px]">
              {group.words.map((word, index) => (
                <button
                  key={word.id}
                  onClick={() => setActiveIndex(index)}
                  className="h-[6px] rounded-full transition-all"
                  style={{
                    width: activeIndex === index ? 18 : 6,
                    backgroundColor: activeIndex === index ? "#1E3A5F" : "#c9d4e0",
                  }}
                  aria-label={`切换到${word.word}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function VocabTab() {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const selectedGroup = useMemo(
    () => vocabGroups.find((group) => group.id === selectedGroupId) ?? null,
    [selectedGroupId],
  );

  return (
    <div className="pt-1 pb-4">
      <div className="mx-4 mb-3 flex items-center justify-between">
        <span style={{ fontSize: 12, color: "#9BAABB" }}>
          今日 3 组 · 9 个词 · 累计掌握 127 词
        </span>
        <div className="flex items-center gap-1.5">
          <div
            className="overflow-hidden rounded-full"
            style={{ width: 72, height: 4, backgroundColor: "#E4E9F0" }}
          >
            <div
              className="h-full rounded-full"
              style={{ width: "32%", backgroundColor: "#1E3A5F" }}
            />
          </div>
          <span style={{ fontSize: 11, color: "#9BAABB" }}>32%</span>
        </div>
      </div>

      {vocabGroups.map((group) => (
        <VocabStackCard
          key={group.id}
          group={group}
          onOpen={() => setSelectedGroupId(group.id)}
        />
      ))}

      <p className="text-center mt-2" style={{ fontSize: 11, color: "#B8C5D0" }}>
        成组辨析，减少混淆
      </p>

      <AnimatePresence>
        {selectedGroup && (
          <VocabGroupSheet group={selectedGroup} onClose={() => setSelectedGroupId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
