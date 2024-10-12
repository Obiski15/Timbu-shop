import styled from "styled-components";
import PropTypes from "prop-types";

const Message = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px 0 10px 0;
`;

function ErrorMessage({ message }) {
  return <Message>{`oops..${message} 😓`}</Message>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
