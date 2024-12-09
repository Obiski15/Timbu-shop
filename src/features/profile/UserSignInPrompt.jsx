import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../../ui/components/Button";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Prompt = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  text-transform: capitalize;
  padding: 4rem 0;
`;

function UserSignInPrompt() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Prompt>
        <p>You are not signed in.</p>
        <Button onClick={() => navigate("/login")}>Sign In</Button>
      </Prompt>
    </Wrapper>
  );
}

export default UserSignInPrompt;
