import React from 'react';
import styled from 'styled-components';

import { Cards } from '../types/types';

import blankCard from '../blankCard.jpg';

const CardImage = styled.img`
  border-radius: 10px;
  height: 314px;
  width: 226px;
  margin-left: -150px;
`;

interface CardProps {
  card: Cards;
  isPlaying: boolean;
}

const Card = ({ card, isPlaying }: CardProps) => {
  return (
    <>
      {isPlaying && <CardImage src={blankCard} alt="Back card" />}
      <CardImage src={card.image} alt="Card" />
    </>
  );
};

export default Card;
