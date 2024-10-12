import styled from "styled-components";

import Spinner from "./Spinner";

const StyledSpinner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--backdrop-color);

  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

function FullPageSpinner() {
  return (
    <StyledSpinner>
      <Spinner />
    </StyledSpinner>
  );
}

export default FullPageSpinner;
