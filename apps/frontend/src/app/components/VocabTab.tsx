import { useState } from "react";
import { BookmarkPlus, Check, Volume2 } from "lucide-react";

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

const vocabData: VocabItem[] = [
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
    id: "2",
    word: "精准施策",
    pinyin: "jīng zhǔn shī cè",
    partOfSpeech: "动词",
    tags: ["行政管理"],
    definition: "针对不同地区、不同群体、不同问题，制定并采取精确、有针对性的政策措施，避免\"一刀切\"。",
    example: "各地要因地制宜、精准施策，结合本地实际推动经济社会发展。",
    source: "中央政策文件常用表述",
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
];

function VocabCard({ item }: { item: VocabItem }) {
  const [added, setAdded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white mx-4 mb-3 overflow-hidden"
      style={{
        borderRadius: 12,
        boxShadow: "0 1px 6px rgba(0,0,0,0.05), 0 0 0 0.5px rgba(0,0,0,0.05)",
      }}
    >
      {/* Left accent bar */}
      <div className="flex">
        <div
          className="flex-shrink-0"
          style={{ width: 3, backgroundColor: "#1E3A5F", borderRadius: "12px 0 0 12px" }}
        />
        <div className="flex-1 p-4">
          {/* Word row */}
          <div className="flex items-start justify-between mb-1">
            <div>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#1B2D4F",
                  letterSpacing: -0.3,
                }}
              >
                {item.word}
              </span>
              {item.pinyin && (
                <p
                  style={{ fontSize: 12, color: "#7A8FA6", marginTop: 2, letterSpacing: 0.5 }}
                >
                  {item.pinyin}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <button style={{ opacity: 0.5 }}>
                <Volume2 size={15} color="#7A8FA6" />
              </button>
              <button
                onClick={() => setAdded(!added)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md transition-all"
                style={{
                  backgroundColor: added ? "#EEF3FF" : "transparent",
                  border: added ? "none" : "1px solid rgba(0,0,0,0.1)",
                }}
              >
                {added ? (
                  <Check size={12} color="#2B5FBF" />
                ) : (
                  <BookmarkPlus size={12} color="#9BAABB" />
                )}
                <span
                  style={{
                    fontSize: 11,
                    color: added ? "#2B5FBF" : "#9BAABB",
                    fontWeight: 500,
                  }}
                >
                  {added ? "已加入" : "生词本"}
                </span>
              </button>
            </div>
          </div>

          {/* Tags row */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span
              style={{
                fontSize: 11,
                color: "#2B5FBF",
                backgroundColor: "#EEF3FF",
                padding: "1px 7px",
                borderRadius: 4,
                fontWeight: 500,
              }}
            >
              {item.partOfSpeech}
            </span>
            {item.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 11,
                  color: "#8A6A10",
                  backgroundColor: "#FBF4E0",
                  padding: "1px 7px",
                  borderRadius: 4,
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Definition */}
          <p
            style={{
              fontSize: 13.5,
              color: "#2E4057",
              lineHeight: 1.65,
              marginBottom: 10,
            }}
          >
            {item.definition}
          </p>

          {/* Example */}
          <div
            className="rounded-lg p-3"
            style={{ backgroundColor: "#F5F7FA" }}
          >
            <p
              style={{
                fontSize: 11,
                color: "#9BAABB",
                fontWeight: 600,
                letterSpacing: 0.5,
                marginBottom: 4,
              }}
            >
              例句
            </p>
            <p
              style={{
                fontSize: 13,
                color: "#4A6070",
                lineHeight: 1.6,
                fontStyle: "italic",
              }}
            >
              {item.example}
            </p>
          </div>

          {/* Source */}
          <p
            style={{
              fontSize: 11,
              color: "#B0BEC8",
              marginTop: 8,
            }}
          >
            来源：{item.source}
          </p>
        </div>
      </div>
    </div>
  );
}

export function VocabTab() {
  return (
    <div className="pt-1 pb-4">
      {/* Progress hint */}
      <div className="mx-4 mb-3 flex items-center justify-between">
        <span style={{ fontSize: 12, color: "#9BAABB" }}>今日 4 词 · 累计掌握 127 词</span>
        <div className="flex items-center gap-1.5">
          <div
            className="rounded-full overflow-hidden"
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

      {vocabData.map((item) => (
        <VocabCard key={item.id} item={item} />
      ))}

      <p
        className="text-center mt-2"
        style={{ fontSize: 11, color: "#B8C5D0" }}
      >
        每日词汇，持续积累
      </p>
    </div>
  );
}
