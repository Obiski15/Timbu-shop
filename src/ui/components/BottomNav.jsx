import { useLocation, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdDialpad } from "react-icons/md";
import styled from "styled-components";

import CartIcon from "./CartIcon";

const StyledNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  padding: 1rem 2rem;

  position: sticky;
  z-index: 999;
  bottom: 0;
  background: #f8f8f8;
  box-shadow: 0px 2px 2px 0px #bec0bf33 inset;

  @media only screen and (min-width: 992px) {
    display: none;
  }
`;

const Nav = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;

  & svg {
    width: 24px;
    height: 24px;
  }

  &.active-tab {
    color: var(--secondary-color);
  }
`;

const IconName = styled.p`
  font-weight: 400;
  font-size: 1.2rem;
  text-transform: capitalize;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <StyledNav>
      <Nav
        className={pathname === "/" ? "active-tab" : ""}
        onClick={() => {
          navigate("/");
        }}
      >
        <IoHomeOutline />

        <IconName>home</IconName>
      </Nav>

      <Nav
        onClick={() => {
          navigate("/explore");
        }}
        className={pathname === "/explore" ? "active-tab" : ""}
      >
        <MdDialpad />
        <IconName>explore</IconName>
      </Nav>

      <Nav className={pathname === "/cart" ? "active-tab" : ""}>
        <CartIcon />

        <IconName>cart</IconName>
      </Nav>

      <Nav
        onClick={() => {
          navigate("/wishlist");
        }}
        className={pathname === "/wishlist" ? "active-tab" : ""}
      >
        <FaRegHeart />
        <IconName>wishlist</IconName>
      </Nav>

      <Nav
        onClick={() => {
          navigate("/profile");
        }}
        className={pathname === "/profile" ? "active-tab" : ""}
      >
        <ProfileImg src={"/images/profile.png"} alt="user-profile" />
        <IconName>profile</IconName>
      </Nav>
    </StyledNav>
  );
}

export default BottomNav;
