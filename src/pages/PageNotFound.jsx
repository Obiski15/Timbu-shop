import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import BottomNav from "../ui/components/BottomNav";
import Button from "../ui/components/Button";
import Footer from "../ui/components/Footer";
import Header from "../ui/components/Header";

const StyledPageNotFound = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media only screen and (min-width: 992px) {
    flex-direction: row;
  }
`;

const Message = styled.div`
  order: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;
  width: 80%;
  flex-shrink: 0;

  @media only screen and (min-width: 992px) {
    order: 1;
    width: 25%;
  }

  & > p {
    text-transform: capitalize;
    font-weight: 600;

    &:first-child {
      font-size: 2.4rem;
    }

    &:nth-child(3) {
      font-weight: normal;
    }
  }
`;

const Image = styled.div`
  width: 90%;
  height: 400px;
  padding: 2rem 0;
  order: 1;

  @media only screen and (min-width: 992px) {
    width: 50%;
    order: 2;
  }

  & > img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <StyledPageNotFound>
      <Header>not found</Header>

      <Main>
        <Content>
          <Message>
            <p>not found (404)</p>
            <p>We couldn&apos;t find the page you are looking for</p>
            <p>But we have millions of shopping items for you to browse</p>
            <Button onClick={() => navigate("/")}>GO TO HOMEPAGE</Button>
          </Message>

          <Image>
            <img src="/images/people.svg" alt="people-sss" />
          </Image>
        </Content>
      </Main>

      <BottomNav />
      <Footer />
    </StyledPageNotFound>
  );
}

export default PageNotFound;
