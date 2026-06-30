export type RssSourceCategory = "politics" | "society" | "economy" | "legal" | "theory";

export type RssSource = {
  id: string;
  name: string;
  url: string;
  category: RssSourceCategory;
  authority: "state-media";
  examValue: string;
  enabled: boolean;
};

export const rssSources: RssSource[] = [
  {
    id: "chinanews-importnews",
    name: "中新网要闻导读",
    url: "https://www.chinanews.com.cn/rss/importnews.xml",
    category: "politics",
    authority: "state-media",
    examValue: "每日重点新闻、时政热点、申论素材",
    enabled: true
  },
  {
    id: "chinanews-politics",
    name: "中新网时政新闻",
    url: "https://www.chinanews.com.cn/rss/china.xml",
    category: "politics",
    authority: "state-media",
    examValue: "时政热点、政策表达、公共治理素材",
    enabled: true
  },
  {
    id: "chinanews-society",
    name: "中新网社会新闻",
    url: "https://www.chinanews.com.cn/rss/society.xml",
    category: "society",
    authority: "state-media",
    examValue: "社会治理、民生热点、基层治理素材",
    enabled: true
  },
  {
    id: "chinanews-finance",
    name: "中新网财经新闻",
    url: "https://www.chinanews.com.cn/rss/finance.xml",
    category: "economy",
    authority: "state-media",
    examValue: "宏观经济、产业发展、就业民生、申论经济素材",
    enabled: true
  },
  {
    id: "chinanews-legal",
    name: "中新网法治新闻",
    url: "https://www.chinanews.com.cn/rss/fz.xml",
    category: "legal",
    authority: "state-media",
    examValue: "法治常识、依法治国、社会治理案例",
    enabled: true
  },
  {
    id: "chinanews-theory",
    name: "中新网理论评论",
    url: "https://www.chinanews.com.cn/rss/theory.xml",
    category: "theory",
    authority: "state-media",
    examValue: "政治理论、评论表达、申论规范表述",
    enabled: true
  }
];
