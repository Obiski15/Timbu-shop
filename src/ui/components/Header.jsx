import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import UserProfile from "../../features/profile/UserProfile";
import Logo from "../../ui/components/Logo";

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding: 2rem;
  background-color: #f8f8f8;
  position: sticky;
  top: 0;
  z-index: 999;

  @media only screen and (min-width: 992px) {
    background: transparent;
    position: static;
    border-bottom: 1px solid var(--border);
    padding: 1rem 2rem;
  }
`;

const LogoWrapper = styled.div`
  display: none;

  @media only screen and (min-width: 992px) {
    display: block;
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

  @media only screen and (min-width: 992px) {
    line-height: 3.2rem;
    font-weight: 500;
    font-size: 4rem;
  }
`;

const Back = styled.div`
  & > svg {
    width: 24px;
    height: 24px;
  }

  @media only screen and (min-width: 992px) {
    display: none;
  }
`;

const Add = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3.5rem;

  & div:first-child {
    display: none;
    @media only screen and (min-width: 992px) {
      display: flex;
    }
  }
`;

function Header({ children }) {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <LogoWrapper>
        <Logo theme="dark" />
      </LogoWrapper>

      <Back>
        <IoIosArrowBack onClick={() => navigate(-1)} />
      </Back>
      <Text>{children}</Text>

      <Add>
        <UserProfile />
      </Add>
    </StyledHeader>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
