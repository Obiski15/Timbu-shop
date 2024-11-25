import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Select from "react-select";
import { memo } from "react";
import { useCategories } from "../../services/categories/useCategories";

const StyledSortBy = styled.div`
  display: none;

  @media only screen and (min-width: 992px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: capitalize;
    width: fit-content;
    gap: 1rem;

    & > p {
      font-size: 1.6rem;
    }
  }
`;

const SortButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SortButton = styled.button`
  text-transform: capitalize;
  font-size: 1.6rem;
  padding: 1rem;
  border: 1px solid var(--border);
  transition: all 0.2s;

  &:first-child {
    border-radius: 0.5rem 0 0 0.5rem;
  }

  &:last-child {
    border-radius: 0 0.5rem 0.5rem 0;
  }

  &.active-nav {
    color: var(--secondary-color);
    background-color: var(--border);
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PriceArrows = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 1rem;

  @media only screen and (min-width: 992px) {
    display: none;
  }
`;

const SortBy = memo(function SortBy() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories, isLoading, error } = useCategories();

  function handleSort(val) {
    searchParams.set("sortBy", val);
    setSearchParams(searchParams, { replace: true });
  }

  function handleCategory(val) {
    searchParams.set("categoryId", val);
    setSearchParams(searchParams, { replace: true });
  }

  const sortOptions = [
    { value: "best match", label: "Best Matches" },
    { value: "order", label: "Order" },
    { value: "price", label: "Price Ascending" },
    { value: "-price", label: "Price Descending" },
  ];

  return (
    <>
      <StyledSortBy>
        <p>Sort by:</p>
        <SortButtons>
          <SortButton
            onClick={() => {
              searchParams.delete("sortBy");
              setSearchParams(searchParams);
            }}
            className={`${!searchParams.get("sortBy") ? "active-nav" : ""}`}
          >
            Best match
          </SortButton>
          <SortButton
            onClick={() => handleSort("order")}
            className={`${
              searchParams.get("sortBy") === "order" ? "active-nav" : ""
            }`}
          >
            order
          </SortButton>
          <SortButton
            onClick={() =>
              searchParams.get("sortBy") === "price"
                ? handleSort("-price")
                : handleSort("price")
            }
            className={`${
              searchParams.get("sortBy") === "price" ||
              searchParams.get("sortBy") === "-price"
                ? "active-nav"
                : ""
            }`}
          >
            <PriceWrapper>
              <span>price</span>
              <PriceArrows>
                <IoMdArrowDropup
                  fill={
                    searchParams.get("sortBy") === "price"
                      ? "var(--secondary-color)"
                      : ""
                  }
                />
                <IoMdArrowDropdown
                  fill={
                    searchParams.get("sortBy") === "-price"
                      ? "var(--secondary-color)"
                      : ""
                  }
                />
              </PriceArrows>
            </PriceWrapper>
          </SortButton>
        </SortButtons>
      </StyledSortBy>

      <SelectWrapper>
        <Select
          options={categories?.data?.categories?.map((category) => {
            return { label: category?.name, value: category?.name };
          })}
          defaultInputValue={searchParams.get("categoryId") || "Category"}
          onChange={(e) => {
            handleCategory(e.value);
          }}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
            }),
          }}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "var(--background-color)",
              primary50: "var(--background-color)",
              primary: "var(--secondary-color)",
              neutral80: "var(--secondary-color)",
            },
          })}
        />

        <Select
          options={sortOptions}
          defaultInputValue={searchParams.get("sortBy") || "Sort"}
          onChange={(e) => {
            handleSort(e.value);
          }}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "var(--background-color)",
              primary50: "var(--background-color)",
              primary: "var(--secondary-color)",
              neutral80: "var(--secondary-color)",
            },
          })}
        />
      </SelectWrapper>
    </>
  );
});

export default SortBy;
