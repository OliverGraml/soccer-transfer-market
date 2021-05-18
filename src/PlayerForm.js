import styled from 'styled-components/macro';
import {useState} from 'react';

export default function PlayerForm({onAddPlayer}) {
  //function App() {
  const initialPlayerState = {
    name: '',
    price: '',
    free_transfer: false,
    club: '',
    position: '',
    email: '',
  };

  const [player, setPlayer] = useState(initialPlayerState);

  function updatePlayer(event) {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;

    if (event.target.type === 'checkbox') {
      fieldValue = event.target.checked;
    }

    setPlayer({...player, [fieldName]: fieldValue});
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    onAddPlayer(player);
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <label>Player name</label>
      <input
        type="text"
        name="name"
        onChange={updatePlayer}
        value={player.name}
      />
      <label>Transfer Price (in €)</label>
      <input
        type="text"
        name="price"
        onChange={updatePlayer}
        value={player.price}
        disabled={player.free_transfer}
      />

      <label>On a free transfer</label>
      <input
        type="checkbox"
        name="free_transfer"
        onChange={updatePlayer}
        checked={player.free_transfer}
        disabled={player.price !== ''}
      />

      <label htmlFor="club">Club</label>
      <select id="club" name="club" onChange={updatePlayer} value={player.club}>
        <option value="fc_bayern"> ---Please Select a Club--- </option>
        <option value="fc_bayern">FC Bayern München</option>
        <option value="sv_werder">SV Werder Bremen</option>
        <option value="vfb_stuttgart">VfV Stuttgart</option>
      </select>

      <label htmlFor="position">Position</label>
      <Position>
        <input
          type="radio"
          value="striker"
          name="position"
          onChange={updatePlayer}
          checked={player.position === 'striker'}
        />{' '}
        Striker
        <input
          type="radio"
          value="midfield"
          name="position"
          onChange={updatePlayer}
          checked={player.position === 'midfield'}
        />{' '}
        Midfield
        <input
          type="radio"
          value="defence"
          name="position"
          onChange={updatePlayer}
          checked={player.position === 'defence'}
        />{' '}
        Defence
        <input
          type="radio"
          value="goalie"
          name="position"
          onChange={updatePlayer}
          checked={player.position === 'goalie'}
        />{' '}
        Goalie
      </Position>

      <label htmlFor="email">Contact (email)</label>
      <input type="text" name="email" onChange={updatePlayer} />
      <Buttons>
        <Button isPrimary type="submit">
          Add Player
        </Button>
        <Button onClick={() => setPlayer(initialPlayerState)} type="reset">
          Cancel
        </Button>
      </Buttons>
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  gap: 0.8rem;
  //width: 20rem;
  margin: auto;

  label {
    font-weight: bold;
  }
`;

const Position = styled.section`
  display: flex;
  gap: 1rem;
`;

const Buttons = styled.section`
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
`;

const Button = styled.button`
  padding: 1rem;
  display: flex;
  justify-content: center;
  border-radius: 0.2rem;
  background: ${(props) => (props.isPrimary ? 'limegreen' : 'lightgreen')};
  cursor: pointer;
  font-size: 1.2rem;
  gap: 0.5rem;
  width: 10rem;
`;
