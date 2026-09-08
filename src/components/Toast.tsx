import { useAppStore } from '../store/useAppStore';

export function Toast() {
  const toast = useAppStore((s) => s.toast);
  if (!toast) return null;
  return (
    <div className="toast-anim fixed left-1/2 bottom-28 z-[80] max-w-[85%] rounded-full bg-white/95 px-4 py-2.5 text-center text-sm font-medium text-black shadow-xl">
      {toast}
    </div>
  );
}
