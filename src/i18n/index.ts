import { createContext, useContext } from 'react';
import { en, type Dict } from './en';
import { ru } from './ru';
import type { Lang } from '../types';

export const dictionaries: Record<Lang, Dict> = { en, ru };

export const I18nContext = createContext<{
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
}>({
  lang: 'en',
  t: en,
  setLang: () => {},
});

export function useI18n() {
  return useContext(I18nContext);
}

export { en, ru };
export type { Dict };
