import { create } from 'zustand';

const KEY = 'bookshelf-reading-goal';

interface GoalState {
  goal: number; // meta anual de livros
  setGoal: (n: number) => void;
}

const stored = Number(localStorage.getItem(KEY));
const initial = Number.isFinite(stored) && stored > 0 ? stored : 12;

export const useGoal = create<GoalState>((set) => ({
  goal: initial,
  setGoal: (n) => {
    const value = Math.max(1, Math.min(999, Math.round(n)));
    localStorage.setItem(KEY, String(value));
    set({ goal: value });
  },
}));
