import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import styled from 'styled-components';

import Button from './Button';
import Card from './Card';
import Header from './Header';
import H4 from './H4';
import H6 from './H6';

import { setGame } from '../actions/game';
import { setDealerScore } from '../actions/highScore';
import gameReducer from '../reducers/game';
import { RootState } from '../reducers';

import {
  Cards,
  DrawCardResponse,
  SetGameAction,
  SetDealerScoreAction,
  ShuffleCardsResponse,
} from '../types/types';
import { fetchCard, getCardValue } from '../utils/utils';

const Wrapper = styled.div`
  text-align: center;
`;

const PlayerWrapper = styled.div`
  margin: 50px;
`;

const DealerWrapper = styled.div`
  margin: 50px;
`;

const CustomButtom = styled(Button)`
  margin: 15px;
`;

const mapState = (state: RootState) => ({
  highScore: state.highScore.dealerScore,
});

const mapDispatch = (
  dispatch: ThunkDispatch<
    typeof gameReducer,
    void,
    SetGameAction | SetDealerScoreAction
  >
) => ({
  setHighScore: (score: number) => dispatch(setDealerScore(score)),
  setGame: (game: string) => dispatch(setGame(game)),
});

interface DealerOwnProps {
  deckId: string;
}

type DealerProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  DealerOwnProps;

const Dealer = ({ deckId, highScore, setGame, setHighScore }: DealerProps) => {
  const [playerCards, setPlayerCards] = useState([] as Cards[]);
  const [dealerCards, setDealerCards] = useState([] as Cards[]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDealerWon, setIsDealerWon] = useState(false);
  const [isPlayerWon, setIsPlayerWon] = useState(false);
  const [isPlayerBlackJack, setIsPlayerBlackJack] = useState(false);
  const [isDealerBlackJack, setIsDealerBlackJack] = useState(false);
  const [isPush, setIsPush] = useState(false);
  const [newGame, setNewGame] = useState(false);

  useEffect(() => {
    fetchCard(deckId, 2).then((json: DrawCardResponse) => {
      setPlayerCards(json.cards);
      let newScore = 0;
      json.cards.forEach(card => {
        newScore += getCardValue(card.value);
      });
      setPlayerScore(newScore);
    });

    fetchCard(deckId, 2).then((json: DrawCardResponse) => {
      setDealerCards(json.cards);
      const score = getCardValue(json.cards[1].value);
      setDealerScore(score);
    });

    if (playerCards.length === 2 && playerScore === 21) {
      setIsPlayerBlackJack(true);
      setIsPlaying(false);
    }

    if (dealerCards.length === 2 && dealerScore === 21) {
      setIsDealerBlackJack(true);
      setIsPlaying(false);
    }
  }, [newGame]);

  useEffect(() => {
    if (dealerCards.length === 2 && dealerScore === 21) {
      setIsDealerBlackJack(true);
      setIsPlaying(false);
    }

    if (playerCards.length === 2 && playerScore === 21) {
      setIsPlayerBlackJack(true);
      setIsPlaying(false);
    }

    if (playerScore && dealerScore !== 0) {
      if (playerScore === dealerScore) {
        setIsPush(true);
        setIsPlaying(false);
      }
    }
  }, [dealerCards, dealerScore, playerScore]);

  useEffect(() => {
    if (dealerScore > playerScore && dealerScore <= 21) setIsDealerWon(true);
    if (playerScore > dealerScore || dealerScore > 21) {
      if (playerScore <= 21 && playerCards.length > highScore)
        setHighScore(playerCards.length);
      setIsPlayerWon(true);
    }
  }, [isPlaying]);

  const calculateDealerScore = () => {
    let newScore = 0;
    dealerCards.forEach(card => {
      newScore += getCardValue(card.value);
    });
    return newScore;
  };

  const handleHit = () => {
    fetchCard(deckId, 1).then((json: DrawCardResponse) => {
      const newCards = [...playerCards, json.cards[0]];
      const newScore = playerScore + getCardValue(json.cards[0].value);
      setPlayerCards(newCards);
      setPlayerScore(newScore);

      if (newScore === 21) {
        if (playerCards.length > highScore) setHighScore(playerCards.length);
        handleStand();
      }
    });
  };

  const handleStand = () => {
    const dealerScore = calculateDealerScore();
    setDealerScore(dealerScore);
    if (dealerScore <= 17 && dealerScore < playerScore) {
      fetchCard(deckId, 1).then((json: DrawCardResponse) => {
        const newCards = [...dealerCards, json.cards[0]];
        setDealerCards(newCards);
        const newScore = dealerScore + getCardValue(json.cards[0].value);
        setDealerScore(newScore);
      });
    }
    setIsPlaying(false);
  };

  const handleHome = () => {
    setGame('');
  };

  const handleNewGame = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
      .then(res => res.json())
      .then((json: ShuffleCardsResponse) => {});
    setPlayerCards([]);
    setDealerCards([]);
    setPlayerScore(0);
    setDealerScore(0);
    setIsPlaying(true);
    setIsDealerWon(false);
    setIsPlayerWon(false);
    setIsPlayerBlackJack(false);
    setIsDealerBlackJack(false);
    setIsPush(false);
    setNewGame(!newGame);
  };

  return (
    <Wrapper>
      <Header />
      {playerScore > 21 && <H4>You Busted!</H4>}
      {isDealerWon && <H4>Dealer Won!</H4>}
      {isPlayerWon && <H4>Player Won!</H4>}
      {isPlayerBlackJack && <H4>Player Blackjack!</H4>}
      {isDealerBlackJack && <H4>Dealer Blackjack!</H4>}
      {isPush && <H4>Push!</H4>}
      <DealerWrapper>
        <H6>Dealer: {dealerScore}</H6>
        {dealerCards.length > 0 && isPlaying ? (
          <Card
            key={dealerCards[1].code}
            card={dealerCards[1]}
            isPlaying={true}
          />
        ) : (
          dealerCards.map(card => (
            <Card key={card.code} card={card} isPlaying={false} />
          ))
        )}
      </DealerWrapper>
      <PlayerWrapper>
        <H6>Player: {playerScore}</H6>
        {playerCards.length > 0 &&
          playerCards.map(card => (
            <Card key={card.code} card={card} isPlaying={false} />
          ))}
      </PlayerWrapper>
      <CustomButtom
        onClick={handleHit}
        disabled={!isPlaying || playerScore >= 21}
      >
        Hit
      </CustomButtom>
      <CustomButtom
        onClick={handleStand}
        disabled={!isPlaying || playerScore >= 21}
      >
        Stand
      </CustomButtom>
      <CustomButtom onClick={handleHome}>Home</CustomButtom>
      <CustomButtom onClick={handleNewGame}>New Game</CustomButtom>
    </Wrapper>
  );
};

export default connect(mapState, mapDispatch)(Dealer);
