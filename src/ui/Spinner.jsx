import styled from "styled-components";
import spin from "../assets/icons/spinner.svg";

const StyledSpinner = styled.div`
  width: 100%;
`;

const Icon = styled.img`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

function Spinner() {
  return (
    <StyledSpinner>
      <Icon src={spin} />
    </StyledSpinner>
  );
}

export default Spinner;
