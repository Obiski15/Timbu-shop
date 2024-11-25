import styled from "styled-components";

import UserProfile from "../../features/profile/UserProfile";
import InputSearch from "../../features/search/InputSearch";
import Logo from "./Logo";

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);

  @media only screen and (min-width: 992px) {
    padding: 2rem;
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
  display: none;
  order: 3;

  @media only screen and (min-width: 992px) {
    display: block;
    width: auto;
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

      <InputSearch />
    </StyledHeader>
  );
}

export default MainHeader;
