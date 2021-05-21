import styled from 'styled-components';
import shopping_cart from './Images/shopping_cart.png';

export default function ShoppingCart({shoppingCart}) {
  function sumOfPlayer() {
    const sum = (accumulator, value) => parseInt(accumulator + value.price);
    return shoppingCart.reduce(sum);
  }
  console.log(sumOfPlayer);
  //.reduce(sum)
  return (
    <>
      <ImageWrapper>
        <p>
          <Img src={shopping_cart} alt="" />
          {shoppingCart.length}
        </p>
      </ImageWrapper>
      <h1>Your Shopping Cart {shoppingCart.length}</h1>
      <CardWrapper>
        <Overlay>Player</Overlay>
        <Overlay>Price</Overlay>
      </CardWrapper>
      {shoppingCart.map((item) => (
        <CardWrapper>
          <CardInline>{item.name}</CardInline>
          <CardInline>{item.price}</CardInline>
        </CardWrapper>
      ))}
      <section>
        <CardInline></CardInline>
        <CardInline>{}</CardInline>
      </section>
    </>
  );
}

const CardWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CardInline = styled.p`
  display: inline-flex;
  margin: 0.5rem 1rem;
  background-color: lightgreen;
`;

const Overlay = styled.p`
  display: inline-flex;
  margin: 0.5rem 1rem;
  background-color: darkgreen;
  padding: 3px;
  color: ivory;
`;
const Img = styled.img`
  width: 3rem;
`;
const ImageWrapper = styled.section`
  display: flex;
  justify-content: flex-end;

  p {
    margin: 0;
  }
`;
