import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import styled from 'styled-components';

import Button from './Button';
import Card from './Card';
import Header from './Header';
import H4 from './H4';

import { setSinglePlayerScore } from '../actions/highScore';
import { setGame } from '../actions/game';
import { RootState } from '../reducers';
import highScoreReducer from '../reducers/highScore';

import {
  DrawCardResponse,
  Cards,
  SetSinglePlayerScoreAction,
  SetGameAction,
} from '../types/types';
import { fetchCard, getCardValue } from '../utils/utils';

const GameWrapper = styled.div`
  text-align: center;
`;

const CustomButtom = styled(Button)`
  margin: 15px;
`;

const CardWrapper = styled.div`
  margin: 50px;
`;

const mapState = (state: RootState) => ({
  highScore: state.highScore.singlePlayerScore,
});

const mapDispatch = (
  dispatch: ThunkDispatch<
    typeof highScoreReducer,
    void,
    SetSinglePlayerScoreAction | SetGameAction
  >
) => ({
  setHighScore: (score: number) => dispatch(setSinglePlayerScore(score)),
  setGame: (game: string) => dispatch(setGame(game)),
});

interface SinglePlayerOwnProps {
  deckId: string;
}

type SinglePlayerProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  SinglePlayerOwnProps;

const Game = ({
  deckId,
  highScore,
  setHighScore,
  setGame,
}: SinglePlayerProps) => {
  const [cards, setCards] = useState([] as Cards[]);
  const [score, setScore] = useState(0);

  const drawCard = () => {
    fetchCard(deckId, 1).then((json: DrawCardResponse) => {
      const newCards = [...cards, json.cards[0]];
      const newScore = score + getCardValue(json.cards[0].value);
      setCards(newCards);
      setScore(newScore);
      if (newScore <= 21 && newCards.length > highScore)
        setHighScore(newCards.length);
    });
  };

  const handleHome = () => {
    setGame('');
  };

  const handleNewGame = () => {
    setCards([]);
    setScore(0);
  };

  return (
    <GameWrapper>
      <Header />
      {score > 21 && <H4>You Busted!</H4>}
      {score === 21 && <H4>You Won!</H4>}
      <CardWrapper>
        {cards.length > 0 &&
          cards.map(card => (
            <Card key={card.code} card={card} isPlaying={false} />
          ))}
      </CardWrapper>
      <H4>Current Score: {score}</H4>
      <CustomButtom onClick={drawCard} disabled={score >= 21}>
        Draw Card
      </CustomButtom>
      <CustomButtom onClick={handleHome}>Home</CustomButtom>
      <CustomButtom onClick={handleNewGame}>New Game</CustomButtom>
    </GameWrapper>
  );
};

export default connect(mapState, mapDispatch)(Game);
