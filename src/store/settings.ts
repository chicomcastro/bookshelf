import { create } from 'zustand';
import type { ThemePref } from '../data/types';

const THEME_KEY = 'bookshelf-theme';

function resolveTheme(pref: ThemePref): 'dark' | 'light' {
  if (pref === 'system') {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return pref;
}

export function applyTheme(pref: ThemePref): void {
  document.documentElement.dataset.theme = resolveTheme(pref);
}

interface SettingsState {
  theme: ThemePref;
  setTheme: (t: ThemePref) => void;
}

const initialTheme = (localStorage.getItem(THEME_KEY) as ThemePref | null) ?? 'dark';
applyTheme(initialTheme);

export const useSettings = create<SettingsState>((set) => ({
  theme: initialTheme,
  setTheme: (theme) => {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
    set({ theme });
  },
}));
