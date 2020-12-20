export const getCardValue = (value: string) => {
  const cardValues: Record<string, number> = {
    ACE: 11,
    KING: 10,
    QUEEN: 10,
    JACK: 10,
    10: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
  };
  return cardValues[value];
};

export const fetchCard = async (deckId: string, count: number) => {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`
  );
  return res.json();
};
