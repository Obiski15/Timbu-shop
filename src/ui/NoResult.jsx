import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Button from "./Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 10px 0 10px 0;
`;

const Header = styled.p`
  font-weight: 600;
  letter-spacing: 0.2rem;
  color: #22252a;
`;

function NoResult() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <img src="/images/no-result.png" alt="no-result-found" />
      <Header>No results found!</Header>
      <p>Unfortunately, We couldn&apos;t Find any Product</p>
      <Button onClick={() => navigate("/")}>Go To Home Page</Button>
    </Wrapper>
  );
}

export default NoResult;
