import { SET_GAME, SetGameAction } from '../types/types';

const gameReducerDefaultState = {
  game: '',
};

export default function game(
  state = gameReducerDefaultState,
  action: SetGameAction
) {
  switch (action.type) {
    case SET_GAME:
      return {
        ...state,
        game: action.payload,
      };
    default:
      return state;
  }
}
