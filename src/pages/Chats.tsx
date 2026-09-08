import { Link } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useI18n } from '../i18n';
import { useAppStore } from '../store/useAppStore';
import { useState } from 'react';
import type { Style } from '../types';

export function Chats() {
  const { t } = useI18n();
  const chats = useAppStore((s) => s.chats);
  const models = useAppStore((s) => s.models);
  const [style, setStyle] = useState<Style>('anime');

  const enriched = chats
    .map((c) => {
      const model = models.find((m) => m.id === c.modelId);
      return model ? { chat: c, model } : null;
    })
    .filter(Boolean)
    .filter((x) => x!.model.style === style) as {
    chat: (typeof chats)[0];
    model: (typeof models)[0];
  }[];

  return (
    <div className="safe-bottom min-h-full">
      <AppHeader title={t.chats} showBalance={false} />

      <div className="mt-1 px-3">
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
                'flex-1 pill py-2.5 text-sm font-semibold',
                style === id ? 'bg-white/12 text-white' : 'text-white/45',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {enriched.length === 0 ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-8 text-center">
          <p className="text-lg font-semibold">{t.noChats}</p>
          <p className="mt-2 text-sm text-white/45">{t.noChatsHint}</p>
        </div>
      ) : (
        <ul className="mt-3 space-y-1 px-2 pb-24">
          {enriched.map(({ chat, model }) => {
            const last = chat.messages[chat.messages.length - 1];
            return (
              <li key={chat.id}>
                <Link
                  to={`/chats/${chat.id}`}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 hover:bg-white/5"
                >
                  <img
                    src={model.avatar}
                    alt=""
                    className="h-14 w-14 rounded-full object-cover ring-1 ring-white/10"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold">{model.name}</span>
                      <span className="text-[11px] text-white/35">
                        {new Date(chat.updatedAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="truncate text-sm text-white/45">{last?.text}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
