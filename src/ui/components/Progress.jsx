import styled from "styled-components";
import PropTypes from "prop-types";

const StyledProgress = styled.div`
  width: 100%;
  height: 0.6rem;
  border-radius: 0.8rem;
  background-image: ${(props) =>
    `linear-gradient(to right, var(--secondary-color) ${
      props.percentage ? `${props.percentage}%` : "0%"
    } , #C7C7CD ${props.percentage ? `${props.percentage}%` : "0%"})`};
`;

function Progress({ percentage }) {
  return <StyledProgress percentage={percentage}></StyledProgress>;
}

Progress.propTypes = {
  percentage: PropTypes.number.isRequired,
};
export default Progress;
