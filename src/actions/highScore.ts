import {
  SetDealerScoreAction,
  SetSinglePlayerScoreAction,
  SET_DEALER_SCORE,
  SET_SINGLE_PLAYER_SCORE,
} from '../types/types';

export const setSinglePlayerScore = (
  score: number
): SetSinglePlayerScoreAction => ({
  type: SET_SINGLE_PLAYER_SCORE,
  payload: score,
});

export const setDealerScore = (score: number): SetDealerScoreAction => ({
  type: SET_DEALER_SCORE,
  payload: score,
});
