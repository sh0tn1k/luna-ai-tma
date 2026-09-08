import { Flame, MessageCircle, Play, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { hapticLight } from '../hooks/useTelegram';

const items = [
  { to: '/', icon: Flame, end: true },
  { to: '/chats', icon: MessageCircle },
  { to: '/feed', icon: Play },
  { to: '/settings', icon: User },
] as const;

export function BottomNav() {
  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center pb-[max(12px,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto glass pill mx-auto flex items-center gap-1 px-2 py-1.5 shadow-2xl">
        {items.map(({ to, icon: Icon, ...rest }) => (
          <NavLink
            key={to}
            to={to}
            end={'end' in rest ? rest.end : undefined}
            onClick={() => hapticLight()}
            className={({ isActive }) =>
              [
                'flex h-12 w-14 items-center justify-center rounded-full transition-all',
                isActive
                  ? 'bg-black/50 text-luna-pink shadow-[0_0_16px_rgba(255,45,120,0.55)] ring-1 ring-luna-pink/60'
                  : 'text-white/45 hover:text-white/70',
              ].join(' ')
            }
          >
            <Icon className="h-6 w-6" strokeWidth={2.1} />
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
