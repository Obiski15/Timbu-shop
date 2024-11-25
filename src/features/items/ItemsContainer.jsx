import styled from "styled-components";
import PropTypes from "prop-types";

import { useItems } from "../../services/item/useItems";
import { memo } from "react";

import DummySectionHeader from "../../ui/layouts/dummy/DummySectionHeader";
import SectionHeader from "../../ui/components/SectionHeader";
import ErrorMessage from "../../ui/components/ErrorMessage";
import DummyItem from "../../ui/layouts/dummy/DummyItem";
import NoResult from "../../ui/components/NoResult";
import Item from "./Item";

const StyledWrapper = styled.div`
  width: 100%;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: white;
  grid-gap: 1.4rem;
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 2rem;

  margin: 0 2rem;
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media only screen and (min-width: 992px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media only screen and (min-width: 1024px) {
    grid-gap: 2rem;
    grid-template-columns: repeat(7, 1fr);
  }
`;

const ItemsContainer = memo(function ItemsContainer({
  heading,
  categoryId,
  limit,
  sortBy,
}) {
  const { data, isLoading, error } = useItems({ categoryId, limit, sortBy });

  return (
    <StyledWrapper>
      {isLoading ? (
        <DummySectionHeader />
      ) : (
        <SectionHeader>{heading}</SectionHeader>
      )}

      {isLoading ? (
        <Container>
          {Array.from({ length: 10 }, (_, i) => (
            <DummyItem key={i + 1} />
          ))}
        </Container>
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : !data?.data?.items?.length ? (
        <NoResult />
      ) : (
        <Container>
          {data?.data?.items?.map((item) => (
            <Item item={item} key={item._id} />
          ))}
        </Container>
      )}
    </StyledWrapper>
  );
});

ItemsContainer.propTypes = {
  categoryId: PropTypes.string,
  heading: PropTypes.string,
  sortBy: PropTypes.string,
  limit: PropTypes.number,
};

export default ItemsContainer;
