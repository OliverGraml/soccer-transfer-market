import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

function HeaderNavigation() {
  return (
    <Nav>
      <NavLinkStyled exact to="/" className="link">
        Home
      </NavLinkStyled>
      <NavLinkStyled to="/player-cards" className="link">
        Cards
      </NavLinkStyled>
      <NavLinkStyled to="/cart" className="link">
        Cart
      </NavLinkStyled>
    </Nav>
  );
}
export default HeaderNavigation;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  margin: 2rem;
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  text-decoration: none;
  background-color: lightgreen;
  color: darkgreen;
  border: 2px solid darkgreen;
  border-radius: 5px;
  padding: 3px 10px;
  :hover {
    background-color: ivory;
    border: 2px solid lightgreen;
  }
`;
