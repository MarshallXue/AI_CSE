// RSS 信源配置表

export type RssSourceCategory =
  | 'politics' // 时政/要闻
  | 'society'  // 社会民生/基层治理
  | 'economy'  // 财经/宏观经济
  | 'legal'    // 法治
  | 'theory'   // 理论评论

export type RssSource = {
  // 程序内部唯一标识，稳定后尽量不要改
  id: string

  // 给用户、日志、后台看的来源名称
  name: string

  // RSS 订阅地址
  url: string

  // 公考内容分类
  category: RssSourceCategory

  // 来源权威性。中新网属于主流媒体源
  authority: 'state-media'

  // 这个来源对公考备考的价值
  examValue: string

  // 是否启用该来源
  enabled: boolean

  // 是否根据 RSS 里的文章链接继续抓取原文
  fullText: boolean

  // 抓取原文前要移除的页面元素
  removeSelectors?: string[]
}

export const rssSources: RssSource[] = [
  {
    id: 'chinanews-importnews',
    name: '中新网要闻导读',
    url: 'https://www.chinanews.com.cn/rss/importnews.xml',
    category: 'politics',
    authority: 'state-media',
    examValue: '每日重点新闻、时政热点、申论素材',
    enabled: true,
    fullText: true,
    removeSelectors: ['script', 'style', 'nav', 'footer'],
  },
  {
    id: 'chinanews-politics',
    name: '中新网时政新闻',
    url: 'https://www.chinanews.com.cn/rss/china.xml',
    category: 'politics',
    authority: 'state-media',
    examValue: '时政热点、政策表达、公共治理素材',
    enabled: true,
    fullText: true,
    removeSelectors: ['script', 'style', 'nav', 'footer'],
  },
  {
    id: 'chinanews-society',
    name: '中新网社会新闻',
    url: 'https://www.chinanews.com.cn/rss/society.xml',
    category: 'society',
    authority: 'state-media',
    examValue: '社会治理、民生热点、基层治理素材',
    enabled: true,
    fullText: true,
    removeSelectors: ['script', 'style', 'nav', 'footer'],
  },
  {
    id: 'chinanews-finance',
    name: '中新网财经新闻',
    url: 'https://www.chinanews.com.cn/rss/finance.xml',
    category: 'economy',
    authority: 'state-media',
    examValue: '宏观经济、产业发展、就业民生、申论经济素材',
    enabled: true,
    fullText: true,
    removeSelectors: ['script', 'style', 'nav', 'footer'],
  },
  {
    id: 'chinanews-legal',
    name: '中新网法治新闻',
    url: 'https://www.chinanews.com.cn/rss/fz.xml',
    category: 'legal',
    authority: 'state-media',
    examValue: '法治常识、依法治国、社会治理案例',
    enabled: true,
    fullText: true,
    removeSelectors: ['script', 'style', 'nav', 'footer'],
  },
  {
    id: 'chinanews-theory',
    name: '中新网理论评论',
    url: 'https://www.chinanews.com.cn/rss/theory.xml',
    category: 'theory',
    authority: 'state-media',
    examValue: '政治理论、评论表达、申论规范表述',
    enabled: true,
    fullText: true,
    removeSelectors: ['script', 'style', 'nav', 'footer'],
  },
]