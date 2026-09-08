import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { ShopSheet } from './ShopSheet';
import { NotEnoughStars } from './NotEnoughStars';
import { Toast } from './Toast';

const HIDE_NAV = ['/create', '/partner'];

export function Layout() {
  const { pathname } = useLocation();
  const hideNav =
    HIDE_NAV.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith('/chats/');

  return (
    <div className="mx-auto min-h-[100dvh] w-full max-w-lg">
      <Outlet />
      {!hideNav ? <BottomNav /> : null}
      <ShopSheet />
      <NotEnoughStars />
      <Toast />
    </div>
  );
}
