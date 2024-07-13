import styled from "styled-components";
import PropTypes from "prop-types";

import ErrorMessage from "./ErrorMessage";

const StyledError = styled.div`
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

function FullPageError({ message }) {
  return (
    <StyledError>
      <ErrorMessage message={message} />
    </StyledError>
  );
}

FullPageError.propTypes = {
  message: PropTypes.string.isRequired,
};

export default FullPageError;
