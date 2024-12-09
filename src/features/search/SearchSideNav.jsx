import styled from "styled-components";

import { useCategories } from "../../services/categories/useCategories";
import { useSearchParams } from "react-router-dom";
import Skeleton from "../../ui/components/Skeleton";
import ErrorMessage from "../../ui/components/ErrorMessage";
import { memo, useState } from "react";
import { formatCurrency } from "../../utils/helpers";

const StyledSearchSideNav = styled.div`
  background-color: white;
  border-radius: 0.6rem;
  position: sticky;
  top: 1rem;
  grid-column: span 1;
  gap: 1rem;
  height: fit-content;
  display: none;

  & > p {
    font-size: 1.6rem;
    padding: 1rem 0 0 2rem;
    text-transform: uppercase;
    font-weight: 500;
  }

  @media only screen and (min-width: 992px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }
`;

const DummyCategories = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
`;

const Rows = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.2rem;
`;

const Row = styled.div`
  width: 100%;
  padding: 1rem 0 1rem 4rem;
  text-transform: capitalize;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const PriceRange = styled.form`
  border-top: 1px solid var(--border);
  width: 100%;
  padding: 1rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & input {
    height: 30px;
    padding: 0.5rem;
    max-width: 100px;
    flex: 1;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
  }
`;

const PriceRangeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;

  & button {
    text-transform: uppercase;
    color: var(--secondary-color);
    padding: 1rem;

    &:hover {
      background-color: #fcdbb9;
    }
  }
`;

const PriceRangeInputs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const SearchSideNav = memo(function SearchSideNav() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [maxPriceRange, setMaxPriceRange] = useState(() => {
    return searchParams.get("price")?.split("-")?.[1] || 100;
  });
  const [minPriceRange, setMinPriceRange] = useState(() => {
    return searchParams.get("price")?.split("-")?.[0] || 10;
  });

  const { data, isLoading, error } = useCategories();

  function handlePriceRangeSubmit(e) {
    e.preventDefault();
    if (!minPriceRange || !maxPriceRange) return;
    searchParams.set("price", `${minPriceRange}-${maxPriceRange}`);
    setSearchParams(searchParams);
  }

  return (
    <StyledSearchSideNav>
      <p>Category</p>

      <Rows>
        {isLoading ? (
          <DummyCategories>
            {Array.from({ length: 10 }, (_, i) => (
              <Skeleton
                key={i + 1}
                height={30}
                style={{ borderRadius: "0.5rem" }}
              />
            ))}
          </DummyCategories>
        ) : error ? (
          <ErrorMessage message={error.message} />
        ) : (
          <>
            {data?.data?.categories?.map((category, i) => (
              <Row
                style={{
                  backgroundColor:
                    searchParams.get("categoryId") ===
                    category.name.toLowerCase().replace(/ /g, "-")
                      ? "var(--border)"
                      : "",
                }}
                key={i + 1}
                onClick={() => {
                  searchParams.set(
                    "categoryId",
                    category.name.toLowerCase().replace(/ /g, "-")
                  );
                  setSearchParams(searchParams);
                }}
              >
                {category.name}
              </Row>
            ))}
            <PriceRange onSubmit={handlePriceRangeSubmit}>
              <PriceRangeHeader>
                <p>price ({formatCurrency(0)[0]}) </p>
                <button>Apply</button>
              </PriceRangeHeader>
              <PriceRangeInputs>
                <input
                  placeholder="min"
                  type="number"
                  onChange={(e) => {
                    setMinPriceRange(e.target.value);
                  }}
                  value={minPriceRange}
                />
                <p>-</p>
                <input
                  placeholder="max"
                  type="number"
                  onChange={(e) => {
                    setMaxPriceRange(e.target.value);
                  }}
                  value={maxPriceRange}
                />
              </PriceRangeInputs>
            </PriceRange>
          </>
        )}
      </Rows>
    </StyledSearchSideNav>
  );
});

export default SearchSideNav;
