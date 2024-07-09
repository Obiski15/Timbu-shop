import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import activeCart from "../src/assets/icons/active-cart.svg";
import home from "../src/assets/icons/active-home.svg";
import profile from "/images/profile.png";
import explore from "../src/assets/icons/dialpad.svg";
import activeHome from "../src/assets/icons/home.svg";
import wishlist from "../src/assets/icons/heart.svg";
import cart from "../src/assets/icons/cart.svg";

import Footer from "./Footer";
import { useEffect, useRef } from "react";

const StyledNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  padding: 10px 20px 10px 20px;
  position: fixed;
  z-index: 999;
  bottom: 0;
  background: #f8f6f4;
  box-shadow: 0px 2px 2px 0px #bec0bf33 inset;

  @media only screen and (min-width: 1201px) {
    display: none;
  }
`;

const NavWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;
`;

const IconName = styled.p`
  font-weight: 400;
  font-size: 1.2rem;
  text-transform: capitalize;
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const Desktop = styled.div`
  @media only screen and (max-width: 1201px) {
    display: none;
  }

  width: 100%;
`;

function BottomNav({ setNavHeight }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    setNavHeight(ref.current.clientHeight);
    console.log(ref);
  }, [setNavHeight]);

  return (
    <>
      <StyledNav ref={ref}>
        <NavWapper
          className={pathname === "/" ? "active-tab" : ""}
          onClick={() => {
            navigate("/");
          }}
        >
          <Img src={pathname === "/" ? activeHome : home} alt="homepage icon" />
          <IconName>home</IconName>
        </NavWapper>

        <NavWapper>
          <Img src={explore} alt="explore-icon" />
          <IconName>explore</IconName>
        </NavWapper>

        <NavWapper
          onClick={() => {
            navigate("/cart");
          }}
          className={pathname === "/cart" ? "active-tab" : ""}
        >
          <Img src={pathname === "/cart" ? activeCart : cart} alt="cart-icon" />
          <IconName>cart</IconName>
        </NavWapper>

        <NavWapper>
          <Img src={wishlist} alt="wishlist-icon" />
          <IconName>wishlist</IconName>
        </NavWapper>

        <NavWapper>
          <ProfileImg src={profile} alt="user-profile" />
          <IconName>profile</IconName>
        </NavWapper>
      </StyledNav>

      <Desktop>
        <Footer />
      </Desktop>
    </>
  );
}

BottomNav.propTypes = {
  setNavHeight: PropTypes.func,
};

export default BottomNav;
