export const SET_SINGLE_PLAYER_SCORE = 'SET_SINGLE_PLAYER_SCORE';
export const SET_DEALER_SCORE = 'SET_DEALER_SCORE';
export const SET_GAME = 'SET_GAME';

export interface ShuffleCardsResponse {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

enum Suit {
  DIAMONDS = 'DIAMONDS',
  HEARTS = 'HEARTS',
  CLUBS = 'CLUBS',
  SPADES = 'SPADES',
}

export interface Cards {
  image: string;
  value: string;
  suit: Suit;
  code: string;
}

export interface DrawCardResponse {
  success: boolean;
  cards: Cards[];
  deck_id: string;
  remaining: number;
}

export interface SetSinglePlayerScoreAction {
  type: typeof SET_SINGLE_PLAYER_SCORE;
  payload: number;
}

export interface SetDealerScoreAction {
  type: typeof SET_DEALER_SCORE;
  payload: number;
}

export type HighScoreActionTypes =
  | SetSinglePlayerScoreAction
  | SetDealerScoreAction;

export interface SetGameAction {
  type: typeof SET_GAME;
  payload: string;
}
