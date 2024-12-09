import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styled from "styled-components";
import { memo, useRef } from "react";
import PropTypes from "prop-types";

import { useItems } from "../../services/item/useItems";

import DummySectionHeader from "../../ui/layouts/dummy/DummySectionHeader";
import SectionHeader from "../../ui/components/SectionHeader";
import ErrorMessage from "../../ui/components/ErrorMessage";
import DummyItem from "../../ui/layouts/dummy/DummyItem";
import NoResult from "../../ui/components/NoResult";
import Item from "./Item";

const StyledHorizontalItemContainer = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  background-color: white;
  border-radius: 0 0 0.5rem 0.5rem;
  position: relative;
  margin: 0 2rem;
  padding: 0 2rem;

  & > svg {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 0.5rem;
    background-color: #313133;
    opacity: 0.5;
    top: 40%;
    z-index: 999;

    &:first-child {
      left: 1.2rem;
    }

    &:last-child {
      right: 1.2rem;
    }
  }
`;

const Container = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: scroll;
  gap: 1.4rem;
  padding: 1rem 0;
`;

const HorizontalItemsContainer = memo(function HorizontalItemsContainer({
  categoryId,
  limit,
  sortBy,
  heading,
}) {
  const { data, isLoading, error } = useItems({ categoryId, limit, sortBy });

  const itemsContainerRef = useRef(null);

  function scrollLeft() {
    itemsContainerRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    itemsContainerRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  }

  return (
    <StyledHorizontalItemContainer>
      {isLoading ? (
        <DummySectionHeader />
      ) : (
        <SectionHeader>{heading}</SectionHeader>
      )}

      {isLoading ? (
        <Wrapper>
          <Container>
            {Array.from({ length: 8 }, (_, i) => (
              <DummyItem key={i + 1} />
            ))}
          </Container>
        </Wrapper>
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : !data?.data?.items?.length ? (
        <NoResult />
      ) : (
        <Wrapper>
          <FaArrowLeft fill="white" onClick={scrollLeft} />
          <Container ref={itemsContainerRef}>
            {data?.data?.items?.map((item) => (
              <Item item={item} key={item?._id} />
            ))}
          </Container>
          <FaArrowRight fill="white" onClick={scrollRight} />
        </Wrapper>
      )}
    </StyledHorizontalItemContainer>
  );
});

HorizontalItemsContainer.propTypes = {
  categoryId: PropTypes.string,
  isLoading: PropTypes.string,
  heading: PropTypes.string,
  sortBy: PropTypes.string,
  limit: PropTypes.number,
};

export default HorizontalItemsContainer;
