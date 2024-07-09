import styled from "styled-components";

import search from "../src/assets/icons/search.svg";
import filter from "../src/assets/icons/filter.svg";
import camera from "../src/assets/icons/camera.svg";

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 20px 10px 20px;

  @media only screen and (min-width: 992px) {
    order: 2;
    flex-basis: 50%;
    width: auto;
  }
`;

const StyledInput = styled.div`
  width: 100%;
  padding: 8px 16px 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background-color: var(--input-background);
  border-radius: 2rem;

  & input {
    flex: 1;
  }
`;

function SearchInput() {
  return (
    <Wrapper>
      <StyledInput>
        <img src={search} alt="search-icon" />
        <input type="text" placeholder="Search" />
        <img src={camera} alt="search-icon" />
        <img src={filter} alt="search-icon" />
      </StyledInput>
    </Wrapper>
  );
}

export default SearchInput;
