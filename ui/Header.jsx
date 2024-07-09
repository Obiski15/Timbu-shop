import styled from "styled-components";
import PropTypes from "prop-types";

import back from "../src/assets/icons/navigation.svg";
import heart from "../src/assets/icons/active-heart.svg";
import Logo from "./Logo";
import Profile from "./Profile";

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding: 10px 20px 10px 20px;

  @media only screen and (min-width: 1201px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    padding: 0;
  }
`;

const LogoWrapper = styled.div`
  width: auto;

  @media only screen and (max-width: 1201px) {
    display: none;
  }
`;

const Text = styled.div`
  line-height: 3rem;
  font-weight: 600;
  font-size: 2.4rem;
  letter-spacing: 0.005rem;
  flex: 1;
  text-transform: capitalize;
  text-align: center;

  @media only screen and (min-width: 1201px) {
    line-height: 3.2rem;
    font-weight: 500;
    font-size: 4rem;
  }
`;

const ImgBack = styled.img`
  width: 24px;
  height: 24px;

  @media only screen and (min-width: 1201px) {
    display: none;
  }
`;

const ImgHeart = styled.img`
  width: 24px;
  height: 24px;
`;

const Add = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3.5rem;

  & div:first-child {
    @media only screen and (max-width: 1201px) {
      display: none;
    }
  }
`;

const Mobile = styled.div`
  width: 100%;

  @media only screen and (min-width: 1201px) {
    display: none;
  }
`;

function Header({ children }) {
  return (
    <StyledHeader>
      <LogoWrapper>
        <Logo theme="dark" />
      </LogoWrapper>

      <ImgBack src={back} alt="move-back-icon" />
      <Text>{children}</Text>

      <Add>
        <Profile />
        <Mobile>
          <ImgHeart src={heart} />
        </Mobile>
      </Add>
    </StyledHeader>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
