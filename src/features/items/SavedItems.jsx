import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styled from "styled-components";
import { memo, useRef } from "react";

import { useWishlist } from "../../services/wishlist/useWishlist";

import DummySectionHeader from "../../ui/layouts/dummy/DummySectionHeader";
import SectionHeader from "../../ui/components/SectionHeader";
import ErrorMessage from "../../ui/components/ErrorMessage";
import DummyItem from "../../ui/layouts/dummy/DummyItem";
import NoResult from "../../ui/components/NoResult";
import Item from "./Item";

const StyledSavedItems = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  background-color: white;
  border-radius: 0 0 0.5rem 0.5rem;
  margin: 0 2rem;
  padding: 0 2rem;

  & > svg {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 0.5rem;
    background-color: #ebeaea;
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

const SavedItems = memo(function SavedItems() {
  const { wishlist = {}, error, isLoadingWishlist } = useWishlist();
  const itemsContainerRef = useRef();

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
    <StyledSavedItems>
      {isLoadingWishlist ? (
        <DummySectionHeader />
      ) : (
        <SectionHeader>
          Saved Items{`(${wishlist?.data?.wishlist?.items?.length || 0})`}
        </SectionHeader>
      )}

      {isLoadingWishlist ? (
        <Wrapper>
          <Container>
            {Array.from({ length: 7 }, (_, i) => (
              <DummyItem key={i + 1} />
            ))}
          </Container>
        </Wrapper>
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : !wishlist?.data?.wishlist?.items?.length ? (
        <NoResult />
      ) : (
        <Wrapper style={{ position: "relative" }}>
          <FaArrowLeft fill="var(--border)" onClick={scrollLeft} />
          <Container ref={itemsContainerRef}>
            {wishlist?.data?.wishlist?.items?.map((item) => (
              <Item item={item} key={item._id} />
            ))}
          </Container>
          <FaArrowRight fill="var(--border)" onClick={scrollRight} />
        </Wrapper>
      )}
    </StyledSavedItems>
  );
});

export default SavedItems;
