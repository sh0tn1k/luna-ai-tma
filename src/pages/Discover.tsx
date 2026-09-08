import { useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useI18n } from '../i18n';
import { useAppStore } from '../store/useAppStore';
import type { DiscoverTab, GalleryFilter, Style } from '../types';

export function Discover() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const models = useAppStore((s) => s.models);
  const myModelIds = useAppStore((s) => s.myModelIds);

  const [tab, setTab] = useState<DiscoverTab>('all');
  const [style, setStyle] = useState<Style>('realism');
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>('all');

  const filtered = useMemo(() => {
    if (tab === 'gallery') return [];
    let list = models.filter((m) => m.style === style);
    if (tab === 'mine') list = list.filter((m) => m.isMine || myModelIds.includes(m.id));
    return list;
  }, [models, myModelIds, style, tab]);

  const tabs: { id: DiscoverTab; label: string }[] = [
    { id: 'all', label: t.all },
    { id: 'mine', label: t.mine },
    { id: 'gallery', label: t.gallery },
  ];

  return (
    <div className="safe-bottom min-h-full">
      <AppHeader />

      <div className="flex items-center justify-between gap-2 px-3">
        <div className="glass pill flex items-center p-1">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={[
                'pill px-3 py-1.5 text-sm font-medium transition',
                tab === item.id ? 'bg-white/15 text-white' : 'text-white/55',
              ].join(' ')}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 px-3">
        <div className="glass pill flex p-1">
          {([
            ['realism', t.realism],
            ['anime', t.anime],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setStyle(id)}
              className={[
                'flex-1 pill py-2.5 text-sm font-semibold transition',
                style === id ? 'bg-white/12 text-white ring-1 ring-white/10' : 'text-white/45',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'gallery' ? (
        <>
          <div className="mt-3 flex gap-4 px-5 text-sm">
            {([
              ['all', t.all],
              ['photo', t.photo],
              ['video', t.video],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setGalleryFilter(id)}
                className={[
                  'pb-1 font-medium',
                  galleryFilter === id
                    ? 'border-b-2 border-luna-pink text-white'
                    : 'text-white/45',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex min-h-[45vh] items-center justify-center px-6 text-center text-white/45">
            {t.galleryEmpty}
          </div>
        </>
      ) : filtered.length === 0 ? (
        <div className="flex min-h-[45vh] items-center justify-center px-6 text-center text-white/45">
          {t.noModels}
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-2 gap-2.5 px-3 pb-24">
          {filtered.map((m) => (
            <Link
              key={m.id}
              to={`/model/${m.id}`}
              className={[
                'relative aspect-[3/4] overflow-hidden rounded-[22px] bg-luna-card',
                m.featured ? 'ring-2 ring-luna-pink pink-glow' : '',
              ].join(' ')}
            >
              <img src={m.avatar} alt={m.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <span className="absolute left-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-medium backdrop-blur-sm">
                {m.gender === 'female' ? t.woman : t.man}
              </span>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-[15px] font-semibold">
                  {m.name}, {m.age}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="pointer-events-none fixed inset-x-0 bottom-[76px] z-40 flex justify-center px-4">
        <button
          type="button"
          onClick={() => navigate('/create')}
          className="pointer-events-auto pink-btn pill pink-glow flex items-center gap-2 px-6 py-3.5 text-[15px] font-semibold shadow-lg"
        >
          <Sparkles className="h-5 w-5" />
          {tab === 'mine' ? t.createModel : t.create}
        </button>
      </div>
    </div>
  );
}
