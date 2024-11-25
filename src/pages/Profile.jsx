import styled from "styled-components";

import { useUser } from "../services/user/useUser";

import ProfileNavBar from "../features/profile/ProfileNavBar";
import BottomNav from "../ui/components/BottomNav";
import Spinner from "../ui/components/Spinner";
import Header from "../ui/components/Header";
import Footer from "../ui/components/Footer";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.header`
  background-color: #222222;
  color: #ffffff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
`;

const Main = styled.div`
  flex: 1;
`;

const Account = styled.p`
  font-size: 1.8rem;
  letter-spacing: 0.1rem;
`;

const Name = styled.p`
  text-transform: capitalize;
`;

const Email = styled.p`
  font-size: 1rem;
  color: var(--secondary-color);
`;

function Profile() {
  const { user, isLoadingUser, userError } = useUser();

  return (
    <Wrapper>
      <Header>Profile</Header>
      <Main>
        <Heading>
          <Account>Account</Account>

          {isLoadingUser ? (
            <Spinner />
          ) : (
            <div>
              {userError ? (
                <>
                  <p>Welcome, User</p>
                  <p>******</p>
                </>
              ) : (
                <>
                  <Name>Welcome {user?.data?.user?.firstName}!</Name>
                  <Email>{user?.data?.user?.email}</Email>
                </>
              )}
            </div>
          )}
        </Heading>

        <ProfileNavBar />
      </Main>
      <BottomNav />
      <Footer />
    </Wrapper>
  );
}

export default Profile;
