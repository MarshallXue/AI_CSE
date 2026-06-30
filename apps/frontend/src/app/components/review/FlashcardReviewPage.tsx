import { useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Eye,
  FileQuestion,
  Landmark,
  RotateCcw,
  X,
} from 'lucide-react';
import { BackNav, IOSStatusBar, type NavigateFn } from '../shared';
import {
  masteryFeedbackOptions,
  reviewCards,
  reviewDecks,
  type ReviewDeckId,
  type ReviewMasteryLevel,
} from '../../data/review-cards';

gsap.registerPlugin(useGSAP);

interface Props {
  navigate: NavigateFn;
  goBack: () => void;
  onTabChange: (tab: 'today' | 'wrongbank' | 'review' | 'profile') => void;
}

const deckIconMap: Record<ReviewDeckId, typeof FileQuestion> = {
  wrong: FileQuestion,
  vocab: BookOpen,
  policy: Landmark,
};

const masteryIconMap: Record<ReviewMasteryLevel, typeof X> = {
  unmastered: X,
  reinforce: RotateCcw,
  mastered: Check,
};

export function FlashcardReviewPage({ goBack }: Props) {
  const [activeDeck, setActiveDeck] = useState<ReviewDeckId>('wrong');
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [lastChoice, setLastChoice] = useState<ReviewMasteryLevel | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const deckCards = useMemo(() => reviewCards.filter((card) => card.deckId === activeDeck), [activeDeck]);
  const current = deckCards[index % deckCards.length];
  const Icon = current ? deckIconMap[current.deckId] : deckIconMap[activeDeck];
  const progress = deckCards.length > 0 ? Math.round(((index + 1) / deckCards.length) * 100) : 0;

  useGSAP(() => {
    if (!cardRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      cardRef.current,
      { autoAlpha: 0.96, y: 10, scale: 0.985 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.22,
        ease: 'power3.out',
        clearProps: 'transform,opacity,visibility',
      },
    );
  }, { dependencies: [current?.id, revealed], scope: cardRef, revertOnUpdate: true });

  useGSAP(() => {
    if (!panelRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      panelRef.current,
      { autoAlpha: 0.92, y: 14 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.2,
        ease: 'power3.out',
        clearProps: 'transform,opacity,visibility',
      },
    );
  }, { dependencies: [revealed], scope: panelRef, revertOnUpdate: true });

  const switchDeck = (deck: ReviewDeckId) => {
    setActiveDeck(deck);
    setIndex(0);
    setRevealed(false);
    setLastChoice(null);
  };

  const chooseMastery = (choice: ReviewMasteryLevel) => {
    setLastChoice(choice);
    setRevealed(false);
    setIndex((value) => (deckCards.length > 0 ? (value + 1) % deckCards.length : 0));
  };

  return (
    <div className="app-page flex h-full flex-col overflow-hidden">
      <IOSStatusBar />
      <BackNav
        title="闪卡复盘"
        onBack={goBack}
        right={<span className="text-[13px] font-medium text-[var(--app-muted)]">{index + 1}/{deckCards.length}</span>}
      />

      <div className="flex-shrink-0 px-[18px] pb-[12px] pt-[4px]">
        <div className="grid grid-cols-3 gap-[7px] rounded-[18px] bg-[#e9eef5] p-[4px]">
          {reviewDecks.map((deck) => {
            const isActive = activeDeck === deck.id;
            return (
              <button
                key={deck.id}
                type="button"
                onClick={() => switchDeck(deck.id)}
                className={`app-pressable h-[38px] rounded-[14px] text-[12px] font-bold transition-colors ${
                  isActive ? 'bg-white text-[var(--app-navy)] shadow-[0_7px_16px_rgba(31,58,95,0.1)]' : 'text-[var(--app-muted)]'
                }`}
              >
                {deck.label} <span className="font-medium opacity-70">{deck.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <main className="flex min-h-0 flex-1 flex-col px-[18px] pb-[18px]">
        <div className="mb-[12px] flex items-center gap-[10px]">
          <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#dfe7f0]">
            <div
              className="h-full rounded-full bg-[var(--app-navy)] transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[12px] font-medium text-[var(--app-muted)]">{progress}%</span>
        </div>

        <section className="relative flex min-h-0 flex-1 items-center justify-center py-[6px]">
          <div className="absolute left-[22px] right-[22px] top-[34px] h-[74%] rounded-[24px] bg-[#dbe4ee]" />
          <div className="absolute left-[12px] right-[12px] top-[22px] h-[79%] rounded-[26px] bg-[#e8eef5]" />
          <article
            ref={cardRef}
            className="app-paper relative z-10 flex min-h-[430px] w-full flex-col rounded-[28px] px-[22px] py-[22px]"
          >
            <div className="mb-[18px] flex items-start justify-between gap-[14px]">
              <div className="flex items-center gap-[10px]">
                <span className="flex h-[36px] w-[36px] items-center justify-center rounded-[13px] bg-[var(--app-navy-soft)] text-[var(--app-navy)]">
                  <Icon size={18} strokeWidth={1.9} />
                </span>
                <div>
                  <p className="text-[15px] font-bold leading-[20px] text-[var(--app-ink)]">{current?.title ?? '暂无复习卡片'}</p>
                  <p className="mt-[2px] text-[11.5px] leading-[17px] text-[var(--app-muted)]">{current?.meta ?? '请稍后查看新的复习内容'}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-[6px]">
              {(current?.tags ?? []).map((tag) => (
                <span
                  key={tag}
                  className="rounded-[7px] bg-[var(--app-blue-soft)] px-[7px] py-[3px] text-[11px] font-medium text-[var(--app-blue)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-1 flex-col justify-center py-[24px]">
              <p className="app-text-pretty text-[19px] font-bold leading-[32px] text-[var(--app-ink)]">
                {current?.prompt ?? '当前卡组还没有可复盘内容。'}
              </p>

              {revealed && current && (
                <div className="mt-[22px] rounded-[18px] bg-[#f3f7fb] p-[15px]">
                  <p className="mb-[8px] text-[12px] font-bold text-[var(--app-muted)]">答案</p>
                  <p className="text-[17px] font-bold leading-[27px] text-[var(--app-navy)]">{current.answer}</p>
                  <div className="my-[13px] h-px bg-[#dfe7f0]" />
                  <p className="app-text-pretty text-[13px] leading-[22px] text-[var(--app-body)]">{current.analysis}</p>
                </div>
              )}
            </div>

            {!revealed && (
              <button
                type="button"
                onClick={() => current && setRevealed(true)}
                disabled={!current}
                className="app-pressable flex h-[48px] items-center justify-center gap-[7px] rounded-[16px] bg-[var(--app-navy)] text-[14px] font-bold text-white shadow-[0_12px_24px_rgba(30,58,95,0.18)]"
              >
                <Eye size={16} strokeWidth={1.9} />
                直接看解析
              </button>
            )}
          </article>
        </section>

        <div ref={panelRef} className="mt-[12px] flex-shrink-0">
          {!revealed ? (
            <button
              type="button"
              onClick={() => current && setRevealed(true)}
              disabled={!current}
              className="app-pressable flex h-[54px] w-full items-center justify-center gap-[8px] rounded-[18px] bg-white text-[15px] font-bold text-[var(--app-navy)] shadow-[var(--app-shadow-card)]"
            >
              我已想好答案
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          ) : (
            <div className="grid grid-cols-3 gap-[8px]">
              {masteryFeedbackOptions.map(({ id, label, detail, color, bg }) => {
                const ChoiceIcon = masteryIconMap[id];
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => chooseMastery(id)}
                    className="app-pressable min-h-[64px] rounded-[17px] border border-white px-[8px] py-[9px] text-left shadow-[var(--app-shadow-card)]"
                    style={{ background: bg, color }}
                  >
                    <span className="mb-[5px] flex items-center gap-[5px] text-[12px] font-bold">
                      <ChoiceIcon size={14} strokeWidth={2} />
                      {label}
                    </span>
                    <span className="block text-[10.5px] font-medium opacity-75">{detail}</span>
                  </button>
                );
              })}
            </div>
          )}

          {lastChoice && (
            <p className="mt-[8px] text-center text-[11.5px] text-[var(--app-muted)]">
              已记录为 {masteryFeedbackOptions.find((item) => item.id === lastChoice)?.label}，系统会更新下次复习。
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
