import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { AI_REPLIES } from '../data/seed';
import { useI18n } from '../i18n';
import { useAppStore } from '../store/useAppStore';

export function ChatDialog() {
  const { chatId } = useParams();
  const { t } = useI18n();
  const navigate = useNavigate();
  const chat = useAppStore((s) => s.chats.find((c) => c.id === chatId));
  const model = useAppStore((s) => s.models.find((m) => m.id === chat?.modelId));
  const sendMessage = useAppStore((s) => s.sendMessage);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages.length, typing]);

  if (!chat || !model) {
    return (
      <div className="p-6">
        <AppHeader onBack={() => navigate('/chats')} showBalance={false} showClose={false} />
        <p className="mt-10 text-center text-white/50">Chat not found</p>
      </div>
    );
  }

  const onSend = () => {
    const value = text.trim();
    if (!value || typing) return;
    setText('');
    setTyping(true);
    const reply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)];
    window.setTimeout(() => {
      sendMessage(chat.id, value, reply);
      setTyping(false);
    }, 600);
  };

  return (
    <div className="flex h-[100dvh] flex-col">
      <AppHeader
        onBack={() => navigate('/chats')}
        showClose={false}
        showBalance={false}
      />
      <div className="flex items-center gap-3 border-b border-white/5 px-4 pb-3">
        <img src={model.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
        <div>
          <div className="font-semibold">{model.name}</div>
          <div className="text-xs text-emerald-400">
            {typing ? t.typing : t.online}
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
        {chat.messages.map((m) => (
          <div
            key={m.id}
            className={[
              'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
              m.role === 'user'
                ? 'ml-auto rounded-br-md bg-luna-pink/90'
                : 'mr-auto rounded-bl-md bg-white/10',
            ].join(' ')}
          >
            {m.text}
          </div>
        ))}
        {typing ? (
          <div className="mr-auto rounded-2xl rounded-bl-md bg-white/10 px-3.5 py-2.5 text-sm text-white/50">
            …
          </div>
        ) : null}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-white/5 px-3 py-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        <div className="glass pill flex items-center gap-2 p-1.5 pl-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSend();
            }}
            placeholder={t.typeMessage}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/35"
          />
          <button
            type="button"
            onClick={onSend}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-luna-pink text-white"
            aria-label={t.send}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
