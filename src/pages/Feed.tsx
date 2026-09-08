import type { TouchEvent } from 'react';
import { useCallback, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { DEMO_FEED } from '../data/seed';
import { useI18n } from '../i18n';
import { useAppStore } from '../store/useAppStore';

export function Feed() {
  const { t } = useI18n();
  const models = useAppStore((s) => s.models);
  const spendEnergy = useAppStore((s) => s.spendEnergy);
  const energy = useAppStore((s) => s.energy);
  const openShop = useAppStore((s) => s.openShop);
  const showToast = useAppStore((s) => s.showToast);
  const [index, setIndex] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const touchY = useRef<number | null>(null);
  const lastSpent = useRef(-1);

  const items = DEMO_FEED.map((f) => ({
    ...f,
    model: models.find((m) => m.id === f.modelId),
  })).filter((x) => x.model);

  const trySpend = useCallback(
    (nextIndex: number) => {
      if (nextIndex === lastSpent.current) return true;
      if (energy <= 0) {
        setBlocked(true);
        showToast(t.energyEmpty);
        return false;
      }
      const ok = spendEnergy();
      if (!ok) {
        setBlocked(true);
        showToast(t.energyEmpty);
        return false;
      }
      lastSpent.current = nextIndex;
      setBlocked(false);
      return true;
    },
    [energy, spendEnergy, showToast, t.energyEmpty],
  );

  const go = (dir: 1 | -1) => {
    const next = Math.min(items.length - 1, Math.max(0, index + dir));
    if (next === index) return;
    if (dir === 1 && !trySpend(next)) return;
    setIndex(next);
  };

  const onTouchStart = (e: TouchEvent) => {
    touchY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchY.current == null) return;
    const dy = e.changedTouches[0].clientY - touchY.current;
    touchY.current = null;
    if (Math.abs(dy) < 40) return;
    go(dy < 0 ? 1 : -1);
  };

  const current = items[index];

  return (
    <div className="relative h-[100dvh] overflow-hidden">
      <div className="absolute inset-x-0 top-0 z-20">
        <AppHeader />
      </div>

      {blocked || energy <= 0 ? (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 px-6 text-center">
          <p className="text-lg font-semibold">{t.energyBlocked}</p>
          <p className="mt-2 text-sm text-white/50">{t.energyEmpty}</p>
          <button
            type="button"
            onClick={openShop}
            className="pink-btn pill pink-glow mt-5 px-6 py-3 font-semibold"
          >
            {t.shopCta}
          </button>
        </div>
      ) : null}

      {current ? (
        <div
          className="relative h-full w-full"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onWheel={(e) => {
            if (e.deltaY > 20) go(1);
            else if (e.deltaY < -20) go(-1);
          }}
        >
          <img
            src={current.model!.avatar}
            alt=""
            className={[
              'h-full w-full object-cover',
              current.blur ? 'scale-105 blur-xl' : '',
            ].join(' ')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

          {current.type === 'video' ? (
            <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 backdrop-blur">
              <Play className="h-8 w-8 fill-white text-white" />
            </div>
          ) : null}

          {current.blur ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl bg-black/50 px-4 py-3 text-center text-sm backdrop-blur">
                <div className="font-semibold">18+</div>
                <div className="text-white/60">{t.blurHint}</div>
              </div>
            </div>
          ) : null}

          <div className="absolute bottom-28 left-4 right-4">
            <div className="flex items-center gap-2">
              <img
                src={current.model!.avatar}
                alt=""
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white/30"
              />
              <div>
                <div className="font-semibold">
                  {current.model!.name}, {current.model!.age}
                </div>
                <div className="text-sm text-white/70">{current.caption}</div>
              </div>
            </div>
            <div className="mt-3 text-center text-[11px] text-white/35">
              ↑↓ swipe · {index + 1}/{items.length}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-white/45">{t.feedEmpty}</div>
      )}
    </div>
  );
}
