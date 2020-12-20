import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import H6 from './H6';

import { RootState } from '../reducers';

const HighScoreWrapper = styled(H6)`
  text-align: right;
`;

const mapState = (state: RootState) => ({
  gameType: state.game.game,
  singlePlayerHighScore: state.highScore.singlePlayerScore,
  dealerHighScore: state.highScore.dealerScore,
});

type HeaderProps = ReturnType<typeof mapState>;

const Header = ({
  gameType,
  singlePlayerHighScore,
  dealerHighScore,
}: HeaderProps) => (
  <div>
    <HighScoreWrapper>
      High Score:{' '}
      {gameType === 'single' ? singlePlayerHighScore : dealerHighScore}
    </HighScoreWrapper>
  </div>
);

export default connect(mapState)(Header);
