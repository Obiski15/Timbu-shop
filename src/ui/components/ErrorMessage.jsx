import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1 / -1;
`;

const Message = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  text-align: center;
  padding: 1rem 2rem;
`;

const Image = styled.div`
  width: 100px;
  height: 100px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

function ErrorMessage({ message }) {
  return (
    <Wrapper>
      <Message>
        <Image>
          <img src="/images/error.svg" alt="error" />
        </Image>

        <p>{`oops..${message} 😓`}</p>
      </Message>
    </Wrapper>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
