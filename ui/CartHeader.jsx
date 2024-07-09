import styled from "styled-components";
import back from "../src/assets/icons/navigation.svg";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* gap: ; */
`;

function CartHeader() {
  return (
    <Header>
      <Img src={back} alt="back-icon" />
      <p>cart</p>
      <Icons>
        <Img src={back} alt="cart-icon" />
        <Img src={back} alt="wishlist-icon" />
      </Icons>
    </Header>
  );
}

export default CartHeader;
