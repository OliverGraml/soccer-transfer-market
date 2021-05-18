import styled from 'styled-components/macro';

export default function PlayerCard({player}) {
  return (
    <Card>
      <h3>{player.name}</h3>
      <p>{player.price}</p>
      <p>{player.club}</p>
      <p>{player.position}</p>
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
  padding: 1.2rem 1rem;
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
