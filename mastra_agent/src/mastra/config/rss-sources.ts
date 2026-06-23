export type RssSourceCategory = 'politics' | 'tech' | 'legal' | 'society' | 'economy'

export type RssSource = {
  id: string
  name: string
  url: string
  category: RssSourceCategory
  authority: 'official' | 'state-media'
  examValue: string
}

export const rssSources: RssSource[] = [
  {
    id: 'xinhua-politics',
    name: '新华网时政',
    url: 'http://www.xinhuanet.com/politics/news_politics.xml',
    category: 'politics',
    authority: 'state-media',
    examValue: '时政热点、政策表述、申论素材',
  },
  {
    id: 'xinhua-tech',
    name: '新华网科技',
    url: 'http://www.xinhuanet.com/tech/news_tech.xml',
    category: 'tech',
    authority: 'state-media',
    examValue: '科技常识、新质生产力、科技创新素材',
  },
  {
    id: 'xinhua-legal',
    name: '新华网法治',
    url: 'http://www.xinhuanet.com/legal/news_legal.xml',
    category: 'legal',
    authority: 'state-media',
    examValue: '法治常识、依法治国、公共治理素材',
  },
  {
    id: 'people-politics',
    name: '人民网时政',
    url: 'http://www.people.com.cn/rss/politics.xml',
    category: 'politics',
    authority: 'state-media',
    examValue: '中央政策、重要会议、政治理论素材',
  },
  {
    id: 'people-society',
    name: '人民网社会',
    url: 'http://www.people.com.cn/rss/society.xml',
    category: 'society',
    authority: 'state-media',
    examValue: '基层治理、民生热点、社会现象素材',
  },
  {
    id: 'people-legal',
    name: '人民网法治',
    url: 'http://www.people.com.cn/rss/legal.xml',
    category: 'legal',
    authority: 'state-media',
    examValue: '法律常识、法治热点、案例素材',
  },
  {
    id: 'stats-latest',
    name: '国家统计局最新发布',
    url: 'https://www.stats.gov.cn/sj/zxfb/rss',
    category: 'economy',
    authority: 'official',
    examValue: '宏观经济、就业、人口、产业数据素材',
  },
]
