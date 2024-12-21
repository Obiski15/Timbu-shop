import { memo, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useSearchQuery } from "../../providers/search/useSearchQuery";
import ErrorMessage from "../../ui/components/ErrorMessage";
import SearchFilter from "../../ui/components/SearchFilter";
import DummyItem from "../../ui/layouts/dummy/DummyItem";
import NoResult from "../../ui/components/NoResult";
import SearchSideNav from "../search/SearchSideNav";
import Spinner from "../../ui/components/Spinner";
import Item from "./Item";

const StyledAllItemsContainer = styled.div`
  padding: 0 2rem;
  display: grid;
  justify-content: space-between;
  align-items: start;
  gap: 2rem;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.4rem;
  padding: 1rem 2rem;
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

  @media only screen and (min-width: 1100px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media only screen and (min-width: 1440px) {
    grid-gap: 2rem;
    grid-template-columns: repeat(7, 1fr);
  }
`;

const SortByWrapper = styled.div`
  width: 100%;
  grid-column: span 4;
  padding: 1rem;
  justify-content: flex-end;
  display: flex;
  align-items: center;

  @media only screen and (min-width: 992px) {
    grid-column: span 3;
  }
`;

const Wrapper = styled.div`
  background-color: white;
  border-radius: 0.6rem;
  grid-column: span 4;

  @media only screen and (min-width: 992px) {
    grid-column: span 3;
  }
`;

const Indicator = styled.div`
  text-align: center;
  grid-column: span 4;
  @media only screen and (min-width: 992px) {
    grid-column: 2 / -1;
  }
`;

const AllItemsContainer = memo(function AllItemsContainer({
  data,
  error,
  isFetched,
  isLoading,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  isFetchNextPageError,
}) {
  const indicatorRef = useRef(null);
  const { searchQuery } = useSearchQuery();

  useEffect(() => {
    if (isLoading || error) return;

    function observerCallback(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    }

    const current = indicatorRef.current;

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0,
      rootMargin: "200px",
    });

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [isLoading, error, fetchNextPage, hasNextPage]);

  const items = useMemo(() => data, [data]);

  return (
    <StyledAllItemsContainer>
      <SearchSideNav />

      <Wrapper>
        <SortByWrapper>
          <SearchFilter />
        </SortByWrapper>
        {isLoading ? (
          <Container>
            {Array.from({ length: 6 }, (_, i) => (
              <DummyItem key={i + 1} />
            ))}
          </Container>
        ) : error ? (
          <ErrorMessage message={error.message} />
        ) : (isFetched && !data?.length) || !searchQuery ? (
          <NoResult />
        ) : (
          <Container>
            {items?.map((item, i) => (
              <Item key={i + 1} item={item} />
            ))}
          </Container>
        )}

        <Indicator ref={indicatorRef}>
          {isFetchingNextPage ? (
            <Spinner />
          ) : isFetchNextPageError ? (
            <p>{isFetchNextPageError.error}</p>
          ) : (
            ""
          )}
        </Indicator>
      </Wrapper>
    </StyledAllItemsContainer>
  );
});

AllItemsContainer.propTypes = {
  isFetchNextPageError: PropTypes.bool,
  isFetchingNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func,
  hasNextPage: PropTypes.bool,
  isLoading: PropTypes.bool,
  isFetched: PropTypes.bool,
  error: PropTypes.object,
  render: PropTypes.func,
  data: PropTypes.array,
};

export default AllItemsContainer;
