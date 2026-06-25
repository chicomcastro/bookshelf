import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { ShelfPage } from './pages/ShelfPage';
import { SearchPage } from './pages/SearchPage';
import { BookPage } from './pages/BookPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  const location = useLocation();
  return (
    <div className="mx-auto min-h-dvh max-w-md bg-base">
      <main className="pb-28">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<ShelfPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <BottomNav />
      <Toast />
    </div>
  );
}
