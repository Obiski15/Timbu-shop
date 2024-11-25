import { useLocation } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import ProfileNavBar from "../../features/profile/ProfileNavBar";
import BottomNav from "../../ui/components/BottomNav";
import Header from "../../ui/components/Header";
import Footer from "../../ui/components/Footer";

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledProfilePagesLayout = styled.div`
  flex: 1;
  margin: 1rem 2rem 2rem 2rem;
  display: grid;
  gap: 2rem;
  justify-content: space-between;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
`;

const ProfileWrapper = styled.aside`
  display: none;

  @media only screen and (min-width: 992px) {
    grid-column: span 1;
    display: block;
  }
`;

const ChildrenWrapper = styled.div`
  margin-top: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  grid-column: span 4;
  padding: 1rem 2rem;

  @media only screen and (min-width: 992px) {
    grid-column: span 3;
  }
`;

function ProfilePagesLayout({ children }) {
  const { pathname } = useLocation();

  return (
    <Layout>
      <Header>{pathname.split("/")[2].replace(/-/g, " ")}</Header>
      <StyledProfilePagesLayout>
        <ProfileWrapper>
          <ProfileNavBar />
        </ProfileWrapper>

        <ChildrenWrapper>{children}</ChildrenWrapper>
      </StyledProfilePagesLayout>
      <BottomNav />
      <Footer />
    </Layout>
  );
}

ProfilePagesLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProfilePagesLayout;
