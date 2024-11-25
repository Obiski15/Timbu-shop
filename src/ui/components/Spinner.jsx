import styled from "styled-components";

import spin from "../../assets/icons/spin.svg";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

function Spinner() {
  return (
    <Wrapper>
      <Icon src={spin} alt="spinner" />
    </Wrapper>
  );
}

export default Spinner;
