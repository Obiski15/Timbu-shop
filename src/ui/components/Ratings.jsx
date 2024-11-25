import styled from "styled-components";
import PropTypes from "prop-types";

import star from "../../assets/icons/star.svg";

const Container = styled.div`
  width: 80px;
  height: 12px;
  padding: 0;
  font-size: 0;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;

  &::before {
    content: "";
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='12' fill='%23f6b01e'%3E%3Cpath d='m8.58.38 1.35 2.86c.1.2.28.34.49.37l3.03.46c.53.08.74.77.35 1.16l-2.19 2.23a.7.7 0 0 0-.18.6l.52 3.15c.09.55-.47.97-.94.71l-2.7-1.49a.62.62 0 0 0-.61 0L5 11.93c-.48.25-1.04-.17-.95-.72l.52-3.15a.7.7 0 0 0-.18-.6l-2.2-2.23c-.38-.4-.17-1.08.36-1.16l3.03-.46c.21-.03.4-.17.49-.37L7.42.38c.24-.5.92-.5 1.16 0'/%3E%3C/svg%3E");

    background-repeat: repeat-x;
    background-size: contain;
    height: 12px;
    width: ${(props) => `${props.avg}%` || `0%`};
    position: absolute;
    left: 0;
    top: 0;
  }
`;

function Ratings({ avg }) {
  return (
    <Container avg={avg}>
      {Array.from({ length: 5 }, (_, i) => (
        <img src={star} alt="star-rating" key={i} />
      ))}
    </Container>
  );
}

Ratings.propTypes = {
  avg: PropTypes.number.isRequired,
};

export default Ratings;
