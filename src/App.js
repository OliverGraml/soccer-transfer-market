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
import {getByPlaceholderText} from '@testing-library/dom';

function App() {
  const [players, setPlayers] = useState(loadFromLocal('players') ?? []);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [playerToEdit, setPlayerToEdit] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/player')
      .then((result) => result.json())
      .then((apiPlayers) => setPlayers(apiPlayers))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    saveToLocal('footballPlayers', players);
  }, [players]);

  useEffect(() => {
    saveToLocal('players', players);
  }, [players]);

  function addPlayer(player) {
    fetch('http://localhost:5000/player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        player

        /* name: player.name,
        price: player.price,
        free_transfer: player.free_transfer,
        club: player.club,
        position: player.position,
        skills: player.skills,
        email: player.email, */
      ),
    })
      .then((result) => result.json())
      .then((playerSaved) => setPlayers([...players, playerSaved]))
      .catch((error) => console.error(error));
  }

  function editPlayer(player) {
    setPlayerToEdit(player);
  }

  function updateAndSavePlayer(playerToUpdate) {
    const upToDatePlayers = players.filter(
      (player) => player._id !== playerToUpdate._id
    );

    fetch('http://localhost:5000/player/' + playerToUpdate._id, {
      method: 'PUT', // Update
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerToUpdate),
    })
      .then((result) => result.json())
      .then((updatedPlayer) => {
        setPlayers([...upToDatePlayers, updatedPlayer]);
        setPlayerToEdit(null);
      })
      .catch((error) => console.error(error));
  }

  function deletePlayer(player) {
    fetch('http://localhost:5000/player/' + player._id, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
      .then((result) => result.json())
      .then((response) => {
        if (response.data && response.data._id) {
          const playersToKeep = players.filter(
            (player) => player._id !== response.data._id
          );
          setPlayers(playersToKeep);
        } else {
          console.log(
            'Players could not be deleted, was not found, or something else went wrong.'
          );
        }
      });
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
              <PlayerForm
                onAddPlayer={addPlayer}
                onUpdateAndSavePlayer={updateAndSavePlayer}
                playerToEdit={playerToEdit}
              />
              <Players>
                {players.map((player, index) => (
                  <PlayerCard
                    onDeletePlayer={deletePlayer}
                    onEditPlayer={editPlayer}
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
