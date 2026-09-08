import { useMemo, useState, useEffect, type ReactNode } from 'react';
import { I18nContext, dictionaries } from '../i18n';
import { useAppStore } from '../store/useAppStore';
import type { Lang } from '../types';

export function I18nProvider({ children }: { children: ReactNode }) {
  const stored = useAppStore((s) => s.lang);
  const persist = useAppStore((s) => s.setLang);
  const [lang, setLangState] = useState<Lang>(stored);

  useEffect(() => {
    setLangState(stored);
  }, [stored]);

  const value = useMemo(
    () => ({
      lang,
      t: dictionaries[lang],
      setLang: (l: Lang) => {
        setLangState(l);
        persist(l);
      },
    }),
    [lang, persist],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
