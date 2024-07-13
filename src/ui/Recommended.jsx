import styled from "styled-components";
import PropTypes from "prop-types";

import ItemsContainer from "./ItemsContainer";
import SectionHeader from "./SectionHeader";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import Item from "./Item";
import NoResult from "./NoResult";

const StyledRecommended = styled.div`
  border-top: 1px solid #e2e1e1;
  width: 100%;

  @media only screen and (min-width: 1201px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
`;

function Recommended({ data, isLoading, error }) {
  return (
    <StyledRecommended>
      <SectionHeader>
        <p>Recommended For You</p>
        <p>View All</p>
      </SectionHeader>

      {isLoading ? (
        <Spinner />
      ) : !data?.items.length ? (
        <NoResult />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <ItemsContainer
          data={data?.items}
          render={(item, i) => {
            return <Item item={item} key={i + 1} />;
          }}
        />
      )}
    </StyledRecommended>
  );
}

Recommended.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.object,
  error: PropTypes.object,
};

export default Recommended;
