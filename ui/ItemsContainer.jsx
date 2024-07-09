import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: grid;
  grid-template-columns: 108px 108px 108px;
  grid-gap: 1.4rem;
  grid-template-rows: 172px;
  padding: 10px 20px 10px 20px;
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-width: 500px) {
    grid-template-columns: 108px 108px 108px 108px;
  }

  @media only screen and (min-width: 600px) {
    grid-template-columns: 108px 108px 108px 108px 108px;
  }

  @media only screen and (min-width: 750px) {
    grid-template-columns: 108px 108px 108px 108px 108px 108px;
  }

  @media only screen and (min-width: 1024px) {
    grid-template-columns: 108px 108px 108px 108px 108px 108px 108px;
    padding: 0;
  }
`;

function ItemsContainer({ data, render }) {
  return <Container>{data.map(render)}</Container>;
}

ItemsContainer.propTypes = {
  data: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
};

export default ItemsContainer;
