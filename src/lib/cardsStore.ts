import { mockSavedCard } from "@/data/mockData";

export interface SavedCard {
  id: string;
  last4: string;
  brand: string;
  bank: string;
  holder: string;
  expiry: string;
  isDefault: boolean;
}

const KEY = "mcharging.cards";

const seed: SavedCard[] = [
  {
    id: "default-visa",
    last4: mockSavedCard.last4,
    brand: "VISA",
    bank: mockSavedCard.bank,
    holder: mockSavedCard.holder,
    expiry: mockSavedCard.expiry,
    isDefault: true,
  },
];

export const getCards = (): SavedCard[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return seed;
  }
};

export const saveCards = (cards: SavedCard[]) => {
  localStorage.setItem(KEY, JSON.stringify(cards));
  window.dispatchEvent(new Event("cards:updated"));
};

export const addCard = (card: Omit<SavedCard, "id">): SavedCard => {
  const cards = getCards();
  const newCard: SavedCard = { ...card, id: `card-${Date.now()}` };
  let next = [...cards, newCard];
  if (newCard.isDefault) {
    next = next.map((c) => ({ ...c, isDefault: c.id === newCard.id }));
  }
  saveCards(next);
  return newCard;
};

export const setDefaultCard = (id: string) => {
  saveCards(getCards().map((c) => ({ ...c, isDefault: c.id === id })));
};

export const removeCard = (id: string) => {
  const remaining = getCards().filter((c) => c.id !== id);
  if (remaining.length && !remaining.some((c) => c.isDefault)) {
    remaining[0].isDefault = true;
  }
  saveCards(remaining);
};
