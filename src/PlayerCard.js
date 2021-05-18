export default function PlayerCard({player}) {
  return (
    <article>
      <h3>{player.name}</h3>
      <p>{player.price}</p>
      <p>{player.club}</p>
      <p>{player.position}</p>
      <p>
        <a href={`mailto:${player.email}`}>{player.email}</a>
      </p>
    </article>
  );
}

const Card = styled.articel`
  background: lightgreen;
  border-radius: 0.4rem;
  color: green;
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
    color: green;
  }
`;
