import {
  IoIosArrowDown,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";
import { memo, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import styled from "styled-components";
import Select from "react-select";

import { useCategories } from "../../services/categories/useCategories";
import { formatCurrency } from "../../utils/helpers";

import Button from "./Button";

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
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;

  @media only screen and (min-width: 992px) {
    display: none;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border);
  padding: 1rem;
  border-radius: 0.5rem;
`;

const PricePopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background-color: var(--backdrop);
  backdrop-filter: blur(3px);
`;

const Popup = styled.div`
  background-color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
`;

const PopupRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  text-transform: capitalize;
  font-size: 1.6rem;

  & svg {
    width: 24px;
    height: 24px;
  }
`;

const PopupInputs = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  text-transform: capitalize;
  font-size: 1.6rem;

  & input {
    border: 1px solid var(--border);
    padding: 1rem;
  }
`;

const SearchFilter = memo(function SearchFilter() {
  const [displayPricePopup, setDisplayPricePopup] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [maxPrice, setMaxPrice] = useState(() => {
    return searchParams.get("price")?.split("-")?.[1] || 100;
  });
  const [minPrice, setMinPrice] = useState(() => {
    return searchParams.get("price")?.split("-")?.[0] || 10;
  });
  const priceSubmitRef = useRef(null);

  const { data: categories } = useCategories();

  useEffect(() => {
    if (displayPricePopup) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [displayPricePopup]);

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
        <Price onClick={() => setDisplayPricePopup(true)}>
          <p>Price</p>
          <IoIosArrowDown />
        </Price>

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
              primary25: "var(--background)",
              primary50: "var(--background)",
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
              primary25: "var(--background)",
              primary50: "var(--background)",
              primary: "var(--secondary-color)",
              neutral80: "var(--secondary-color)",
            },
          })}
        />
      </SelectWrapper>

      {displayPricePopup && (
        <PricePopup>
          <Popup>
            <PopupRow>
              <p>price ({formatCurrency(0)[0]}) </p>
              <CgClose
                onClick={() => {
                  setDisplayPricePopup(false);
                }}
              />
            </PopupRow>

            <PopupInputs
              onSubmit={(e) => {
                e.preventDefault();
                if (!minPrice || !maxPrice) return;

                searchParams.set("price", `${minPrice}-${maxPrice}`);
                setSearchParams(searchParams);
                setDisplayPricePopup(false);
              }}
            >
              <input
                type="text"
                placeholder="min"
                onChange={(e) => setMinPrice(e.target.value)}
                value={minPrice}
              />
              <input
                type="text"
                placeholder="max"
                onChange={(e) => setMaxPrice(e.target.value)}
                value={maxPrice}
              />
              <button hidden ref={priceSubmitRef}></button>
            </PopupInputs>

            <PopupRow>
              <Button
                variant="secondary"
                onClick={() => {
                  setMinPrice(10);
                  setMaxPrice(100);
                }}
              >
                Reset
              </Button>
              <Button
                onClick={() => {
                  priceSubmitRef.current.click();
                }}
              >
                Save
              </Button>
            </PopupRow>
          </Popup>
        </PricePopup>
      )}
    </>
  );
});

export default SearchFilter;
