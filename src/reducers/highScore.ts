import {
  SET_SINGLE_PLAYER_SCORE,
  HighScoreActionTypes,
  SET_DEALER_SCORE,
} from '../types/types';

const highScoreReducerDefaultState = {
  singlePlayerScore: 0,
  dealerScore: 0,
};

export default function highScore(
  state = highScoreReducerDefaultState,
  action: HighScoreActionTypes
) {
  switch (action.type) {
    case SET_SINGLE_PLAYER_SCORE:
      return {
        ...state,
        singlePlayerScore: action.payload,
      };
    case SET_DEALER_SCORE:
      return {
        ...state,
        dealerScore: action.payload,
      };
    default:
      return state;
  }
}
