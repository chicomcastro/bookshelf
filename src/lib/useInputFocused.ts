import { useEffect, useState } from 'react';

// True enquanto um campo de texto está focado (teclado virtual aberto).
// Usado para esconder a bottom nav/FAB no iOS, onde elementos fixos sobem
// junto com o teclado.
export function useInputFocused(): boolean {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const isField = (el: Element | null) =>
      !!el &&
      (el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        (el as HTMLElement).isContentEditable);

    const recompute = () => setFocused(isField(document.activeElement));
    const onFocusIn = () => recompute();
    const onFocusOut = () => setTimeout(recompute, 0);

    window.addEventListener('focusin', onFocusIn);
    window.addEventListener('focusout', onFocusOut);
    return () => {
      window.removeEventListener('focusin', onFocusIn);
      window.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  return focused;
}
