import PropTypes from "prop-types";
import styled from "styled-components";

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
