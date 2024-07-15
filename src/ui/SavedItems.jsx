import styled from "styled-components";
import { useState } from "react";

import ItemsContainer from "./ItemsContainer";
import SectionHeader from "./SectionHeader";

const StyledSavedItems = styled.div`
  border-top: 1px solid #e2e1e1;
  width: 100%;

  @media only screen and (min-width: 1201px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
`;

function SavedItems() {
  const [wishlist, setWishlist] = useState([]);

  return (
    <StyledSavedItems>
      <SectionHeader>
        <p>Saved Items{`(${wishlist?.length})`}</p>
      </SectionHeader>

      <ItemsContainer data={wishlist} handleSetWishlist={setWishlist} />
    </StyledSavedItems>
  );
}

export default SavedItems;
