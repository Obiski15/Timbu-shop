import styled from "styled-components";
import PropTypes from "prop-types";

const StyledLayout = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  max-width: 400px;
  width: 100%;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const Image = styled.div`
  width: 5rem;
  height: 5rem;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function AuthLayout({ children }) {
  return (
    <StyledLayout>
      <Main>
        <Image>
          <img src="/dark-logo.svg" alt="logo" />
        </Image>

        {children}
      </Main>
    </StyledLayout>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
