import { X } from 'lucide-react';
import { useI18n } from '../i18n';
import { GEM_PACKS } from '../data/seed';
import { useAppStore } from '../store/useAppStore';
import { GemIcon, StarIcon } from './Icons';
import type { GemPack } from '../types';

function PackVisual({ icon }: { icon: GemPack['icon'] }) {
  const size =
    icon === 'chest' ? 'text-4xl' : icon === 'bag' ? 'text-3xl' : 'text-2xl';
  const emoji = icon === 'chest' ? '🎁' : icon === 'bag' ? '👝' : icon === 'pile' ? '💎' : '🔶';
  return <div className={`${size} leading-none`}>{emoji}</div>;
}

export function ShopSheet() {
  const { t } = useI18n();
  const open = useAppStore((s) => s.shopOpen);
  const gems = useAppStore((s) => s.gems);
  const closeShop = useAppStore((s) => s.closeShop);
  const openNotEnoughStars = useAppStore((s) => s.openNotEnoughStars);
  const showToast = useAppStore((s) => s.showToast);
  const addGems = useAppStore((s) => s.addGems);

  if (!open) return null;

  const buy = (pack: GemPack) => {
    // Demo: stars always insufficient unless we pretend user has them.
    // Always show not-enough flow OR toast — per requirements payment buttons toast only.
    // Spec: "payment buttons show toast only" + "not-enough-Stars modal"
    // Strategy: first pack click -> toast; packs with stars>0 always open not-enough since stars=0
    const stars = useAppStore.getState().stars;
    if (stars < pack.stars) {
      openNotEnoughStars();
      return;
    }
    addGems(pack.gems);
    showToast(t.paymentToast);
    closeShop();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close"
        onClick={closeShop}
      />
      <div className="relative w-full max-w-lg rounded-t-[28px] bg-[#16121f] px-4 pb-[max(20px,env(safe-area-inset-bottom))] pt-3 shadow-2xl">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{t.shop}</h2>
            <span className="text-white/40">₽</span>
            <StarIcon className="h-4 w-4" />
          </div>
          <div className="glass pill flex items-center gap-1.5 px-2.5 py-1 text-sm">
            <GemIcon className="h-3.5 w-3.5" />
            <span className="font-semibold">{gems}</span>
          </div>
          <button type="button" onClick={closeShop} className="rounded-full p-1 text-white/50">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4 overflow-hidden rounded-2xl border border-luna-pink/30 bg-gradient-to-r from-[#2a1030] to-[#1a1228] p-4 pink-glow">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="text-lg font-bold">{t.infiniteEnergy}</div>
              <p className="mt-1 text-xs text-white/60">{t.infiniteEnergySub}</p>
              <button
                type="button"
                onClick={() => showToast(t.paymentToast)}
                className="pink-btn pill mt-3 px-4 py-2 text-sm font-semibold"
              >
                {t.letsGo}
              </button>
            </div>
            <div className="h-24 w-20 rounded-2xl bg-gradient-to-b from-pink-400/40 to-purple-700/40" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 pb-2">
          {GEM_PACKS.map((pack) => (
            <button
              key={pack.id}
              type="button"
              onClick={() => buy(pack)}
              className={[
                'relative flex flex-col items-center gap-2 rounded-2xl bg-[#21182e] p-3 pt-4 text-center',
                pack.best ? 'ring-1 ring-luna-pink pink-glow' : 'ring-1 ring-white/5',
              ].join(' ')}
            >
              {pack.best ? (
                <span className="absolute -top-2 rounded-full bg-luna-pink px-2 py-0.5 text-[10px] font-semibold">
                  {t.bestPrice}
                </span>
              ) : null}
              <PackVisual icon={pack.icon} />
              <div className="text-sm font-semibold">
                {pack.gems} {t.gems}
              </div>
              <div className="glass pill mt-auto flex items-center gap-1 px-2.5 py-1 text-xs font-semibold">
                <StarIcon className="h-3.5 w-3.5" />
                {pack.stars}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
