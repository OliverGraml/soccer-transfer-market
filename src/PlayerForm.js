import styled from 'styled-components/macro';
import {useEffect, useState} from 'react';
import Tags from './Tags';
import validatePlayer from './lib/validation';

export default function PlayerForm({
  onAddPlayer,
  onUpdateAndSavePlayer,
  playerToEdit,
}) {
  //function App() {
  const initialPlayerState = {
    name: '',
    price: '',
    free_transfer: false,
    club: '',
    position: '',
    email: '',
    skills: [],
    sold: 'false',
  };

  const [player, setPlayer] = useState(initialPlayerState);
  const [isError, setIsError] = useState(false);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/club')
      .then((result) => result.json())
      .then((clubsFromApi) => setClubs(clubsFromApi))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (playerToEdit) {
      setPlayer(playerToEdit);
    }
  }, [playerToEdit]);

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

    if (validatePlayer(player)) {
      playerToEdit ? onUpdateAndSavePlayer(player) : onAddPlayer(player);
      setPlayer(initialPlayerState);
      //onAddPlayer(player);
      //setPlayer(initialPlayerState);
      setIsError(false);
    } else {
      setIsError(true);
    }
  }

  function updateSkills(newSkill) {
    setPlayer({...player, skills: [...player.skills, newSkill.toUpperCase()]});
  }

  function removeTag(removeTag) {
    const remainingItems = player.skills.filter((skill) => skill !== removeTag);
    setPlayer({...player, skills: [...remainingItems]});
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <h3>{playerToEdit ? 'Edit' : 'Add'} Player</h3>
      {isError && <ErrorBox>You have an error in your form.</ErrorBox>}
      <label>Player name</label>
      <input
        type="text"
        name="name"
        onChange={updatePlayer}
        value={player.name}
      />
      <label>Transfer Price (in ???)</label>
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
        <option value="select"> ---Please Select a Club--- </option>
        {clubs &&
          clubs.length > 0 &&
          clubs.map((club) => (
            <option key={club._id} value={club.clubname}>
              {club.clubname}
            </option>
          ))}
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
      <Tags
        onRemoveTag={removeTag}
        onUpdateTags={updateSkills}
        tags={player.skills}
      />
      <label htmlFor="email">Contact (email)</label>
      <input
        type="text"
        name="email"
        onChange={updatePlayer}
        value={player.email}
      />
      <Buttons>
        <Button isPrimary>{playerToEdit ? 'Update' : 'Add'} player</Button>
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

const ErrorBox = styled.div`
  background: hsl(340, 60%, 50%);
  padding: 1rem;
`;
