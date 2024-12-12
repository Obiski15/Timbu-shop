import { TbAdjustmentsHorizontal, TbCameraSearch } from "react-icons/tb";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MdOutlineHistory } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import styled from "styled-components";

import { useRecentlySearchedQuery } from "../../services/offline/useRecentlySearchedQuery";
import { updateRecentlySearchedQuery } from "../../services/offline/recentlySearched";
import { useSearchHints } from "../../services/item/useSearchHints";
import { useOutsideClick } from "../../hooks/useOutsideClick";

import Spinner from "../../ui/components/Spinner";
import useSearchQuery from "../../providers/search/useSearchQuery";

const InputWrapper = styled.form`
  width: 100%;
  position: relative;
  padding: 1rem 2rem;

  & svg {
    width: 24px;
    height: 24px;
  }

  @media only screen and (min-width: 992px) {
    order: 2;
    flex-basis: 50%;
    width: auto;
  }
`;

const StyledInput = styled.div`
  padding: 0 1.6rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: var(--input-background);
  transition: all 0.5s;
  outline: 1px solid var(--border);
  outline-offset: 0.3rem;
  border-radius: 1rem;

  & input {
    padding: 0.8rem 0;
    flex: 1;
    font-weight: normal;
    letter-spacing: 0.1rem;
    height: 100%;
  }
`;

const RecentlySearched = styled.div`
  width: 100%;
  max-width: ${(props) => `${props.width}px` || "100%"};
  height: 300px;
  max-height: 400px;
  background-color: white;
  border-radius: 0.5rem;
  position: absolute;
  top: 100%;
  padding: 1rem;
  overflow-y: scroll;
  z-index: 999999999999999;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RecentSearch = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;

  & p {
    font-weight: 500;
    padding: 0 1rem;
    flex: 1;
  }

  &:hover {
    background-color: var(--border);
  }
`;

const NoHistory = styled.div`
  height: 100%;
  font-weight: 500;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
`;

const NoHistoryImage = styled.div`
  width: 50px;
  height: 50px;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const NotFoundWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
`;

const NotFoundHeading = styled.p`
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.6rem;
`;

const NotFoundBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  & ul {
    list-style-position: inside;
  }
`;

function InputSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isHintsOpen, setIsHintsOpen] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);
  const { setSearchQuery } = useSearchQuery();
  const navigate = useNavigate();
  const inputRef = useRef();

  const inputContainerRef = useOutsideClick(isHintsOpen, () => {
    setIsHintsOpen(false);
  });

  const { data: recentlySearchedItems } = useRecentlySearchedQuery();
  const { hints, isFetchedHints, error } = useSearchHints(
    searchParams.get("q")
  );

  useEffect(() => {
    const current = inputContainerRef.current;
    setInputWidth(inputContainerRef.current.clientWidth);

    window.addEventListener("resize", () => {
      setInputWidth(current.clientWidth);
    });

    return () =>
      window.addEventListener("resize", () => {
        setInputWidth(current.clientWidth);
      });
  }, [inputContainerRef]);

  function handleSearch(query) {
    handleQueryUpdate(query);
    updateRecentlySearchedQuery(query);
    setIsHintsOpen(false);
    setSearchQuery(query);
    navigate(`/search/?q=${query}`);
    inputRef.current.blur();
  }

  function handleQueryUpdate(query) {
    searchParams.set("q", query);
    setSearchParams(searchParams);
  }

  return (
    <InputWrapper
      onSubmit={(e) => {
        e.preventDefault();
        if (!searchParams.get("q")) return;

        handleSearch(searchParams.get("q"));
      }}
    >
      <StyledInput ref={inputContainerRef}>
        <CiSearch />
        <input
          type="text"
          placeholder="Search Products, Brands, and Categories"
          onFocus={() => {
            setIsHintsOpen(true);
          }}
          onChange={(e) => {
            handleQueryUpdate(e.target.value);
          }}
          value={searchParams.get("q") ?? ""}
          ref={inputRef}
        />
        <TbCameraSearch />
        <TbAdjustmentsHorizontal />
      </StyledInput>
      {isHintsOpen && (
        <RecentlySearched
          width={inputWidth}
          onClick={(e) => e.stopPropagation()}
        >
          {!searchParams.get("q") ? (
            <>
              {!recentlySearchedItems?.length ? (
                <NoHistory>
                  <div>
                    <p>No search history recorded</p>

                    <NoHistoryImage>
                      <img src="/images/history.png" alt="history" />
                    </NoHistoryImage>
                  </div>
                </NoHistory>
              ) : (
                recentlySearchedItems.map((recentItem, i) => (
                  <RecentSearch
                    key={i + 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSearch(recentItem.value);
                      updateRecentlySearchedQuery(recentItem.value);
                    }}
                  >
                    <MdOutlineHistory />
                    <p>{recentItem.value}</p>
                    <FiArrowUpRight
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQueryUpdate(recentItem.value);
                      }}
                    />
                  </RecentSearch>
                ))
              )}
            </>
          ) : (
            <>
              {!isFetchedHints ? (
                <Spinner />
              ) : error ? (
                <p>error</p>
              ) : isFetchedHints && !hints?.data?.hints?.length ? (
                <NotFoundWrapper>
                  <NotFound>
                    <NotFoundHeading>
                      no results found for {searchParams.get("q")}
                    </NotFoundHeading>

                    <NotFoundBody>
                      <NotFoundHeading>Try this:</NotFoundHeading>

                      <ul>
                        <li>Check spelling</li>
                        <li>use more general words</li>
                        <li>use different words</li>
                      </ul>
                    </NotFoundBody>
                  </NotFound>
                </NotFoundWrapper>
              ) : (
                hints?.data?.hints?.map((hint, i) => (
                  <RecentSearch
                    key={i + 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSearch(hint);
                    }}
                  >
                    <MdOutlineHistory />
                    <p>{hint}</p>
                    <FiArrowUpRight
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQueryUpdate(hint);
                      }}
                    />
                  </RecentSearch>
                ))
              )}
            </>
          )}
        </RecentlySearched>
      )}
    </InputWrapper>
  );
}

export default InputSearch;
