import { X } from 'lucide-react';
import { useI18n } from '../i18n';
import { LunaLogo } from './Icons';
import { BalancePill } from './BalancePill';
import { closeTelegram } from '../hooks/useTelegram';

interface Props {
  title?: string;
  showBalance?: boolean;
  showClose?: boolean;
  onBack?: () => void;
  backLabel?: string;
}

export function AppHeader({
  title,
  showBalance = true,
  showClose = true,
  onBack,
  backLabel,
}: Props) {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-40 px-3 pt-2 pb-2">
      <div className="relative flex items-center justify-between gap-2">
        <div className="min-w-[88px]">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="glass pill flex items-center gap-1 px-3 py-1.5 text-sm text-white/90"
            >
              <span className="text-lg leading-none">‹</span>
              <span>{backLabel ?? t.back}</span>
            </button>
          ) : showClose ? (
            <button
              type="button"
              onClick={closeTelegram}
              className="glass pill flex items-center gap-1.5 px-3 py-1.5 text-sm text-white/90"
            >
              <X className="h-4 w-4" />
              <span>{t.close}</span>
            </button>
          ) : (
            <div />
          )}
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5">
          <LunaLogo className="h-5 w-5 text-white" />
          <span className="text-[15px] font-semibold tracking-tight">{t.appName}</span>
        </div>

        <div className="flex min-w-[88px] justify-end">
          {showBalance ? <BalancePill /> : <div className="h-7 w-7" />}
        </div>
      </div>

      {title ? (
        <div className="mt-3 flex items-center justify-between px-1">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {!showBalance && <BalancePill />}
        </div>
      ) : null}
    </header>
  );
}
