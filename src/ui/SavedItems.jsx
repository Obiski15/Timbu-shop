import styled from "styled-components";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { WISHLIST_KEY } from "../utils/constants";

import ItemsContainer from "./ItemsContainer";
import SectionHeader from "./SectionHeader";
import Item from "./Item";

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
  const { value: wishlist } = useLocalStorage(WISHLIST_KEY, []);

  return (
    <StyledSavedItems>
      <SectionHeader>
        <p>Saved Items{`(${wishlist.length})`}</p>
      </SectionHeader>

      <ItemsContainer
        data={wishlist}
        render={(item, i) => {
          return <Item item={{ ...item, isItemSaved: true }} key={i + 1} />;
        }}
      />
    </StyledSavedItems>
  );
}

export default SavedItems;
