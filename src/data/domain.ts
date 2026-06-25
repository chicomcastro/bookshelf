// Vocabulário curado do nicho BookTok/romantasy (ADR-0007).
// Cada item tem id estável + rótulos PT/EN + emoji. Customização vem depois.

export interface DomainTag {
  id: string;
  emoji: string;
  label: { 'pt-BR': string; en: string };
}

export const TROPES: DomainTag[] = [
  { id: 'enemies-to-lovers', emoji: '🗡️', label: { 'pt-BR': 'Inimigos a amantes', en: 'Enemies to lovers' } },
  { id: 'slow-burn', emoji: '🐌', label: { 'pt-BR': 'Slow burn', en: 'Slow burn' } },
  { id: 'found-family', emoji: '🏡', label: { 'pt-BR': 'Família que se escolhe', en: 'Found family' } },
  { id: 'forced-proximity', emoji: '🚪', label: { 'pt-BR': 'Proximidade forçada', en: 'Forced proximity' } },
  { id: 'fake-dating', emoji: '💍', label: { 'pt-BR': 'Namoro de fachada', en: 'Fake dating' } },
  { id: 'grumpy-sunshine', emoji: '🌥️', label: { 'pt-BR': 'Rabugento & solar', en: 'Grumpy x sunshine' } },
  { id: 'morally-grey', emoji: '🩶', label: { 'pt-BR': 'Moralmente cinza', en: 'Morally grey' } },
  { id: 'one-bed', emoji: '🛏️', label: { 'pt-BR': 'Só uma cama', en: 'Only one bed' } },
  { id: 'second-chance', emoji: '🔁', label: { 'pt-BR': 'Segunda chance', en: 'Second chance' } },
  { id: 'love-triangle', emoji: '📐', label: { 'pt-BR': 'Triângulo amoroso', en: 'Love triangle' } },
  { id: 'chosen-one', emoji: '⚡', label: { 'pt-BR': 'A escolhida', en: 'Chosen one' } },
  { id: 'forbidden-love', emoji: '🚫', label: { 'pt-BR': 'Amor proibido', en: 'Forbidden love' } },
];

export const MOODS: DomainTag[] = [
  { id: 'book-hangover', emoji: '🥲', label: { 'pt-BR': 'Book hangover', en: 'Book hangover' } },
  { id: 'destroyed-me', emoji: '💔', label: { 'pt-BR': 'Me destruiu', en: 'Destroyed me' } },
  { id: 'cozy', emoji: '☕', label: { 'pt-BR': 'Aconchegante', en: 'Cozy' } },
  { id: 'spicy', emoji: '🔥', label: { 'pt-BR': 'Picante', en: 'Spicy' } },
  { id: 'comfort-read', emoji: '🧸', label: { 'pt-BR': 'Leitura conforto', en: 'Comfort read' } },
  { id: 'plot-twist', emoji: '😱', label: { 'pt-BR': 'Reviravolta', en: 'Plot twist' } },
  { id: 'made-me-cry', emoji: '😭', label: { 'pt-BR': 'Me fez chorar', en: 'Made me cry' } },
  { id: 'butterflies', emoji: '🦋', label: { 'pt-BR': 'Frio na barriga', en: 'Butterflies' } },
  { id: 'addictive', emoji: '🌀', label: { 'pt-BR': 'Viciante', en: 'Addictive' } },
];

const TROPE_MAP = new Map(TROPES.map((t) => [t.id, t]));
const MOOD_MAP = new Map(MOODS.map((m) => [m.id, m]));

export const getTrope = (id: string) => TROPE_MAP.get(id);
export const getMood = (id: string) => MOOD_MAP.get(id);
