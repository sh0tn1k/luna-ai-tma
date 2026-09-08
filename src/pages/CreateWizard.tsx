import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useI18n } from '../i18n';
import { useAppStore } from '../store/useAppStore';
import type { Gender, Style } from '../types';

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'pill px-4 py-2.5 text-sm font-medium transition',
        active
          ? 'bg-luna-pink text-white pink-glow'
          : 'bg-white/8 text-white/70 ring-1 ring-white/10',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

export function CreateWizard() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const wizard = useAppStore((s) => s.wizard);
  const patchWizard = useAppStore((s) => s.patchWizard);
  const resetWizard = useAppStore((s) => s.resetWizard);
  const addMyModel = useAppStore((s) => s.addMyModel);
  const showToast = useAppStore((s) => s.showToast);

  const step = wizard.step;

  const back = () => {
    if (step <= 1) navigate(-1);
    else patchWizard({ step: step - 1 });
  };

  const next = () => {
    if (step < 5) patchWizard({ step: step + 1 });
    else finish();
  };

  const finish = () => {
    const id = `mine_${Date.now()}`;
    const name = wizard.name.trim() || (wizard.gender === 'female' ? 'Luna' : 'Leo');
    addMyModel({
      id,
      name,
      age: wizard.age,
      gender: wizard.gender,
      style: wizard.style,
      avatar: '/avatars/placeholder.svg',
      personality: wizard.personality,
      voice: wizard.voice,
      bio: `${wizard.personality} · ${wizard.voice}`,
      isMine: true,
      featured: true,
    });
    resetWizard();
    showToast(t.finish);
    navigate(`/model/${id}`);
  };

  const personalities = [
    ['romantic', t.romantic],
    ['playful', t.playful],
    ['mysterious', t.mysterious],
    ['soft', t.soft],
    ['energetic', t.energetic],
    ['calm', t.calm],
  ] as const;

  const voices = [
    ['soft', t.voiceSoft],
    ['warm', t.voiceWarm],
    ['bright', t.voiceBright],
    ['deep', t.voiceDeep],
  ] as const;

  const hairs = [
    ['blonde', t.hairBlonde],
    ['brunette', t.hairBrunette],
    ['redhead', t.hairRedhead],
    ['black', t.hairBlack],
  ] as const;

  const eyes = [
    ['blue', t.eyesBlue],
    ['green', t.eyesGreen],
    ['brown', t.eyesBrown],
    ['hazel', t.eyesHazel],
  ] as const;

  const bodies = [
    ['slim', t.bodySlim],
    ['athletic', t.bodyAthletic],
    ['curvy', t.bodyCurvy],
    ['average', t.bodyAverage],
  ] as const;

  return (
    <div className="flex min-h-full flex-col pb-8">
      <AppHeader showBalance={false} showClose={false} onBack={back} />

      <div className="px-4">
        <h1 className="mb-3 text-center text-lg font-semibold">{t.createModelTitle}</h1>
        <div className="mb-6 flex gap-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={[
                'h-1 flex-1 rounded-full transition',
                i <= step ? 'bg-white' : 'bg-white/15',
              ].join(' ')}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 px-4">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <div className="mb-3 text-center text-sm text-white/50">{t.gender}</div>
              <div className="glass pill flex p-1">
                {([
                  ['female', t.female],
                  ['male', t.male],
                ] as const).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => patchWizard({ gender: id as Gender })}
                    className={[
                      'flex-1 pill py-3 text-sm font-semibold transition',
                      wizard.gender === id
                        ? 'bg-luna-pink text-white pink-glow'
                        : 'text-white/50',
                    ].join(' ')}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-center text-sm text-white/50">{t.chooseStyle}</div>
              <div className="grid grid-cols-2 gap-3">
                {([
                  ['realism', t.realism, '/avatars/realism.svg'],
                  ['anime', t.anime, '/avatars/anime.svg'],
                ] as const).map(([id, label, img]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => patchWizard({ style: id as Style })}
                    className={[
                      'relative aspect-[3/4] overflow-hidden rounded-2xl',
                      wizard.style === id ? 'ring-2 ring-luna-pink pink-glow' : 'ring-1 ring-white/10',
                    ].join(' ')}
                  >
                    <img src={img} alt={label} className="h-full w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-center font-semibold">
                      {label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-center text-white/60">{t.stepAppearance}</h2>
            <div>
              <div className="mb-2 text-sm text-white/45">{t.hair}</div>
              <div className="flex flex-wrap gap-2">
                {hairs.map(([id, label]) => (
                  <Chip key={id} active={wizard.hair === id} onClick={() => patchWizard({ hair: id })}>
                    {label}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 text-sm text-white/45">{t.eyes}</div>
              <div className="flex flex-wrap gap-2">
                {eyes.map(([id, label]) => (
                  <Chip key={id} active={wizard.eyes === id} onClick={() => patchWizard({ eyes: id })}>
                    {label}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 text-sm text-white/45">{t.body}</div>
              <div className="flex flex-wrap gap-2">
                {bodies.map(([id, label]) => (
                  <Chip key={id} active={wizard.body === id} onClick={() => patchWizard({ body: id })}>
                    {label}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-center text-white/60">{t.stepPersonality}</h2>
            <div className="grid grid-cols-2 gap-2.5">
              {personalities.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => patchWizard({ personality: id })}
                  className={[
                    'rounded-2xl px-4 py-4 text-left text-sm font-semibold',
                    wizard.personality === id
                      ? 'bg-luna-pink/90 pink-glow'
                      : 'bg-white/8 ring-1 ring-white/10',
                  ].join(' ')}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-center text-white/60">{t.stepVoice}</h2>
            <div className="space-y-2">
              {voices.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => patchWizard({ voice: id })}
                  className={[
                    'flex w-full items-center justify-between rounded-2xl px-4 py-4 text-sm font-semibold',
                    wizard.voice === id
                      ? 'bg-luna-pink/90 pink-glow'
                      : 'bg-white/8 ring-1 ring-white/10',
                  ].join(' ')}
                >
                  <span>{label}</span>
                  <span className="text-lg">🎵</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-5">
            <h2 className="text-center text-white/60">{t.stepName}</h2>
            <div className="mx-auto h-40 w-32 overflow-hidden rounded-2xl ring-2 ring-luna-pink/50">
              <img src="/avatars/placeholder.svg" alt="" className="h-full w-full object-cover" />
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm text-white/45">{t.name}</span>
              <input
                value={wizard.name}
                onChange={(e) => patchWizard({ name: e.target.value })}
                placeholder={wizard.gender === 'female' ? 'Luna' : 'Leo'}
                className="w-full rounded-2xl border-0 bg-white/8 px-4 py-3.5 text-white outline-none ring-1 ring-white/10 focus:ring-luna-pink/60"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-white/45">{t.age}</span>
              <input
                type="number"
                min={18}
                max={45}
                value={wizard.age}
                onChange={(e) => patchWizard({ age: Number(e.target.value) || 21 })}
                className="w-full rounded-2xl border-0 bg-white/8 px-4 py-3.5 text-white outline-none ring-1 ring-white/10 focus:ring-luna-pink/60"
              />
            </label>
            <div className="rounded-2xl bg-white/5 p-3 text-sm text-white/55">
              {t.preview}: {wizard.gender === 'female' ? t.female : t.male} ·{' '}
              {wizard.style === 'realism' ? t.realism : t.anime} · {wizard.personality} ·{' '}
              {wizard.voice}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 px-4">
        <button
          type="button"
          onClick={next}
          className="pink-btn pill pink-glow w-full py-3.5 text-base font-bold"
        >
          {step === 5 ? t.finish : t.continue}
        </button>
      </div>
    </div>
  );
}
