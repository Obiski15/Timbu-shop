import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { WISHLIST_KEY } from "../utils/constants";

import Item from "./Item";

const Container = styled.div`
  display: grid;
  grid-template-columns: 10.8rem 10.8rem 10.8rem;
  grid-template-rows: 20.9rem;
  grid-gap: 1.4rem;
  padding: 10px 20px 10px 20px;
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-width: 500px) {
    grid-template-columns: 10.8rem 10.8rem 10.8rem 10.8rem;
  }

  @media only screen and (min-width: 600px) {
    grid-template-columns: 10.8rem 10.8rem 10.8rem 10.8rem 10.8rem;
  }

  @media only screen and (min-width: 750px) {
    grid-template-columns: 10.8rem 10.8rem 10.8rem 10.8rem 10.8rem 10.8rem;
  }

  @media only screen and (min-width: 1201px) {
    grid-gap: 2rem;
    grid-template-columns: 10.8rem 10.8rem 10.8rem 10.8rem 10.8rem 10.8rem 10.8rem;
    padding: 0;
  }
`;

function ItemsContainer({ data, handleSetWishlist }) {
  const { value: wishlist, setValue: setWishlist } = useLocalStorage(
    WISHLIST_KEY,
    []
  );

  useEffect(() => {
    handleSetWishlist?.(wishlist);
  }, [wishlist, handleSetWishlist]);

  return (
    <Container>
      {data?.map((item, i) => {
        const isItemSaved = Boolean(
          wishlist.find((list) => list.id === item.id)
        );
        return (
          <Item
            item={{ ...item, isItemSaved }}
            key={i + 1}
            setWishlist={setWishlist}
            wishlist={wishlist}
          />
        );
      })}
    </Container>
  );
}

ItemsContainer.propTypes = {
  handleSetWishlist: PropTypes.any,
  data: PropTypes.array.isRequired,
};

export default ItemsContainer;
