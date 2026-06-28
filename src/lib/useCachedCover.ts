import { useEffect, useState } from 'react';
import { db } from '../data/db';

// Cache local de capas como blob no IndexedDB.
// A Open Library serve capas via 302 sem max-age e a partir de outro host, então
// nem o cache HTTP nem o service worker as seguram de forma confiável — elas
// "recarregam" a cada montagem. Aqui, na 1ª vez baixamos o blob (CORS permitido)
// e guardamos; nas próximas servimos de um object URL local: instantâneo e offline.
export function useCachedCover(coverUrl?: string): string | undefined {
  const [src, setSrc] = useState<string | undefined>(coverUrl);

  useEffect(() => {
    if (!coverUrl) {
      setSrc(undefined);
      return;
    }

    // Capas locais (upload via data:, ou blob:) já são auto-contidas: usa direto.
    if (coverUrl.startsWith('data:') || coverUrl.startsWith('blob:')) {
      setSrc(coverUrl);
      return;
    }

    let active = true;
    let objectUrl: string | undefined;

    (async () => {
      try {
        const cached = await db.covers.get(coverUrl);
        if (!active) return;
        if (cached) {
          objectUrl = URL.createObjectURL(cached.blob);
          setSrc(objectUrl);
          return;
        }
      } catch {
        /* IndexedDB indisponível — segue com a URL remota */
      }

      // Cache miss: mostra a URL remota e baixa o blob para a próxima vez.
      if (active) setSrc(coverUrl);
      try {
        const res = await fetch(coverUrl, { mode: 'cors' });
        if (!res.ok) return;
        const blob = await res.blob();
        if (blob.size > 0) {
          await db.covers.put({ url: coverUrl, blob, savedAt: new Date().toISOString() });
        }
      } catch {
        /* sem rede / CORS — mantém a URL remota */
      }
    })();

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [coverUrl]);

  return src;
}
