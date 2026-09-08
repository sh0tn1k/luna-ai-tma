import { Banknote, CreditCard, Zap } from 'lucide-react';
import { useI18n } from '../i18n';
import { useAppStore } from '../store/useAppStore';
import { StarIcon } from './Icons';

export function NotEnoughStars() {
  const { t } = useI18n();
  const open = useAppStore((s) => s.notEnoughStarsOpen);
  const close = useAppStore((s) => s.closeNotEnoughStars);
  const showToast = useAppStore((s) => s.showToast);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[75] flex items-end justify-center">
      <button type="button" className="absolute inset-0 bg-black/65" onClick={close} aria-label="Close" />
      <div className="relative w-full max-w-lg rounded-t-[28px] bg-[#1a1624] px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-3">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />
        <h2 className="text-2xl font-bold leading-tight">{t.notEnoughStars}</h2>
        <p className="mt-2 text-sm text-white/55">{t.notEnoughStarsSub}</p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2a2438]">
            <StarIcon className="h-8 w-8" />
          </div>
          <button
            type="button"
            onClick={() => showToast(t.paymentToast)}
            className="glass pill px-4 py-2.5 text-sm font-medium"
          >
            {t.buyStarsBot}
          </button>
        </div>

        <ul className="mt-5 space-y-3 text-sm text-white/80">
          <li className="flex items-center gap-3">
            <Banknote className="h-5 w-5 text-white/50" />
            {t.payRubCrypto}
          </li>
          <li className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-amber-400" />
            {t.cheaper40}
          </li>
          <li className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-white/50" />
            {t.noKyc}
          </li>
        </ul>

        <button
          type="button"
          onClick={() => {
            showToast(t.paymentToast);
            close();
          }}
          className="orange-btn pill mt-6 w-full py-3.5 text-base font-bold text-black shadow-[0_8px_24px_rgba(251,191,36,0.35)]"
        >
          {t.buyStars}
        </button>
        <button
          type="button"
          onClick={close}
          className="mt-3 w-full py-2 text-center text-sm text-white/70"
        >
          {t.cancel}
        </button>
      </div>
    </div>
  );
}
