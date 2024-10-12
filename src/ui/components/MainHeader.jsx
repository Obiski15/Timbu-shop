import styled from "styled-components";

import search from "../../assets/icons/search.svg";
import filter from "../../assets/icons/filter.svg";
import camera from "../../assets/icons/camera.svg";

import Logo from "./Logo";
import UserProfile from "../UserProfile";

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media only screen and (min-width: 992px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    flex-direction: row;
    gap: 2.5rem;
  }
`;

const LogoWrapper = styled.div`
  display: none;

  @media only screen and (min-width: 992px) {
    order: 1;
    display: block;
  }
`;

const ProfileWrapper = styled.div`
  width: 100%;
  order: 3;

  @media only screen and (min-width: 992px) {
    width: auto;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  padding: 10px 20px 10px 20px;

  @media only screen and (min-width: 992px) {
    order: 2;
    flex-basis: 50%;
    width: auto;
  }
`;

const StyledInput = styled.div`
  width: 100%;
  padding: 8px 16px 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background-color: var(--input-background);
  border-radius: 2rem;

  & input {
    flex: 1;
  }
`;

function MainHeader() {
  return (
    <StyledHeader>
      <LogoWrapper>
        <Logo theme="dark" />
      </LogoWrapper>

      <ProfileWrapper>
        <UserProfile />
      </ProfileWrapper>

      <InputWrapper>
        <StyledInput>
          <img src={search} alt="search-icon" />
          <input type="text" placeholder="Search" />
          <img src={camera} alt="search-icon" />
          <img src={filter} alt="search-icon" />
        </StyledInput>
      </InputWrapper>
    </StyledHeader>
  );
}

export default MainHeader;
