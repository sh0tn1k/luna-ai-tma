import { MessageCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useI18n } from '../i18n';
import { useAppStore } from '../store/useAppStore';

export function ModelProfile() {
  const { id } = useParams();
  const { t } = useI18n();
  const navigate = useNavigate();
  const model = useAppStore((s) => s.models.find((m) => m.id === id));
  const ensureChat = useAppStore((s) => s.ensureChat);

  if (!model) {
    return (
      <div className="p-6">
        <AppHeader onBack={() => navigate(-1)} showBalance={false} showClose={false} />
        <p className="mt-10 text-center text-white/50">Not found</p>
      </div>
    );
  }

  const startChat = () => {
    const chatId = ensureChat(model.id);
    navigate(`/chats/${chatId}`);
  };

  return (
    <div className="safe-bottom min-h-full pb-8">
      <AppHeader onBack={() => navigate(-1)} showClose={false} />

      <div className="relative mx-3 overflow-hidden rounded-[28px]">
        <img src={model.avatar} alt={model.name} className="aspect-[3/4] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a16] via-transparent to-black/20" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="mb-1 inline-flex rounded-full bg-black/50 px-2.5 py-0.5 text-xs backdrop-blur">
            {model.gender === 'female' ? t.woman : t.man} ·{' '}
            {model.style === 'realism' ? t.realism : t.anime}
          </div>
          <h1 className="text-3xl font-bold">
            {model.name}, {model.age}
          </h1>
          <p className="mt-1 text-sm text-white/70">{model.bio}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 px-3 text-center text-xs text-white/55">
        <div className="rounded-2xl bg-white/5 p-3">
          <div className="mb-1 text-white/35">{t.personality}</div>
          <div className="font-semibold capitalize text-white">{model.personality}</div>
        </div>
        <div className="rounded-2xl bg-white/5 p-3">
          <div className="mb-1 text-white/35">{t.voice}</div>
          <div className="font-semibold capitalize text-white">{model.voice}</div>
        </div>
        <div className="rounded-2xl bg-white/5 p-3">
          <div className="mb-1 text-white/35">18+</div>
          <div className="font-semibold text-white">{t.blurHint}</div>
        </div>
      </div>

      <div className="mt-5 px-3">
        <button
          type="button"
          onClick={startChat}
          className="pink-btn pill pink-glow flex w-full items-center justify-center gap-2 py-3.5 text-base font-bold"
        >
          <MessageCircle className="h-5 w-5" />
          {t.startChat}
        </button>
      </div>
    </div>
  );
}
