import { Plus } from 'lucide-react';
import { GemIcon } from './Icons';
import { useAppStore } from '../store/useAppStore';

/** Header balance: gems only (energy is intentionally hidden). */
export function BalancePill() {
  const gems = useAppStore((s) => s.gems);
  const openShop = useAppStore((s) => s.openShop);

  return (
    <div className="glass pill flex items-center gap-2 py-1 pl-2.5 pr-1">
      <div className="flex items-center gap-1 text-sm font-semibold">
        <GemIcon className="h-4 w-4" />
        <span>{gems}</span>
      </div>
      <button
        type="button"
        onClick={openShop}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-luna-pink text-white pink-glow"
        aria-label="Open shop"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}
