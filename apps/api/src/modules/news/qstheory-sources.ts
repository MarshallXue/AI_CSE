export type QstheorySourcePriority = "high" | "medium" | "low";

export type QstheorySource = {
  id: string;
  name: string;
  url: string;
  category: string;
  priority: QstheorySourcePriority;
  enabled: boolean;
};

export const qstheorySources: QstheorySource[] = [
  {
    id: "qstheory-llwx",
    name: "理论文选",
    url: "https://www.qstheory.cn/qszq/llwx/index.htm",
    category: "theory",
    priority: "high",
    enabled: true
  },
  {
    id: "qstheory-sddy",
    name: "深度调研",
    url: "https://www.qstheory.cn/v9zhuanqu/zhuanqu/sddy/index.htm",
    category: "research",
    priority: "high",
    enabled: true
  },
  {
    id: "qstheory-qszf",
    name: "求是专访",
    url: "https://www.qstheory.cn/v9zhuanqu/zhuanqu/qszf/index.htm",
    category: "interview",
    priority: "high",
    enabled: true
  },
  {
    id: "qstheory-xxwd",
    name: "学习问答",
    url: "https://www.qstheory.cn/v9zhuanqu/zhuanqu/xxwd/index.htm",
    category: "qa",
    priority: "high",
    enabled: true
  },
  {
    id: "qstheory-qswp",
    name: "求是网评",
    url: "https://www.qstheory.cn/qswp.htm",
    category: "commentary",
    priority: "high",
    enabled: true
  }
];
