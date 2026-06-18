import { useState } from 'react';
import { Bookmark, Share2, Download, FileText } from 'lucide-react';
import {
  IOSStatusBar, BackNav, AIInputBar, BottomNav,
  NavigateFn, Tag, SectionCard,
} from './shared';

interface Props {
  navigate: NavigateFn;
  goBack: () => void;
  onTabChange: (tab: 'today' | 'wrongbank' | 'review' | 'profile') => void;
}

// ─── Page 1: News Detail ────────────────────────────────────────────────────

export function NewsDetailPage({ navigate, goBack, onTabChange }: Props) {
  const [selectedSentence, setSelectedSentence] = useState(true);

  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-hidden">
      <IOSStatusBar />
      <BackNav
        title="每日时政精读"
        onBack={goBack}
        right={
          <div className="flex items-center gap-[10px]">
            <button className="active:opacity-60"><Bookmark size={18} strokeWidth={1.8} className="text-[#6b7e94]"/></button>
            <button className="active:opacity-60">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="4.5" cy="9" r="1.5" fill="#6b7e94"/>
                <circle cx="9" cy="9" r="1.5" fill="#6b7e94"/>
                <circle cx="13.5" cy="9" r="1.5" fill="#6b7e94"/>
              </svg>
            </button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto">
        {/* Title area */}
        <div className="px-[20px] pt-[20px] pb-[16px]">
          <h1 className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[20px] leading-[30px] text-[#1b2d4f] tracking-[-0.3px]">
            农业农村部：夏粮丰收在望，粮食安全形势持续向好
          </h1>
          <div className="flex items-center gap-[6px] mt-[12px] flex-wrap">
            <Tag label="三农政策" bg="#eaf5ec" color="#2e7a3c"/>
            <Tag label="粮食安全" bg="#fbf4e0" color="#8a6a10"/>
            <Tag label="乡村振兴" bg="#eef3ff" color="#2b5fbf"/>
          </div>
          <p className="font-['Noto_Sans_SC:Regular',sans-serif] font-normal text-[12px] text-[#9baabb] mt-[10px]">
            官方材料精读 · 预计阅读 3 分钟
          </p>
          <div className="h-[1px] bg-[rgba(0,0,0,0.06)] mt-[16px]"/>
        </div>

        {/* Article body */}
        <div className="px-[20px] pb-[16px]">
          <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] leading-[30px] text-[#2c3e52]">
            近期，农业农村部发布最新监测数据，全国冬小麦长势良好，主产区苗情整体优于往年同期，预计今年夏粮总产量将再创新高。各地积极落实藏粮于地、藏粮于技战略，高标准农田建设持续推进，良种覆盖率大幅提升。
          </p>

          <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] leading-[30px] text-[#2c3e52] mt-[16px]">
            在农业科技赋能方面，无人机植保、智慧灌溉、精准施肥等现代农业技术已在全国范围内广泛推广。科技进步对粮食单产提升的贡献率超过60%，成为保障粮食安全的重要力量。
          </p>

          {/* Highlighted sentence */}
          <div className="relative mt-[16px]">
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] leading-[30px] text-[#2c3e52]">
              耕地保护政策方面，各地严守18亿亩耕地红线，坚决遏制耕地"非农化"、防止"非粮化"。
              {' '}
              <span
                className="bg-[#fff3b0] px-[2px] rounded-[3px] cursor-pointer relative"
                onClick={() => setSelectedSentence(!selectedSentence)}
              >
                粮食安全是国之大者，必须把饭碗牢牢端在自己手中。
              </span>
              {' '}
              这是中央着眼长远做出的战略安排，也是对历史规律的深刻总结。
            </p>

            {/* Floating AI button */}
            {selectedSentence && (
              <button
                onClick={() => navigate('ai-read')}
                className="absolute right-0 top-[80px] bg-[#1e3a5f] text-white rounded-[20px] px-[10px] py-[5px] flex items-center gap-[4px] active:opacity-80"
                style={{ boxShadow: '0 2px 8px rgba(30,58,95,0.35)' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5.5" stroke="white" strokeWidth="1"/>
                  <path d="M4 6h4M6 4v4" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[11px]">问AI</span>
              </button>
            )}
          </div>

          <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] leading-[30px] text-[#2c3e52] mt-[16px]">
            乡村振兴方面，农业农村部强调要持续推进农村一二三产业融合发展，拓宽农民增收渠道，促进农业高质量发展，确保农村居民收入增速继续高于城镇居民。
          </p>
        </div>

        {/* Learning modules */}
        <div className="px-[16px] pb-[8px]">
          {/* AI考点提炼 */}
          <SectionCard className="mb-[12px]">
            <div className="p-[16px]">
              <div className="flex items-center gap-[8px] mb-[12px]">
                <div className="w-[3px] h-[16px] bg-[#2b5fbf] rounded-full"/>
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">AI 考点提炼</p>
              </div>
              {[
                { tag: '粮食安全', desc: '国家粮食安全战略、18亿亩耕地红线、藏粮于地' },
                { tag: '农业科技', desc: '现代农业技术对粮食单产的贡献率超60%' },
                { tag: '乡村振兴', desc: '一二三产业融合发展，农民收入增速目标' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-[8px] mb-[10px] last:mb-0">
                  <span className="bg-[#eef3ff] text-[#2b5fbf] text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] font-medium px-[6px] py-[1px] rounded-[6px] flex-shrink-0 mt-[2px]">
                    {item.tag}
                  </span>
                  <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#4a5e73] leading-[20px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* 可能考法 */}
          <SectionCard className="mb-[12px]">
            <div className="p-[16px]">
              <div className="flex items-center gap-[8px] mb-[12px]">
                <div className="w-[3px] h-[16px] bg-[#c09a30] rounded-full"/>
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">可能考法</p>
              </div>
              {[
                '【常识题】粮食安全政策的核心举措，耕地红线数字考查',
                '【申论材料题】以夏粮丰收为背景，考查农业发展逻辑',
                '【概念辨析】"藏粮于地"与"藏粮于技"的内涵区分',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-[6px] mb-[8px] last:mb-0">
                  <div className="w-[4px] h-[4px] rounded-full bg-[#c09a30] mt-[8px] flex-shrink-0"/>
                  <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#4a5e73] leading-[22px]">{item}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* 申论可用表达 */}
          <SectionCard className="mb-[12px]">
            <div className="p-[16px]">
              <div className="flex items-center gap-[8px] mb-[12px]">
                <div className="w-[3px] h-[16px] bg-[#2e7a3c] rounded-full"/>
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">申论可用表达</p>
              </div>
              <div className="bg-[#f7fdf8] rounded-[8px] p-[12px] border-l-[3px] border-[#2e7a3c] mb-[8px]">
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#2c3e52] leading-[22px] italic">
                  "粮食安全是国之大者，必须把饭碗牢牢端在自己手中，坚守耕地红线，深化农业科技赋能。"
                </p>
              </div>
              <div className="bg-[#f7fdf8] rounded-[8px] p-[12px] border-l-[3px] border-[#2e7a3c]">
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#2c3e52] leading-[22px] italic">
                  "推动藏粮于地、藏粮于技战略落地见效，以科技创新驱动农业现代化，保障国家粮食安全。"
                </p>
              </div>
            </div>
          </SectionCard>

          {/* 配套练习 */}
          <SectionCard className="mb-[16px]">
            <div className="p-[16px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[3px] h-[16px] bg-[#8b5cf6] rounded-full"/>
                  <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">配套练习</p>
                </div>
                <span className="bg-[#f0f0f8] text-[#7a8fa6] text-[11px] font-['Noto_Sans_SC:Regular',sans-serif] px-[8px] py-[2px] rounded-[6px]">
                  已生成一次
                </span>
              </div>
              <div className="flex items-center gap-[12px] mt-[12px]">
                <div className="flex items-center gap-[6px]">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#2b5fbf]"/>
                  <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#4a5e73]">选择题 2 道</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#c09a30]"/>
                  <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#4a5e73]">判断题 1 道</span>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Action buttons */}
        <div className="px-[16px] pb-[16px]">
          <button
            onClick={() => navigate('practice')}
            className="w-full py-[14px] rounded-[12px] bg-[#1e3a5f] text-white font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[15px] mb-[10px] active:opacity-80"
            style={{ boxShadow: '0px 2px 6px rgba(30,58,95,0.3)' }}
          >
            开始练习
          </button>
          <div className="flex gap-[10px]">
            <button
              onClick={() => navigate('export-preview')}
              className="flex-1 py-[12px] rounded-[12px] bg-white font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[14px] text-[#1e3a5f] active:opacity-80 flex items-center justify-center gap-[6px]"
              style={{ border: '1px solid #dce5f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
            >
              <Download size={14} strokeWidth={2}/>
              导出讲义
            </button>
            <button
              className="flex-1 py-[12px] rounded-[12px] bg-white font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[14px] text-[#1e3a5f] active:opacity-80 flex items-center justify-center gap-[6px]"
              style={{ border: '1px solid #dce5f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
            >
              <FileText size={14} strokeWidth={2}/>
              加入资料夹
            </button>
          </div>
        </div>
      </div>

      <AIInputBar onFocus={() => navigate('ai-read')} />
      <BottomNav activeTab="today" onTabChange={onTabChange} />
    </div>
  );
}

// ─── Page 2: AI Companion Focused State ─────────────────────────────────────

export function AIReadPage({ navigate, goBack, onTabChange }: Props) {
  const [activeSkill, setActiveSkill] = useState('基础拆解');
  const skills = ['基础拆解', '考点提炼', '申论表达', '出题预测'];

  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-hidden">
      <IOSStatusBar />
      <BackNav title="每日时政精读" onBack={goBack}
        right={<div className="flex items-center gap-[10px]">
          <button className="active:opacity-60"><Bookmark size={18} strokeWidth={1.8} className="text-[#6b7e94]"/></button>
        </div>}
      />

      {/* Article (compressed view) */}
      <div className="flex-1 overflow-y-auto px-[20px] pt-[12px]">
        <h2 className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[17px] leading-[26px] text-[#1b2d4f] tracking-[-0.2px] mb-[12px]">
          农业农村部：夏粮丰收在望，粮食安全形势持续向好
        </h2>
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] leading-[28px] text-[#2c3e52] mb-[12px]">
          近期，农业农村部发布最新监测数据，全国冬小麦长势良好，预计今年夏粮总产量将再创新高。
        </p>
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] leading-[28px] text-[#2c3e52] mb-[12px]">
          在农业科技赋能方面，无人机植保、智慧灌溉、精准施肥等现代农业技术已广泛推广。
        </p>

        {/* Quoted/selected text */}
        <div className="bg-[#fff3b0] rounded-[8px] px-[14px] py-[10px] mb-[12px] border-l-[3px] border-[#c09a30]">
          <p className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[14px] text-[#2c3e52] leading-[24px]">
            "粮食安全是国之大者，必须把饭碗牢牢端在自己手中。"
          </p>
          <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#8a6a10] mt-[4px]">已选中 · 正在分析</p>
        </div>

        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] leading-[28px] text-[#2c3e52]">
          乡村振兴方面，持续推进农村一二三产业融合发展，拓宽农民增收渠道…
        </p>

        <div className="h-[8px]"/>
      </div>

      {/* AI panel (above input bar) */}
      <div
        className="flex-shrink-0 mx-[0px] rounded-t-[20px] bg-white"
        style={{ boxShadow: '0px -4px 20px rgba(0,0,0,0.1)', border: '0.5px solid rgba(0,0,0,0.06)' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-[10px] pb-[6px]">
          <div className="w-[36px] h-[4px] bg-[#d0d8e4] rounded-full"/>
        </div>

        {/* Skill tabs */}
        <div className="flex items-center gap-[6px] px-[16px] pb-[10px] overflow-x-auto no-scrollbar">
          {skills.map(skill => (
            <button
              key={skill}
              onClick={() => setActiveSkill(skill)}
              className={`px-[12px] py-[5px] rounded-[20px] text-[12px] whitespace-nowrap flex-shrink-0 font-['Noto_Sans_SC:Medium',sans-serif] font-medium active:opacity-70 ${
                activeSkill === skill
                  ? 'bg-[#1e3a5f] text-white'
                  : 'bg-[#f0f4f8] text-[#6b7e94]'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>

        {/* AI answer */}
        <div className="px-[16px] max-h-[220px] overflow-y-auto">
          <div className="flex items-start gap-[8px] mb-[10px]">
            <div className="w-[24px] h-[24px] rounded-full bg-[#eef3ff] flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-[#2b5fbf]">AI</span>
            </div>
            <div className="flex-1">
              <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[13px] text-[#1b2d4f] mb-[8px]">
                怎么理解这句话
              </p>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#4a5e73] leading-[22px] mb-[10px]">
                这句话是习近平总书记对粮食安全战略重要性的高度概括，强调中国人的饭碗要由中国人自己来端，不能依赖进口解决粮食问题。
              </p>

              <div className="bg-[#fbf4e0] rounded-[8px] p-[10px] mb-[8px]">
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[12px] text-[#8a6a10] mb-[4px]">常识题考点</p>
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#6b5a20] leading-[20px]">
                  18亿亩耕地红线 · 藏粮于地、藏粮于技 · 粮食安全党政同责
                </p>
              </div>

              <div className="bg-[#f7fdf8] rounded-[8px] p-[10px] mb-[8px]">
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[12px] text-[#2e7a3c] mb-[4px]">申论可用表达</p>
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#3a6040] leading-[20px] italic">
                  "把饭碗牢牢端在自己手中，确保粮食生产能力稳步提升"
                </p>
              </div>

              <div className="bg-[#eef3ff] rounded-[8px] p-[10px] mb-[10px]">
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[12px] text-[#2b5fbf] mb-[4px]">可能出题方向</p>
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#3a5090] leading-[20px]">
                  常识单选 / 申论归纳概括题 / 名句引用类写作题
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick action bar */}
        <div className="flex items-center gap-[8px] px-[16px] py-[10px] border-t border-[rgba(0,0,0,0.05)]">
          {['拍照', '截图', '引用文字', '生成练习'].map(action => (
            <button
              key={action}
              className="flex-shrink-0 bg-[#f0f4f8] text-[#6b7e94] text-[11px] font-['Noto_Sans_SC:Regular',sans-serif] px-[10px] py-[5px] rounded-[20px] active:opacity-70"
            >
              {action}
            </button>
          ))}
        </div>

        {/* Input bar inline */}
        <div className="flex items-center gap-[10px] px-[16px] pb-[12px]">
          <div
            className="flex-1 bg-[#f0f4f8] rounded-[16px] h-[40px] flex items-center px-[14px]"
          >
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#aabccc]">继续追问…</p>
          </div>
          <div className="bg-[#1e3a5f] rounded-full w-[32px] h-[32px] flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 11V3M3.5 6.5L7 3l3.5 3.5" stroke="white" strokeWidth="1.47" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <BottomNav activeTab="today" onTabChange={onTabChange} />
    </div>
  );
}

// ─── Page 3: Practice ────────────────────────────────────────────────────────

type Answer = string | null;

export function PracticePage({ navigate, goBack, onTabChange }: Props) {
  const [answers, setAnswers] = useState<Answer[]>([null, null, null]);
  const [submitted, setSubmitted] = useState<boolean[]>([false, false, false]);

  const handleAnswer = (qIdx: number, ans: string) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = ans;
    setAnswers(newAnswers);
  };

  const handleSubmit = (qIdx: number) => {
    const newSubmitted = [...submitted];
    newSubmitted[qIdx] = true;
    setSubmitted(newSubmitted);
  };

  const q1Options = ['A. 推动农业科技赋能，提高粮食综合生产能力', 'B. 减少基层治理投入，降低公共服务成本', 'C. 以城市更新替代乡村建设', 'D. 主要依靠进口保障粮食供给'];
  const q2Options = ['A. 新型城镇化', 'B. 粮食安全与乡村振兴', 'C. 数字政府建设', 'D. 行政处罚程序'];

  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-hidden">
      <IOSStatusBar />
      <BackNav title="配套练习" onBack={goBack} />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[8px]">
        {/* Meta */}
        <div className="bg-white rounded-[12px] p-[14px] mb-[12px]" style={{ boxShadow: '0px 1px 4px rgba(0,0,0,0.05)' }}>
          <p className="font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[13px] text-[#6b7e94] leading-[20px]">
            来源：农业农村部：夏粮丰收在望
          </p>
          <div className="flex items-center gap-[8px] mt-[6px]">
            <Tag label="粮食安全" bg="#fbf4e0" color="#8a6a10"/>
            <Tag label="三农政策" bg="#eaf5ec" color="#2e7a3c"/>
            <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#9baabb] ml-[4px]">已生成一次</span>
          </div>
        </div>

        {/* Q1 - Choice */}
        <QuestionCard
          index={1}
          type="单选题"
          stem={'下列哪项最能体现材料中"粮食安全"的政策导向？'}
          options={q1Options}
          correctIndex={0}
          explanation={'A项正确。材料核心是"藏粮于地、藏粮于技"，推动农业科技赋能，提高粮食综合生产能力是其政策导向的直接体现。B、C、D项均与粮食安全政策导向相悖。'}
          tag="粮食安全 · 农业科技"
          answer={answers[0]}
          isSubmitted={submitted[0]}
          onAnswer={(a) => handleAnswer(0, a)}
          onSubmit={() => handleSubmit(0)}
        />

        {/* Q2 - Choice */}
        <QuestionCard
          index={2}
          type="单选题"
          stem="材料中提到的夏粮丰收，最可能关联以下哪个考点？"
          options={q2Options}
          correctIndex={1}
          explanation="B项正确。夏粮丰收直接关联粮食安全，而粮食安全又与乡村振兴战略密切相关，二者是申论和常识中的高频考点组合。"
          tag="粮食安全 · 乡村振兴"
          answer={answers[1]}
          isSubmitted={submitted[1]}
          onAnswer={(a) => handleAnswer(1, a)}
          onSubmit={() => handleSubmit(1)}
        />

        {/* Q3 - True/False */}
        <div className="bg-white rounded-[12px] p-[16px] mb-[12px]" style={{ boxShadow: '0px 1px 4px rgba(0,0,0,0.05)' }}>
          <div className="flex items-center gap-[8px] mb-[10px]">
            <span className="bg-[#f0f0f8] text-[#6b7e94] text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] px-[8px] py-[2px] rounded-[6px]">判断题</span>
            <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#9baabb]">第 3 题</span>
          </div>
          <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] text-[#1b2d4f] leading-[24px] mb-[14px]">
            保障粮食安全只需要扩大耕地面积，不需要提升农业科技水平。
          </p>

          {!submitted[2] ? (
            <>
              <div className="flex gap-[10px] mb-[12px]">
                {['正确', '错误'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(2, opt)}
                    className={`flex-1 py-[10px] rounded-[10px] font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[14px] border active:opacity-70 ${
                      answers[2] === opt
                        ? 'border-[#1e3a5f] bg-[#eef3fb] text-[#1e3a5f]'
                        : 'border-[#e3e8f0] bg-white text-[#6b7e94]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {answers[2] && (
                <button onClick={() => handleSubmit(2)}
                  className="w-full py-[11px] rounded-[10px] bg-[#1e3a5f] text-white font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] active:opacity-80">
                  提交
                </button>
              )}
            </>
          ) : (
            <div>
              <div className="bg-[#e8f5e9] rounded-[8px] p-[12px] mb-[10px]">
                <div className="flex items-center gap-[6px] mb-[4px]">
                  <div className="w-[14px] h-[14px] rounded-full bg-[#2e7a3c] flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2 3-3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[12px] text-[#2e7a3c]">正确答案：错误</span>
                </div>
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#3a6040] leading-[20px]">
                  粮食安全需要"藏粮于地"（扩大和保护耕地）与"藏粮于技"（提升农业科技）双管齐下，缺一不可。
                </p>
              </div>
              {answers[2] === '正确' && (
                <div className="bg-[#fff3f0] rounded-[8px] p-[10px] mb-[10px]">
                  <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#c84b2f] leading-[20px]">
                    ⚠️ 错因：忽视了农业科技对粮食单产的关键作用（贡献率超60%）
                  </p>
                </div>
              )}
              <div className="flex gap-[8px]">
                <span className="bg-[#fbf4e0] text-[#8a6a10] text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] px-[8px] py-[3px] rounded-[6px]">粮食安全</span>
                <span className="bg-[#eef3ff] text-[#2b5fbf] text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] px-[8px] py-[3px] rounded-[6px]">农业科技</span>
              </div>
              <button className="mt-[10px] w-full py-[10px] rounded-[10px] bg-[#f8f0ff] text-[#7c4daf] font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[13px] active:opacity-70">
                加入错题库
              </button>
            </div>
          )}
        </div>

        {/* Bottom actions */}
        <div className="flex gap-[10px] mb-[8px]">
          <button
            onClick={() => setSubmitted([true, true, true])}
            className="flex-1 py-[12px] rounded-[10px] bg-[#1e3a5f] text-white font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] active:opacity-80"
          >
            提交全部
          </button>
          <button className="flex-1 py-[12px] rounded-[10px] bg-white font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[14px] text-[#1e3a5f] active:opacity-80 border border-[#dce5f0]">
            加入复盘
          </button>
        </div>
        <button className="w-full py-[12px] rounded-[10px] bg-white font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[14px] text-[#6b7e94] active:opacity-80 border border-[#dce5f0]">
          导出练习
        </button>
      </div>

      <BottomNav activeTab="today" onTabChange={onTabChange} />
    </div>
  );
}

function QuestionCard({
  index, type, stem, options, correctIndex, explanation, tag,
  answer, isSubmitted, onAnswer, onSubmit,
}: {
  index: number; type: string; stem: string; options: string[];
  correctIndex: number; explanation: string; tag: string;
  answer: Answer; isSubmitted: boolean;
  onAnswer: (a: string) => void; onSubmit: () => void;
}) {
  const optionLetters = ['A', 'B', 'C', 'D'];
  return (
    <div className="bg-white rounded-[12px] p-[16px] mb-[12px]" style={{ boxShadow: '0px 1px 4px rgba(0,0,0,0.05)' }}>
      <div className="flex items-center gap-[8px] mb-[10px]">
        <span className="bg-[#f0f0f8] text-[#6b7e94] text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] px-[8px] py-[2px] rounded-[6px]">{type}</span>
        <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#9baabb]">第 {index} 题</span>
      </div>
      <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] text-[#1b2d4f] leading-[24px] mb-[14px]">{stem}</p>

      {!isSubmitted ? (
        <>
          <div className="space-y-[8px] mb-[12px]">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => onAnswer(optionLetters[i])}
                className={`w-full text-left px-[12px] py-[10px] rounded-[10px] font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] border active:opacity-70 leading-[22px] ${
                  answer === optionLetters[i]
                    ? 'border-[#1e3a5f] bg-[#eef3fb] text-[#1e3a5f]'
                    : 'border-[#e3e8f0] bg-white text-[#4a5e73]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {answer && (
            <button onClick={onSubmit}
              className="w-full py-[11px] rounded-[10px] bg-[#1e3a5f] text-white font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] active:opacity-80">
              提交
            </button>
          )}
        </>
      ) : (
        <div>
          <div className="space-y-[6px] mb-[10px]">
            {options.map((opt, i) => {
              const letter = optionLetters[i];
              const isCorrect = i === correctIndex;
              const isChosen = answer === letter;
              let cls = 'border-[#e3e8f0] bg-white text-[#4a5e73]';
              if (isCorrect) cls = 'border-[#2e7a3c] bg-[#e8f5e9] text-[#2e7a3c]';
              else if (isChosen && !isCorrect) cls = 'border-[#c84b2f] bg-[#fff3f0] text-[#c84b2f]';
              return (
                <div key={i} className={`px-[12px] py-[10px] rounded-[10px] font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] border leading-[22px] ${cls}`}>
                  {opt}
                  {isCorrect && <span className="ml-[6px] text-[11px]">✓ 正确</span>}
                </div>
              );
            })}
          </div>
          <div className="bg-[#f8fafc] rounded-[8px] p-[12px] mb-[8px]">
            <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[12px] text-[#6b7e94] mb-[4px]">解析</p>
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#4a5e73] leading-[20px]">{explanation}</p>
          </div>
          {answer !== optionLetters[correctIndex] && (
            <div className="bg-[#fff3f0] rounded-[8px] p-[10px] mb-[8px]">
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#c84b2f] leading-[20px]">⚠️ 注意：你选了 {answer}，正确答案是 {optionLetters[correctIndex]}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-[6px] mb-[8px]">
            {tag.split(' · ').map(t => (
              <span key={t} className="bg-[#fbf4e0] text-[#8a6a10] text-[11px] font-['Noto_Sans_SC:Medium',sans-serif] px-[8px] py-[2px] rounded-[6px]">{t}</span>
            ))}
          </div>
          <button className="w-full py-[10px] rounded-[10px] bg-[#f8f0ff] text-[#7c4daf] font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[13px] active:opacity-70">
            加入错题库
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Page 4: Export Preview ──────────────────────────────────────────────────

export function ExportPage({ navigate, goBack, onTabChange }: Props) {
  const [activeFormat, setActiveFormat] = useState('含解析版');
  const formats = ['练习版', '含解析版', 'PDF讲义'];

  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-hidden">
      <IOSStatusBar />
      <BackNav title="导出今日讲义" onBack={goBack} />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[12px] pb-[8px]">
        {/* Format selector */}
        <div className="flex gap-[8px] mb-[16px]">
          {formats.map(f => (
            <button
              key={f}
              onClick={() => setActiveFormat(f)}
              className={`flex-1 py-[9px] rounded-[10px] text-[13px] font-['Noto_Sans_SC:Medium',sans-serif] font-medium border active:opacity-70 ${
                activeFormat === f
                  ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                  : 'bg-white text-[#6b7e94] border-[#e3e8f0]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Lecture notes preview - paper feel */}
        <div
          className="bg-white rounded-[12px] overflow-hidden mb-[16px]"
          style={{ boxShadow: '0px 2px 12px rgba(0,0,0,0.08)', border: '0.5px solid rgba(0,0,0,0.06)' }}
        >
          {/* Header bar */}
          <div className="bg-[#1e3a5f] px-[20px] py-[14px]">
            <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[13px] text-white opacity-80 mb-[2px]">岸岸通 · 每日时政精读</p>
            <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[16px] text-white leading-[24px]">
              农业农村部：夏粮丰收在望，粮食安全形势持续向好
            </p>
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[rgba(255,255,255,0.65)] mt-[6px]">
              2026年6月18日 · 官方材料精读 · 预计阅读3分钟
            </p>
          </div>

          {/* Content sections */}
          <div className="px-[20px] py-[16px] space-y-[16px]">
            {/* 原文精读 */}
            <div>
              <div className="flex items-center gap-[8px] mb-[8px]">
                <span className="bg-[#1e3a5f] text-white text-[11px] font-['Noto_Sans_SC:Bold',sans-serif] font-bold px-[8px] py-[2px] rounded-[4px]">一</span>
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">原文精读</p>
              </div>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#4a5e73] leading-[22px]">
                近期，农业农村部发布最新监测数据，全国冬小麦长势良好，预计今年夏粮总产量将再创新高。在农业科技赋能方面，无人机植保、智慧灌溉等技术已广泛推广…
              </p>
            </div>
            <div className="h-[0.5px] bg-[#f0f0f0]"/>

            {/* AI考点提炼 */}
            <div>
              <div className="flex items-center gap-[8px] mb-[8px]">
                <span className="bg-[#fbf4e0] text-[#8a6a10] text-[11px] font-['Noto_Sans_SC:Bold',sans-serif] font-bold px-[8px] py-[2px] rounded-[4px]">二</span>
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">AI 考点提炼</p>
              </div>
              {['粮食安全：18亿亩耕地红线，党政同责', '农业科技：贡献率超60%，藏粮于技', '乡村振兴：一二三产融合，农民增收'].map((item, i) => (
                <div key={i} className="flex items-start gap-[6px] mb-[6px]">
                  <span className="text-[#c09a30] text-[12px] mt-[1px]">▸</span>
                  <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#4a5e73] leading-[22px]">{item}</p>
                </div>
              ))}
            </div>
            <div className="h-[0.5px] bg-[#f0f0f0]"/>

            {/* 可能考法 */}
            <div>
              <div className="flex items-center gap-[8px] mb-[8px]">
                <span className="bg-[#eef3ff] text-[#2b5fbf] text-[11px] font-['Noto_Sans_SC:Bold',sans-serif] font-bold px-[8px] py-[2px] rounded-[4px]">三</span>
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">可能考法</p>
              </div>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#4a5e73] leading-[22px]">
                【常识单选】粮食安全政策核心举措 · 【申论】以夏粮丰收为背景归纳概括 · 【写作】引用"粮食安全是国之大者"
              </p>
            </div>
            <div className="h-[0.5px] bg-[#f0f0f0]"/>

            {/* 配套练习预览 */}
            <div>
              <div className="flex items-center gap-[8px] mb-[8px]">
                <span className="bg-[#eaf5ec] text-[#2e7a3c] text-[11px] font-['Noto_Sans_SC:Bold',sans-serif] font-bold px-[8px] py-[2px] rounded-[4px]">四</span>
                <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">配套练习</p>
              </div>
              <div className="bg-[#f8f8f8] rounded-[8px] p-[12px]">
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#6b7e94]">选择题 2 道 · 判断题 1 道</p>
                {activeFormat === '练习版' ? (
                  <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#9baabb] mt-[4px]">（解析不含在内）</p>
                ) : (
                  <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#9baabb] mt-[4px]">含答案解析与错因分析</p>
                )}
              </div>
            </div>

            {activeFormat !== '练习版' && (
              <>
                <div className="h-[0.5px] bg-[#f0f0f0]"/>
                <div>
                  <div className="flex items-center gap-[8px] mb-[8px]">
                    <span className="bg-[#f1f6e4] text-[#5e7a1a] text-[11px] font-['Noto_Sans_SC:Bold',sans-serif] font-bold px-[8px] py-[2px] rounded-[4px]">五</span>
                    <p className="font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[14px] text-[#1b2d4f]">申论素材</p>
                  </div>
                  <div className="bg-[#f7fdf8] rounded-[8px] p-[12px] border-l-[3px] border-[#2e7a3c]">
                    <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#3a6040] leading-[22px] italic">
                      "粮食安全是国之大者，必须把饭碗牢牢端在自己手中，坚守耕地红线，深化农业科技赋能。"
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="bg-[#fafbfc] px-[20px] py-[10px] flex items-center justify-between">
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#b0bec8]">岸岸通 · {activeFormat}</p>
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#b0bec8]">2026.06.18</p>
          </div>
        </div>

        {/* Action buttons */}
        <button
          className="w-full py-[14px] rounded-[12px] bg-[#1e3a5f] text-white font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[15px] mb-[10px] active:opacity-80 flex items-center justify-center gap-[8px]"
          style={{ boxShadow: '0px 2px 6px rgba(30,58,95,0.3)' }}
        >
          <Download size={16} strokeWidth={2}/>
          导出 PDF
        </button>
        <div className="flex gap-[10px]">
          <button className="flex-1 py-[12px] rounded-[12px] bg-white font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[14px] text-[#1e3a5f] active:opacity-80 border border-[#dce5f0] flex items-center justify-center gap-[6px]">
            <FileText size={14} strokeWidth={2}/>
            保存资料夹
          </button>
          <button className="flex-1 py-[12px] rounded-[12px] bg-white font-['Noto_Sans_SC:Medium',sans-serif] font-medium text-[14px] text-[#1e3a5f] active:opacity-80 border border-[#dce5f0] flex items-center justify-center gap-[6px]">
            <Share2 size={14} strokeWidth={2}/>
            分享微信
          </button>
        </div>
      </div>

      <BottomNav activeTab="today" onTabChange={onTabChange} />
    </div>
  );
}
