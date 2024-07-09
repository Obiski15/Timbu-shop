import styled from "styled-components";

import SearchInput from "./SearchInput";
import Profile from "./Profile";
import Logo from "./Logo";

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

function HomepageHeader() {
  return (
    <StyledHeader>
      <LogoWrapper>
        <Logo theme="dark" />
      </LogoWrapper>

      <ProfileWrapper>
        <Profile />
      </ProfileWrapper>

      <SearchInput />
    </StyledHeader>
  );
}

export default HomepageHeader;
