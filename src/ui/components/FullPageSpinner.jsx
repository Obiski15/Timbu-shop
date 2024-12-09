import styled, { keyframes } from "styled-components";

const StyledSpinner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background-color: var(--backdrop);
  backdrop-filter: blur(3px);

  & > div {
    position: absolute;
    top: 50%;
    left: 48%;
    transform: translate(-50%, -50%);
  }
`;

const imageAnimate = keyframes`
  from {
    transform: scale(1);
  } to {
    transform: scale(1.5);
  }
`;

const Image = styled.div`
  width: 50px;
  height: 50px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  animation: ${imageAnimate} 0.5s linear infinite alternate;
`;

function FullPageSpinner() {
  return (
    <StyledSpinner>
      <Image>
        <img src="/loading_logo.png" alt="loading" />
      </Image>
    </StyledSpinner>
  );
}

export default FullPageSpinner;
