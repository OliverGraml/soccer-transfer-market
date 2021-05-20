import styled from 'styled-components/macro';
import {useEffect, useState} from 'react';
import PlayerForm from './PlayerForm';
import PlayerCard from './PlayerCard';
import {saveToLocal, loadFromLocal} from './lib/localStorage';

function App() {
  const [players, setPlayers] = useState(loadFromLocal('players') ?? []);

  useEffect(() => {
    saveToLocal('players', players);
  }, [players]);

  function addPlayer(player) {
    setPlayers([...players, player]);
  }

  return (
    <div>
      <h1>Add new player</h1>
      <Grid>
        <PlayerForm onAddPlayer={addPlayer} />
        <Players>
          {players.map((player, index) => (
            <PlayerCard key={index + player} player={player} />
          ))}
        </Players>
      </Grid>
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
