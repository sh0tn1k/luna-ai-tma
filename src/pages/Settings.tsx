import { ChevronRight, Globe, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { StarIcon } from '../components/Icons';
import { useI18n } from '../i18n';
import { useAppStore } from '../store/useAppStore';
import type { Lang } from '../types';

export function Settings() {
  const { t, lang, setLang } = useI18n();
  const openShop = useAppStore((s) => s.openShop);
  const showToast = useAppStore((s) => s.showToast);
  const persistLang = useAppStore((s) => s.setLang);

  const toggleLang = () => {
    const next: Lang = lang === 'en' ? 'ru' : 'en';
    setLang(next);
    persistLang(next);
  };

  return (
    <div className="safe-bottom min-h-full px-3 pb-8">
      <AppHeader title={t.settings} showBalance={false} />

      <div className="mt-2 rounded-[24px] bg-gradient-to-b from-[#2a1438] to-[#1a1228] p-5 ring-1 ring-luna-pink/25 pink-glow">
        <h2 className="text-xl font-bold">{t.freePlan}</h2>
        <p className="mt-1 text-sm text-white/55">{t.upgradeHint}</p>
        <button
          type="button"
          onClick={() => {
            openShop();
            showToast(t.paymentToast);
          }}
          className="pink-btn pill pink-glow mt-4 flex w-full items-center justify-center gap-2 py-3.5 text-[15px] font-bold"
        >
          {t.tryFrom} 299 <StarIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-[22px] bg-white/5 ring-1 ring-white/8">
        <button
          type="button"
          onClick={toggleLang}
          className="flex w-full items-center gap-3 px-4 py-4 text-left"
        >
          <Globe className="h-5 w-5 text-white/50" />
          <span className="flex-1 font-medium">{t.language}</span>
          <span className="text-sm text-white/55">
            {lang === 'en' ? t.english : t.russian}
          </span>
          <span className="text-white/35">⇅</span>
        </button>
        <div className="mx-4 h-px bg-white/8" />
        <Link
          to="/partner"
          className="flex w-full items-center gap-3 px-4 py-4"
        >
          <Trophy className="h-5 w-5 text-white/50" />
          <span className="flex-1 font-medium">{t.partnerProgram}</span>
          <ChevronRight className="h-5 w-5 text-white/35" />
        </Link>
      </div>
    </div>
  );
}
