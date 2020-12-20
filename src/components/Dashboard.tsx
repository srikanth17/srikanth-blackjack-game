import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import styled from 'styled-components';

import Button from './Button';
import H4 from './H4';

import { setGame } from '../actions/game';
import gameReducer from '../reducers/game';
import { SetGameAction } from '../types/types';

const Wrapper = styled.div`
  text-align: center;
`;

const CustomButtom = styled(Button)`
  margin: 15px;
`;

const mapDispatch = (
  dispatch: ThunkDispatch<typeof gameReducer, void, SetGameAction>
) => ({
  setGame: (game: string) => dispatch(setGame(game)),
});

type DashboardProps = ReturnType<typeof mapDispatch>;

const Dashboard = ({ setGame }: DashboardProps) => (
  <Wrapper>
    <H4>Select a Game</H4>
    <div>
      <CustomButtom onClick={() => setGame('single')}>
        Single Player
      </CustomButtom>
      <CustomButtom onClick={() => setGame('dealer')}>Dealer</CustomButtom>
    </div>
  </Wrapper>
);

export default connect(undefined, mapDispatch)(Dashboard);
