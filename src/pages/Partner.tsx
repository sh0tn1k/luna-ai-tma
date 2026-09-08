import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useI18n } from '../i18n';
import { useAppStore } from '../store/useAppStore';

export function Partner() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const showToast = useAppStore((s) => s.showToast);
  const [links, setLinks] = useState('');
  const [contact, setContact] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    showToast(t.partnerSent);
    window.setTimeout(() => navigate('/settings'), 900);
  };

  return (
    <div className="min-h-full pb-8">
      <div className="relative overflow-hidden bg-gradient-to-b from-[#5b1a6e] via-[#2a0f3d] to-[#0f0a16] pb-8 pt-1">
        <AppHeader onBack={() => navigate('/settings')} showClose={false} showBalance={false} />
        <div className="relative px-5 pt-4">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex-1">
              <h1 className="text-2xl font-bold leading-tight">{t.partnerTitle}</h1>
              <p className="mt-2 text-sm text-white/70">{t.partnerSub}</p>
            </div>
            <div className="relative mt-2 flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur" />
              <div className="relative text-center">
                <div className="text-2xl font-black">50%</div>
                <div className="text-[10px] text-white/60">👥</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={submit}
        className="-mt-4 rounded-t-[28px] bg-[#16121f] px-5 pb-8 pt-6 ring-1 ring-white/5"
      >
        <label className="block">
          <span className="mb-2 block text-sm text-white/50">{t.partnerLinks}</span>
          <textarea
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            rows={3}
            placeholder={'https://t.me/mychannel\nhttps://instagram.com/me/'}
            className="w-full resize-none rounded-2xl bg-white/6 px-4 py-3 text-sm outline-none ring-1 ring-white/10 focus:ring-luna-pink/50"
            required
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm text-white/50">{t.partnerContact}</span>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="@username"
            className="w-full rounded-2xl bg-white/6 px-4 py-3.5 text-sm outline-none ring-1 ring-white/10 focus:ring-luna-pink/50"
            required
          />
        </label>

        <p className="mt-4 text-xs leading-relaxed text-white/35">{t.partnerDisclaimer}</p>

        <button
          type="submit"
          className="pink-btn pill pink-glow mt-5 w-full py-3.5 text-base font-bold"
        >
          {t.partnerSubmit}
        </button>
      </form>
    </div>
  );
}
