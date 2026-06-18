import svgPaths from "./svg-mh04reu0th";
import imgImage from "./db3e97bce6dff2d2aa83a665dc86fe890adce95a.png";
import imgImage2026 from "./fb41ef05e5ae251b2883e570f174daad39f34930.png";

function Text() {
  return (
    <div className="h-[15.495px] relative shrink-0 w-[30.599px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Bold',sans-serif] font-bold leading-[15.5px] left-0 text-[#1b2d4f] text-[15.5px] top-[-2.17px] tracking-[-0.3px] whitespace-nowrap">9:41</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[12.995px] relative shrink-0 w-[17.995px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9948 12.9948">
        <g clipPath="url(#clip0_1_261)" id="Icon">
          <path d={svgPaths.pad578f0} fill="var(--fill-0, #1B2D4F)" id="Vector" opacity="0.4" />
          <path d={svgPaths.p1a721e00} fill="var(--fill-0, #1B2D4F)" id="Vector_2" opacity="0.6" />
          <path d={svgPaths.p37de5800} fill="var(--fill-0, #1B2D4F)" id="Vector_3" opacity="0.8" />
          <path d={svgPaths.p10007080} fill="var(--fill-0, #1B2D4F)" id="Vector_4" />
        </g>
        <defs>
          <clipPath id="clip0_1_261">
            <rect fill="white" height="12.9948" width="17.9948" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[11.992px] relative shrink-0 w-[15.99px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 11.9922">
        <g clipPath="url(#clip0_1_267)" id="Icon">
          <path d={svgPaths.p2b53e100} fill="var(--fill-0, #1B2D4F)" id="Vector" />
          <path d={svgPaths.p3d30d900} id="Vector_2" opacity="0.7" stroke="var(--stroke-0, #1B2D4F)" strokeLinecap="round" strokeWidth="1.29915" />
          <path d={svgPaths.p339bb6c0} id="Vector_3" opacity="0.5" stroke="var(--stroke-0, #1B2D4F)" strokeLinecap="round" strokeWidth="1.29915" />
        </g>
        <defs>
          <clipPath id="clip0_1_267">
            <rect fill="white" height="11.9922" width="15.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container7() {
  return <div className="bg-[#1b2d4f] h-[8.333px] relative rounded-[2px] shrink-0 w-[16.628px]" data-name="Container" />;
}

function Container6() {
  return (
    <div className="h-[12.995px] opacity-80 relative rounded-[4px] shrink-0 w-[25.99px]" data-name="Container">
      <div aria-hidden className="absolute border-[#1b2d4f] border-[0.833px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[2.333px] relative size-full">
        <Container7 />
      </div>
    </div>
  );
}

function Container8() {
  return <div className="bg-[#1b2d4f] h-[5px] opacity-60 relative rounded-br-[1px] rounded-tr-[1px] shrink-0 w-[1.992px]" data-name="Container" />;
}

function ContainerMargin() {
  return (
    <div className="relative shrink-0" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pl-px relative size-full">
        <Container8 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container6 />
        <ContainerMargin />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Icon />
        <Icon1 />
        <Container5 />
      </div>
    </div>
  );
}

function Container9() {
  return <div className="absolute bg-[#0a0a0a] h-[34px] left-[136px] rounded-[20px] top-[11.99px] w-[118px]" data-name="Container" />;
}

function Container3() {
  return (
    <div className="h-[53.997px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pl-[22px] pr-[20px] pt-[14px] relative size-full">
          <Text />
          <Container4 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1e3a5f] drop-shadow-[0px_1px_2.5px_rgba(30,58,95,0.28),0px_0px_0px_rgba(30,58,95,0.15)] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[18px] py-[6px] relative size-full">
        <p className="[word-break:break-word] font-['Noto_Sans_SC:Bold',sans-serif] font-bold leading-[19.5px] relative shrink-0 text-[13px] text-center text-white tracking-[0.1px] whitespace-nowrap">今日新闻</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[18px] py-[6px] relative size-full">
        <p className="[word-break:break-word] font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#7a8fa6] text-[13px] text-center tracking-[0.1px] whitespace-nowrap">今日词汇</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#e3e8f0] relative rounded-[10px] self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start p-[3px] relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[62px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center pb-[14px] pt-[10px] px-[20px] relative size-full">
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[18.008px] relative shrink-0 w-[113.451px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#9baabb] text-[12px] top-[-2px] whitespace-nowrap">今日 4 篇 · 已读 0 篇</p>
      </div>
    </div>
  );
}

function Container16() {
  return <div className="bg-[#1e3a5f] h-[3.997px] relative rounded-[27962000px] shrink-0 w-0" data-name="Container" />;
}

function Container15() {
  return (
    <div className="bg-[#e4e9f0] h-[3.997px] relative rounded-[27962000px] shrink-0 w-[71.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container16 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[16.497px] relative shrink-0 w-[16.237px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#9baabb] text-[11px] top-[-2px] whitespace-nowrap">0%</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Container15 />
        <Text2 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[18.008px] relative shrink-0 w-[390.013px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[16px] relative size-full">
        <Text1 />
        <Container14 />
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="h-[147.995px] relative shrink-0 w-full" data-name="Image (中央经济工作会议部署下半年重点任务)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Text3() {
  return (
    <div className="bg-[#eef3ff] h-[20.482px] relative rounded-[8px] shrink-0 w-[60.794px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[16.5px] left-[7.99px] text-[#2b5fbf] text-[11px] top-[-0.01px] tracking-[0.2px] whitespace-nowrap">经济政策</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="bg-[#fef0ec] h-[16.979px] relative rounded-[4px] shrink-0 w-[34.596px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Bold',sans-serif] font-bold leading-[15px] left-[6.99px] text-[#c84b2f] text-[10px] top-[-1.01px] tracking-[0.3px] whitespace-nowrap">热点</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text3 />
        <Text4 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g id="Icon">
          <path d={svgPaths.p1d20280} id="Vector" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="opacity-70 relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[4px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 w-[326.055px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container19 />
        <Button2 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[21.745px] relative shrink-0 w-[326.055px]" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Bold',sans-serif] font-bold leading-[21.75px] left-0 text-[#1b2d4f] text-[15px] top-[-2px] tracking-[-0.2px] whitespace-nowrap">中央经济工作会议部署下半年重点任务</p>
    </div>
  );
}

function ParagraphMargin() {
  return (
    <div className="relative shrink-0" data-name="Paragraph (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[10px] relative size-full">
        <Paragraph />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[41.563px] relative shrink-0 w-[326.055px]" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[20.8px] left-0 text-[#6b7e94] text-[13px] top-[-2.17px] w-[327px]">着力扩内需、稳外贸、深化供给侧结构性改革，新质生产力成为核心关键词，强调以科技创新驱动产业升级。</p>
    </div>
  );
}

function ParagraphMargin1() {
  return (
    <div className="relative shrink-0" data-name="Paragraph (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container22() {
  return <div className="bg-[#c09a30] relative rounded-[27962000px] shrink-0 size-[3.997px]" data-name="Container" />;
}

function Text5() {
  return (
    <div className="bg-[#fbf4e0] h-[20.482px] relative rounded-[4px] shrink-0 w-[161.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[16.5px] left-[6.99px] text-[#8a6a10] text-[11px] top-[-0.01px] whitespace-nowrap">考点：宏观调控 · 新质生产力</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Container22 />
        <Text5 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[11.992px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9922 11.9922">
        <g clipPath="url(#clip0_1_272)" id="Icon">
          <path d={svgPaths.pb530400} id="Vector" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.99935" />
          <path d={svgPaths.p11027790} id="Vector_2" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.99935" />
        </g>
        <defs>
          <clipPath id="clip0_1_272">
            <rect fill="white" height="11.9922" width="11.9922" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[16.497px] relative shrink-0 w-[28.112px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#b0bec8] text-[11px] top-[-2px] whitespace-nowrap">4分钟</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon3 />
        <Text6 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[326.055px]" data-name="Container">
      <Container21 />
      <Container23 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <Container20 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Container18 />
        <ParagraphMargin />
        <ParagraphMargin1 />
        <ContainerMargin1 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[18.008px] relative shrink-0 w-[121.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[18px] left-[61px] text-[#8fa0b0] text-[12px] text-center top-[-2px] whitespace-nowrap">精读全文，AI 解析考点</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[13.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9974 13.9974">
        <g id="Icon">
          <path d={svgPaths.p140f9600} id="Vector" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16645" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#fafbfc] relative rounded-bl-[12px] rounded-br-[12px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[16px] py-[10px] relative size-full">
          <Text7 />
          <Icon4 />
        </div>
      </div>
    </div>
  );
}

function NewsCard() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[355.742px] items-start overflow-clip relative rounded-[12px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.05),0px_0px_0px_0.5px_rgba(0,0,0,0.05)] shrink-0 w-[358.034px]" data-name="NewsCard">
      <Image />
      <Container17 />
      <Button3 />
    </div>
  );
}

function NewsCardMargin() {
  return (
    <div className="relative shrink-0" data-name="NewsCard (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] px-[16px] relative size-full">
        <NewsCard />
      </div>
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[147.995px] relative shrink-0 w-full" data-name="Image (国务院印发《数字中国建设整体布局规划（2026年版）》)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2026} />
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[#e6f5f2] h-[20.482px] relative rounded-[8px] shrink-0 w-[60.794px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[16.5px] left-[7.99px] text-[#1e7a6a] text-[11px] top-[-0.01px] tracking-[0.2px] whitespace-nowrap">数字经济</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g id="Icon">
          <path d={svgPaths.p1d20280} id="Vector" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="opacity-70 relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[4px] relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 w-[326.055px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container26 />
        <Button4 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[43.49px] relative shrink-0 w-[326.055px]" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Bold',sans-serif] font-bold leading-[21.75px] left-0 text-[#1b2d4f] text-[15px] top-[-2px] tracking-[-0.2px] w-[327px]">国务院印发《数字中国建设整体布局规划（2026年版）》</p>
    </div>
  );
}

function ParagraphMargin2() {
  return (
    <div className="relative shrink-0" data-name="Paragraph (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[10px] relative size-full">
        <Paragraph2 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[41.563px] relative shrink-0 w-[326.055px]" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[20.8px] left-0 text-[#6b7e94] text-[13px] top-[-2.17px] w-[327px]">明确到2030年数字基础设施全面升级、数据要素市场基本建成的核心建设目标与路径。</p>
    </div>
  );
}

function ParagraphMargin3() {
  return (
    <div className="relative shrink-0" data-name="Paragraph (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container29() {
  return <div className="bg-[#c09a30] relative rounded-[27962000px] shrink-0 size-[3.997px]" data-name="Container" />;
}

function Text8() {
  return (
    <div className="bg-[#fbf4e0] h-[20.482px] relative rounded-[4px] shrink-0 w-[112.995px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[16.5px] left-[6.99px] text-[#8a6a10] text-[11px] top-[-0.01px] whitespace-nowrap">考点：数字中国战略</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Container29 />
        <Text8 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[11.992px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9922 11.9922">
        <g clipPath="url(#clip0_1_272)" id="Icon">
          <path d={svgPaths.pb530400} id="Vector" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.99935" />
          <path d={svgPaths.p11027790} id="Vector_2" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.99935" />
        </g>
        <defs>
          <clipPath id="clip0_1_272">
            <rect fill="white" height="11.9922" width="11.9922" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[16.497px] relative shrink-0 w-[28.112px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#b0bec8] text-[11px] top-[-2px] whitespace-nowrap">3分钟</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon6 />
        <Text9 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[326.055px]" data-name="Container">
      <Container28 />
      <Container30 />
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <Container27 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Container25 />
        <ParagraphMargin2 />
        <ParagraphMargin3 />
        <ContainerMargin2 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[18.008px] relative shrink-0 w-[121.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[18px] left-[61px] text-[#8fa0b0] text-[12px] text-center top-[-2px] whitespace-nowrap">精读全文，AI 解析考点</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[13.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9974 13.9974">
        <g id="Icon">
          <path d={svgPaths.p140f9600} id="Vector" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16645" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#fafbfc] relative rounded-bl-[12px] rounded-br-[12px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[16px] py-[10px] relative size-full">
          <Text10 />
          <Icon7 />
        </div>
      </div>
    </div>
  );
}

function NewsCard1() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[377.487px] items-start overflow-clip relative rounded-[12px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.05),0px_0px_0px_0.5px_rgba(0,0,0,0.05)] shrink-0 w-[358.034px]" data-name="NewsCard">
      <Image1 />
      <Container24 />
      <Button5 />
    </div>
  );
}

function NewsCardMargin1() {
  return (
    <div className="relative shrink-0" data-name="NewsCard (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] px-[16px] relative size-full">
        <NewsCard1 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="bg-[#eaf5ec] h-[20.482px] relative rounded-[8px] shrink-0 w-[60.794px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[16.5px] left-[7.99px] text-[#2e7a3c] text-[11px] top-[-0.01px] tracking-[0.2px] whitespace-nowrap">三农政策</p>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g id="Icon">
          <path d={svgPaths.p1d20280} id="Vector" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="opacity-70 relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[4px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 w-[326.055px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container33 />
        <Button6 />
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[43.49px] relative shrink-0 w-[326.055px]" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Bold',sans-serif] font-bold leading-[21.75px] left-0 text-[#1b2d4f] text-[15px] top-[-2px] tracking-[-0.2px] w-[327px]">农业农村部：夏粮丰收在望，粮食安全形势持续向好</p>
    </div>
  );
}

function ParagraphMargin4() {
  return (
    <div className="relative shrink-0" data-name="Paragraph (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[10px] relative size-full">
        <Paragraph4 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[41.563px] relative shrink-0 w-[326.055px]" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[20.8px] left-0 text-[#6b7e94] text-[13px] top-[-2.17px] w-[327px]">多地夏粮产量创历史新高，农业科技赋能效果显著，耕地保护红线严守政策落实到位。</p>
    </div>
  );
}

function ParagraphMargin5() {
  return (
    <div className="relative shrink-0" data-name="Paragraph (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container36() {
  return <div className="bg-[#c09a30] relative rounded-[27962000px] shrink-0 size-[3.997px]" data-name="Container" />;
}

function Text11() {
  return (
    <div className="bg-[#fbf4e0] h-[20.482px] relative rounded-[4px] shrink-0 w-[150.951px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[16.5px] left-[6.99px] text-[#8a6a10] text-[11px] top-[-0.01px] whitespace-nowrap">考点：粮食安全 · 乡村振兴</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Container36 />
        <Text11 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[11.992px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9922 11.9922">
        <g clipPath="url(#clip0_1_272)" id="Icon">
          <path d={svgPaths.pb530400} id="Vector" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.99935" />
          <path d={svgPaths.p11027790} id="Vector_2" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.99935" />
        </g>
        <defs>
          <clipPath id="clip0_1_272">
            <rect fill="white" height="11.9922" width="11.9922" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[16.497px] relative shrink-0 w-[28.112px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#b0bec8] text-[11px] top-[-2px] whitespace-nowrap">3分钟</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon9 />
        <Text12 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[326.055px]" data-name="Container">
      <Container35 />
      <Container37 />
    </div>
  );
}

function ContainerMargin3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <Container34 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Container32 />
        <ParagraphMargin4 />
        <ParagraphMargin5 />
        <ContainerMargin3 />
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[18.008px] relative shrink-0 w-[121.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[18px] left-[61px] text-[#8fa0b0] text-[12px] text-center top-[-2px] whitespace-nowrap">精读全文，AI 解析考点</p>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[13.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9974 13.9974">
        <g id="Icon">
          <path d={svgPaths.p140f9600} id="Vector" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16645" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#fafbfc] relative rounded-bl-[12px] rounded-br-[12px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[16px] py-[10px] relative size-full">
          <Text13 />
          <Icon10 />
        </div>
      </div>
    </div>
  );
}

function NewsCard2() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[229.492px] items-start overflow-clip relative rounded-[12px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.05),0px_0px_0px_0.5px_rgba(0,0,0,0.05)] shrink-0 w-[358.034px]" data-name="NewsCard">
      <Container31 />
      <Button7 />
    </div>
  );
}

function NewsCardMargin2() {
  return (
    <div className="relative shrink-0" data-name="NewsCard (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] px-[16px] relative size-full">
        <NewsCard2 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-[#f1f6e4] h-[20.482px] relative rounded-[8px] shrink-0 w-[60.794px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[16.5px] left-[7.99px] text-[#5e7a1a] text-[11px] top-[-0.01px] tracking-[0.2px] whitespace-nowrap">生态文明</p>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g id="Icon">
          <path d={svgPaths.p1d20280} id="Vector" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="opacity-70 relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[4px] relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="relative shrink-0 w-[326.055px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container40 />
        <Button8 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[43.49px] relative shrink-0 w-[326.055px]" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Bold',sans-serif] font-bold leading-[21.75px] left-0 text-[#1b2d4f] text-[15px] top-[-2px] tracking-[-0.2px] w-[327px]">生态环境部：全国碳市场扩容，钢铁建材等行业纳入</p>
    </div>
  );
}

function ParagraphMargin6() {
  return (
    <div className="relative shrink-0" data-name="Paragraph (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[10px] relative size-full">
        <Paragraph6 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[41.563px] relative shrink-0 w-[326.055px]" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[20.8px] left-0 text-[#6b7e94] text-[13px] top-[-2.17px] w-[327px]">碳市场第三履约期正式启动，钢铁、建材、有色金属行业企业将参与配额交易，推动双碳目标落实。</p>
    </div>
  );
}

function ParagraphMargin7() {
  return (
    <div className="relative shrink-0" data-name="Paragraph (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <Paragraph7 />
      </div>
    </div>
  );
}

function Container43() {
  return <div className="bg-[#c09a30] relative rounded-[27962000px] shrink-0 size-[3.997px]" data-name="Container" />;
}

function Text14() {
  return (
    <div className="bg-[#fbf4e0] h-[20.482px] relative rounded-[4px] shrink-0 w-[139.948px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[16.5px] left-[6.99px] text-[#8a6a10] text-[11px] top-[-0.01px] whitespace-nowrap">考点：碳达峰 · 双碳目标</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Container43 />
        <Text14 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[11.992px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9922 11.9922">
        <g clipPath="url(#clip0_1_272)" id="Icon">
          <path d={svgPaths.pb530400} id="Vector" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.99935" />
          <path d={svgPaths.p11027790} id="Vector_2" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.99935" />
        </g>
        <defs>
          <clipPath id="clip0_1_272">
            <rect fill="white" height="11.9922" width="11.9922" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[16.497px] relative shrink-0 w-[28.112px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#b0bec8] text-[11px] top-[-2px] whitespace-nowrap">4分钟</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon12 />
        <Text15 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[326.055px]" data-name="Container">
      <Container42 />
      <Container44 />
    </div>
  );
}

function ContainerMargin4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <Container41 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Container39 />
        <ParagraphMargin6 />
        <ParagraphMargin7 />
        <ContainerMargin4 />
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[18.008px] relative shrink-0 w-[121.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[18px] left-[61px] text-[#8fa0b0] text-[12px] text-center top-[-2px] whitespace-nowrap">精读全文，AI 解析考点</p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[13.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9974 13.9974">
        <g id="Icon">
          <path d={svgPaths.p140f9600} id="Vector" stroke="var(--stroke-0, #B0BEC8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16645" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#fafbfc] relative rounded-bl-[12px] rounded-br-[12px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[16px] py-[10px] relative size-full">
          <Text16 />
          <Icon13 />
        </div>
      </div>
    </div>
  );
}

function NewsCard3() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[229.492px] items-start overflow-clip relative rounded-[12px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.05),0px_0px_0px_0.5px_rgba(0,0,0,0.05)] shrink-0 w-[358.034px]" data-name="NewsCard">
      <Container38 />
      <Button9 />
    </div>
  );
}

function NewsCardMargin3() {
  return (
    <div className="relative shrink-0" data-name="NewsCard (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] px-[16px] relative size-full">
        <NewsCard3 />
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[37px] relative shrink-0 w-[390.013px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[8px] pt-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#b8c5d0] text-[11px] text-center whitespace-nowrap">每日 04:00 更新</p>
      </div>
    </div>
  );
}

function NewsTab() {
  return (
    <div className="relative shrink-0 w-[390.013px]" data-name="NewsTab">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[16px] pt-[4px] relative size-full">
        <Container13 />
        <NewsCardMargin />
        <NewsCardMargin1 />
        <NewsCardMargin2 />
        <NewsCardMargin3 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[756.549_0_0] min-h-px relative w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[168px] relative size-full">
          <NewsTab />
        </div>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p15fb8f00} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p31e46800} fill="var(--fill-0, #64748B)" id="Vector_2" />
          <path d={svgPaths.p10b75700} fill="var(--fill-0, #64748B)" id="Vector_3" />
          <path d={svgPaths.p95059f0} fill="var(--fill-0, #64748B)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function TextInput() {
  return (
    <div className="flex-[255.26_0_0] h-[20px] min-w-px relative" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#7a8798] text-[14px] w-full">问AI，选中文字、拍照或截图都可以</p>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g id="Icon">
          <path d={svgPaths.pd6b1650} id="Vector" stroke="var(--stroke-0, #1F5EFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.46571" />
          <path d="M7.9948 12.6584V3.33117" id="Vector_2" stroke="var(--stroke-0, #1F5EFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.46571" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#eaf1ff] relative rounded-[15.996px] shrink-0 size-[31.992px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-white drop-shadow-[0px_2px_5px_rgba(0,0,0,0.06)] h-[52px] min-h-[52px] relative rounded-[20px] shrink-0 w-[354.909px]" data-name="Container">
      <div aria-hidden className="absolute border-[#e2e8f0] border-[0.833px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center min-h-[inherit] pl-[16.833px] pr-[10.833px] py-[0.833px] relative size-full">
        <Icon14 />
        <TextInput />
        <Button10 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute left-0 top-[729.02px] w-[390.013px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container46 />
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[21.992px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.9922 21.9922">
        <g clipPath="url(#clip0_1_247)" id="Icon">
          <path d="M10.9961 6.41439V19.2432" id="Vector" stroke="var(--stroke-0, #1E3A5F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92432" />
          <path d={svgPaths.p25c99900} id="Vector_2" stroke="var(--stroke-0, #1E3A5F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92432" />
        </g>
        <defs>
          <clipPath id="clip0_1_247">
            <rect fill="white" height="21.9922" width="21.9922" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[15.742px] relative shrink-0 w-[21.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Noto_Sans_SC:Bold',sans-serif] font-bold leading-[15.75px] left-[11px] text-[#1e3a5f] text-[10.5px] text-center top-[-1.83px] tracking-[0.2px] whitespace-nowrap">今日</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3px] items-center left-[20.76px] min-w-[56px] px-[8px] py-[2px] top-[10px]" data-name="Button">
      <Icon16 />
      <Text17 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[21.992px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.9922 21.9922">
        <g id="Icon">
          <path d={svgPaths.p3fc64de0} id="Vector" stroke="var(--stroke-0, #AABCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.46615" />
          <path d={svgPaths.p343ab9c0} id="Vector_2" stroke="var(--stroke-0, #AABCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.46615" />
        </g>
      </svg>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[15.742px] relative shrink-0 w-[32.109px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[15.75px] left-[16px] text-[#aabccc] text-[10.5px] text-center top-[-1.83px] tracking-[0.2px] whitespace-nowrap">错题库</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3px] items-center left-[118.26px] min-w-[56px] px-[8px] py-[2px] top-[10px]" data-name="Button">
      <Icon17 />
      <Text18 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[21.992px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.9922 21.9922">
        <g id="Icon">
          <path d={svgPaths.p7d96c70} id="Vector" stroke="var(--stroke-0, #AABCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.46615" />
        </g>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[15.742px] relative shrink-0 w-[21.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[15.75px] left-[11px] text-[#aabccc] text-[10.5px] text-center top-[-1.83px] tracking-[0.2px] whitespace-nowrap">复盘</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3px] items-center left-[215.77px] min-w-[56px] px-[8px] py-[2px] top-[10px]" data-name="Button">
      <Icon18 />
      <Text19 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[21.992px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.9922 21.9922">
        <g id="Icon">
          <path d={svgPaths.p2eaf9700} id="Vector" stroke="var(--stroke-0, #AABCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.46615" />
          <path d={svgPaths.p2940a500} id="Vector_2" stroke="var(--stroke-0, #AABCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.46615" />
        </g>
      </svg>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[15.742px] relative shrink-0 w-[21.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[15.75px] left-[11px] text-[#aabccc] text-[10.5px] text-center top-[-1.83px] tracking-[0.2px] whitespace-nowrap">我的</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3px] items-center left-[313.27px] min-w-[56px] px-[8px] py-[2px] top-[10px]" data-name="Button">
      <Icon19 />
      <Text20 />
    </div>
  );
}

function Container48() {
  return (
    <div className="flex-[69.167_0_0] min-h-px relative w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button11 />
        <Button12 />
        <Button13 />
        <Button14 />
      </div>
    </div>
  );
}

function Container50() {
  return <div className="bg-[rgba(27,45,79,0.2)] h-[5px] relative rounded-[3px] shrink-0 w-[133.997px]" data-name="Container" />;
}

function Container49() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center pb-[8px] relative size-full">
        <Container50 />
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bg-[rgba(246,248,251,0.96)] h-[82.995px] left-0 top-[789.01px] w-[390.013px]" data-name="Container">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.08)] border-solid border-t-[0.833px] inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[0.833px] relative size-full">
        <Container48 />
        <Container49 />
      </div>
    </div>
  );
}

function TodayScreen() {
  return (
    <div className="bg-[#f2f4f8] h-[872.005px] relative shrink-0 w-full" data-name="TodayScreen">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container3 />
        <Container10 />
        <Container12 />
        <Container45 />
        <Container47 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#f2f4f8] h-[872.005px] relative rounded-[44px] shrink-0 w-[390.013px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <TodayScreen />
      </div>
    </div>
  );
}

function Container51() {
  return <div className="absolute bg-[#2a2a2c] h-[31.992px] left-[-2.99px] rounded-bl-[2px] rounded-tl-[2px] top-[120px] w-[2.995px]" data-name="Container" />;
}

function Container52() {
  return <div className="absolute bg-[#2a2a2c] h-[61.992px] left-[-2.99px] rounded-bl-[2px] rounded-tl-[2px] top-[167.99px] w-[2.995px]" data-name="Container" />;
}

function Container53() {
  return <div className="absolute bg-[#2a2a2c] h-[61.992px] left-[-2.99px] rounded-bl-[2px] rounded-tl-[2px] top-[244px] w-[2.995px]" data-name="Container" />;
}

function Container54() {
  return <div className="absolute bg-[#2a2a2c] h-[81.992px] left-[414px] rounded-br-[2px] rounded-tr-[2px] top-[180px] w-[2.995px]" data-name="Container" />;
}

function Container1() {
  return (
    <div className="h-[895.99px] relative rounded-[55px] shadow-[0px_0px_0px_0px_rgba(255,255,255,0.15),0px_30px_80px_0px_rgba(0,0,0,0.45),0px_8px_24px_0px_rgba(0,0,0,0.3)] shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute bg-[#1a1a1c] bg-clip-padding border-0 border-[transparent] border-solid inset-0 pointer-events-none rounded-[55px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[12px] relative size-full">
        <Container2 />
        <Container51 />
        <Container52 />
        <Container53 />
        <Container54 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.08)]" />
    </div>
  );
}

function Container55() {
  return <div className="absolute h-[895.99px] left-0 rounded-[55px] top-0 w-[413.997px]" style={{ backgroundImage: "linear-gradient(114.8deg, rgba(255, 255, 255, 0.06) 0%, rgba(0, 0, 0, 0) 50%)" }} data-name="Container" />;
}

function Container() {
  return (
    <div className="relative shrink-0 w-[413.997px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container1 />
        <Container55 />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="h-[1024.17px] min-h-[1024.1700439453125px] relative shrink-0 w-full" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1765 1024.2' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -150.2 -150.2 0 353 512.09)'><stop stop-color='rgba(180,195,215,0.4)' offset='0'/><stop stop-color='rgba(135,146,161,0.3)' offset='0.125'/><stop stop-color='rgba(90,98,108,0.2)' offset='0.25'/><stop stop-color='rgba(0,0,0,0)' offset='0.5'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1765 1024.2' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -163.25 -163.25 0 1412 204.83)'><stop stop-color='rgba(200,210,225,0.3)' offset='0'/><stop stop-color='rgba(100,105,113,0.15)' offset='0.25'/><stop stop-color='rgba(0,0,0,0)' offset='0.5'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(216, 220, 228) 0%, rgb(216, 220, 228) 100%)" }} data-name="App">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center min-h-[inherit] px-[16px] py-[24px] relative size-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

export default function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Body">
      <App />
    </div>
  );
}