import styled from 'styled-components/macro';
import soccerBall from './Images/soccerBall.png';

export default function PlayerCard({player, onAddToShoppingCart}) {
  /*   switch (player.club) {
    case 'fc_bayern' :
      return 'FC Bayern München';
    case 'man_city' : 
      return 'Manchester City';
  } */
  return (
    <Card>
      <TopWrapper>
        <h3>{player.name.toUpperCase()}</h3>
        <Img src={soccerBall} alt="" onClick={onAddToShoppingCart} />
      </TopWrapper>
      <p>{player.price}</p>
      <p>{player.club}</p>
      <p>{player.position}</p>
      <p>
        {player.skills.map((skill) => (
          <span>{skill} </span>
        ))}
      </p>
      <p>
        <a href={`mailto:${player.email}`}>{player.email}</a>
      </p>
    </Card>
  );
}

const Card = styled.article`
  background-color: lightgreen;
  border-radius: 0.4rem;
  border: 1px solid darkgreen;
  color: brown;
  padding: 0.1rem 1rem 1.2rem 1rem;
  height: 12rem;
  min-width: calc((100% - 2rem) / 3);

  h3 {
    margin-top: 0;
  }

  p {
    margin: 0.3rem 0;
  }

  a {
    color: darkgreen;
  }
`;
const Img = styled.img`
  width: 3rem;
  cursor: pointer;
  margin: 0;

  :hover {
    opacity: 50%;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
