import styled from "styled-components";
import PropTypes from "prop-types";

const Line = styled.hr`
  display: none;

  @media only screen and (min-width: 1201px) {
    width: 100%;
    transform: ${(props) => `translateY(-${props.gap}rem)`};
    display: block;
    height: 0.2rem;
    background-color: #e2e1e1;
  }
`;

function HorizontalLine({ gap }) {
  return <Line gap={gap} />;
}

HorizontalLine.propTypes = {
  gap: PropTypes.number,
};

export default HorizontalLine;
