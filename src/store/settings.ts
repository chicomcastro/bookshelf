import { create } from 'zustand';
import type { ThemePref } from '../data/types';

const THEME_KEY = 'bookshelf-theme';

const THEME_COLOR: Record<'dark' | 'light', string> = {
  dark: '#0E0E10',
  light: '#F5F1E9',
};

function systemTheme(): 'dark' | 'light' {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function resolveTheme(pref: ThemePref): 'dark' | 'light' {
  return pref === 'system' ? systemTheme() : pref;
}

export function applyTheme(pref: ThemePref): void {
  const resolved = resolveTheme(pref);
  document.documentElement.dataset.theme = resolved;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLOR[resolved]);
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

// Quando o modo é "system", acompanha a mudança do SO em tempo real.
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
  if (useSettings.getState().theme === 'system') applyTheme('system');
});
