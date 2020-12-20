import { SetGameAction, SET_GAME } from '../types/types';

export const setGame = (game: string): SetGameAction => ({
  type: SET_GAME,
  payload: game,
});
