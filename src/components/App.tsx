import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Container from './Container';
import Dashboard from './Dashboard';
import Dealer from './Dealer';
import SinglePlayer from './SinglePlayer';

import { ShuffleCardsResponse } from '../types/types';
import { RootState } from '../reducers';

import '../App.css';

const mapState = (state: RootState) => ({
  game: state.game.game,
});

type AppProps = ReturnType<typeof mapState>;

const App = ({ game }: AppProps) => {
  const [deckId, setDeckId] = useState('');

  useEffect(() => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json())
      .then((json: ShuffleCardsResponse) => {
        setDeckId(json.deck_id);
      });
  }, []);

  return (
    <Container>
      {game === '' && <Dashboard />}
      {game === 'single' && <SinglePlayer deckId={deckId} />}
      {game === 'dealer' && <Dealer deckId={deckId} />}
    </Container>
  );
};

export default connect(mapState)(App);
