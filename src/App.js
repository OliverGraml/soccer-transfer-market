import React from 'react';
import styled from 'styled-components/macro';
import {useEffect, useState} from 'react';
import PlayerForm from './PlayerForm';
import PlayerCard from './PlayerCard';
import {saveToLocal, loadFromLocal} from './lib/localStorage';
import HeaderNavgation from './HeaderNavigation';
import {Switch, Route} from 'react-router-dom';
import ShoppingCart from './ShoppingCart';
import PlayerCardsOnly from './PlayerCardsOnly';

function App() {
  const [players, setPlayers] = useState(loadFromLocal('players') ?? []);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    saveToLocal('players', players);
  }, [players]);

  function addPlayer(player) {
    setPlayers([...players, player]);
  }

  function addToShoppingCart(playerToCart) {
    setShoppingCart([...shoppingCart, playerToCart]);
  }
  console.log(shoppingCart);

  return (
    <div>
      <HeaderNavgation />
      <main>
        <Switch>
          <Route exact path="/">
            <Grid>
              <PlayerCardsOnly />
              <Players>
                {players.map((player, index) => (
                  <PlayerCard
                    key={index + player}
                    player={player}
                    onAddToShoppingCart={() => addToShoppingCart(player)}
                  />
                ))}
              </Players>
            </Grid>
          </Route>
          <Route path="/player-cards">
            <h1>Add new player</h1>
            <Grid>
              <PlayerForm onAddPlayer={addPlayer} />
              <Players>
                {players.map((player, index) => (
                  <PlayerCard
                    key={index + player}
                    player={player}
                    onAddToShoppingCart={() => addToShoppingCart(player)}
                  />
                ))}
              </Players>
            </Grid>
          </Route>
          <Route path="/cart">
            <ShoppingCart shoppingCart={shoppingCart} />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  gap: 1rem;

  @media (min-width: 576px) {
    grid-template-columns: 1fr 2fr;
  }
`;

const Players = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
