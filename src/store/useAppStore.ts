import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatThread, Lang, Model, WizardState } from '../types';
import { DEMO_MODELS } from '../data/seed';

interface UIState {
  shopOpen: boolean;
  notEnoughStarsOpen: boolean;
  toast: string | null;
}

interface AppState extends UIState {
  lang: Lang;
  gems: number;
  energy: number;
  stars: number;
  models: Model[];
  myModelIds: string[];
  chats: ChatThread[];
  wizard: WizardState;
  setLang: (lang: Lang) => void;
  addGems: (n: number) => void;
  spendEnergy: () => boolean;
  refillEnergy: (n?: number) => void;
  openShop: () => void;
  closeShop: () => void;
  openNotEnoughStars: () => void;
  closeNotEnoughStars: () => void;
  showToast: (msg: string) => void;
  clearToast: () => void;
  addMyModel: (model: Model) => void;
  ensureChat: (modelId: string) => string;
  sendMessage: (chatId: string, text: string, reply: string) => void;
  resetWizard: () => void;
  patchWizard: (patch: Partial<WizardState>) => void;
}

const defaultWizard = (): WizardState => ({
  step: 1,
  gender: 'female',
  style: 'realism',
  appearance: '',
  hair: 'brunette',
  eyes: 'brown',
  body: 'slim',
  personality: 'romantic',
  voice: 'soft',
  name: '',
  age: 21,
});

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      lang: 'en',
      gems: 0,
      energy: 15,
      stars: 0,
      models: DEMO_MODELS,
      myModelIds: [],
      chats: [],
      wizard: defaultWizard(),
      shopOpen: false,
      notEnoughStarsOpen: false,
      toast: null,

      setLang: (lang) => set({ lang }),
      addGems: (n) => set((s) => ({ gems: s.gems + n })),
      spendEnergy: () => {
        const { energy } = get();
        if (energy <= 0) return false;
        set({ energy: energy - 1 });
        return true;
      },
      refillEnergy: (n = 15) => set({ energy: n }),
      openShop: () => set({ shopOpen: true }),
      closeShop: () => set({ shopOpen: false }),
      openNotEnoughStars: () => set({ notEnoughStarsOpen: true, shopOpen: false }),
      closeNotEnoughStars: () => set({ notEnoughStarsOpen: false }),
      showToast: (msg) => {
        set({ toast: msg });
        window.setTimeout(() => {
          if (get().toast === msg) set({ toast: null });
        }, 2200);
      },
      clearToast: () => set({ toast: null }),

      addMyModel: (model) =>
        set((s) => ({
          models: [{ ...model, isMine: true }, ...s.models],
          myModelIds: [model.id, ...s.myModelIds],
        })),

      ensureChat: (modelId) => {
        const existing = get().chats.find((c) => c.modelId === modelId);
        if (existing) return existing.id;
        const id = `chat_${modelId}_${Date.now()}`;
        const thread: ChatThread = {
          id,
          modelId,
          messages: [
            {
              id: `msg_${Date.now()}`,
              role: 'assistant',
              text: "Hi! I'm so happy you started chatting with me ✨",
              createdAt: Date.now(),
            },
          ],
          updatedAt: Date.now(),
        };
        set((s) => ({ chats: [thread, ...s.chats] }));
        return id;
      },

      sendMessage: (chatId, text, reply) => {
        const now = Date.now();
        set((s) => ({
          chats: s.chats.map((c) => {
            if (c.id !== chatId) return c;
            return {
              ...c,
              updatedAt: now + 1,
              messages: [
                ...c.messages,
                { id: `u_${now}`, role: 'user' as const, text, createdAt: now },
                {
                  id: `a_${now + 1}`,
                  role: 'assistant' as const,
                  text: reply,
                  createdAt: now + 500,
                },
              ],
            };
          }),
        }));
      },

      resetWizard: () => set({ wizard: defaultWizard() }),
      patchWizard: (patch) =>
        set((s) => ({ wizard: { ...s.wizard, ...patch } })),
    }),
    {
      name: 'luna-ai-storage',
      partialize: (s) => ({
        lang: s.lang,
        gems: s.gems,
        energy: s.energy,
        stars: s.stars,
        models: s.models,
        myModelIds: s.myModelIds,
        chats: s.chats,
      }),
    },
  ),
);
