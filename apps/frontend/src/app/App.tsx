import { useState, useCallback, type ReactNode } from 'react';
import { PageId } from './components/shared';
import { TodayScreen } from './components/TodayScreen';
import { NewsDetailScreen } from './components/NewsDetailScreen';
import { AIReadPage, PracticePage, ExportPage } from './components/news-pages';
import { WrongBankHomePage, FolderDetailPage, OCRPage, WrongDetailPage } from './components/wrongbank-pages';
import { ReviewHomePage, HotPracticePage, DailyReportPage } from './components/review-pages';
import { ProfileHomePage, MembershipPage, ExportHistoryPage } from './components/profile-pages';

type Tab = 'today' | 'wrongbank' | 'review' | 'profile';

const tabRoots: Record<Tab, PageId> = {
  today: 'today',
  wrongbank: 'wrongbank',
  review: 'review',
  profile: 'profile',
};

const pageToTab: Record<PageId, Tab> = {
  'today': 'today',
  'news-detail': 'today',
  'ai-read': 'today',
  'practice': 'today',
  'export-preview': 'today',
  'wrongbank': 'wrongbank',
  'folder-detail': 'wrongbank',
  'ocr': 'wrongbank',
  'wrong-detail': 'wrongbank',
  'review': 'review',
  'hot-practice': 'review',
  'daily-report': 'review',
  'profile': 'profile',
  'membership': 'profile',
  'export-history': 'profile',
};

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-[16px] py-[24px]"
      style={{
        backgroundImage: [
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1765 1024' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23g1)'/><defs><radialGradient id='g1' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -150 -150 0 353 512)'><stop stop-color='rgba(180,195,215,0.4)' offset='0'/><stop stop-color='rgba(0,0,0,0)' offset='0.5'/></radialGradient></defs></svg>\")",
          "linear-gradient(90deg, rgb(216,220,228) 0%, rgb(216,220,228) 100%)",
        ].join(', '),
      }}
    >
      {/* Outer phone shell */}
      <div
        className="relative rounded-[55px] flex-shrink-0"
        style={{
          width: '414px',
          height: '896px',
          background: '#1a1a1c',
          boxShadow: '0px 30px 80px rgba(0,0,0,0.45), 0px 8px 24px rgba(0,0,0,0.3)',
        }}
      >
        {/* Screen area */}
        <div
          className="overflow-hidden"
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            bottom: '12px',
            borderRadius: '44px',
            background: '#f2f4f8',
          }}
        >
          {children}
        </div>

        {/* Side buttons */}
        <div className="absolute bg-[#2a2a2c] h-[32px] left-[-3px] rounded-l-[2px] top-[120px] w-[3px]" />
        <div className="absolute bg-[#2a2a2c] h-[62px] left-[-3px] rounded-l-[2px] top-[168px] w-[3px]" />
        <div className="absolute bg-[#2a2a2c] h-[62px] left-[-3px] rounded-l-[2px] top-[244px] w-[3px]" />
        <div className="absolute bg-[#2a2a2c] h-[82px] right-[-3px] rounded-r-[2px] top-[180px] w-[3px]" />

        {/* Reflection overlay */}
        <div
          className="absolute inset-0 rounded-[55px] pointer-events-none"
          style={{ background: 'linear-gradient(114.8deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 50%)' }}
        />
        <div
          className="absolute inset-0 rounded-[55px] pointer-events-none"
          style={{ boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.08)' }}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [history, setHistory] = useState<PageId[]>(['today']);

  const currentPage = history[history.length - 1];

  const navigate = useCallback((page: PageId) => {
    setHistory(prev => [...prev, page]);
  }, []);

  const goBack = useCallback(() => {
    setHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  }, []);

  const onTabChange = useCallback((tab: Tab) => {
    setHistory([tabRoots[tab]]);
  }, []);

  const pageProps = { navigate, goBack, onTabChange };

  function renderPage() {
    switch (currentPage) {
      case 'today':
        return <TodayScreen onOpenDetail={() => navigate('news-detail')} onTabChange={onTabChange} />;
      case 'news-detail':
        return <NewsDetailScreen onBack={goBack} onTabChange={onTabChange} />;
      case 'ai-read':
        return <AIReadPage {...pageProps} />;
      case 'practice':
        return <PracticePage {...pageProps} />;
      case 'export-preview':
        return <ExportPage {...pageProps} />;
      case 'wrongbank':
        return <WrongBankHomePage {...pageProps} />;
      case 'folder-detail':
        return <FolderDetailPage {...pageProps} />;
      case 'ocr':
        return <OCRPage {...pageProps} />;
      case 'wrong-detail':
        return <WrongDetailPage {...pageProps} />;
      case 'review':
        return <ReviewHomePage {...pageProps} />;
      case 'hot-practice':
        return <HotPracticePage {...pageProps} />;
      case 'daily-report':
        return <DailyReportPage {...pageProps} />;
      case 'profile':
        return <ProfileHomePage {...pageProps} />;
      case 'membership':
        return <MembershipPage {...pageProps} />;
      case 'export-history':
        return <ExportHistoryPage {...pageProps} />;
      default:
        return <TodayScreen onOpenDetail={() => navigate('news-detail')} onTabChange={onTabChange} />;
    }
  }

  return (
    <PhoneFrame>
      <div className="size-full overflow-hidden">
        {renderPage()}
      </div>
    </PhoneFrame>
  );
}
