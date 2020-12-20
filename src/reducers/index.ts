import { combineReducers } from 'redux';
import highScore from './highScore';
import game from './game';

const rootReducer = combineReducers({
  highScore,
  game,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
