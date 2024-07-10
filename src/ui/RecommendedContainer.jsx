import styled from "styled-components";

import { items } from "../data/data";

import Item from "./Item";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { WISHLIST_KEY } from "../utils/constants";

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

function RecommendedContainer() {
  const { value } = useLocalStorage(WISHLIST_KEY, []);
  return (
    <Container>
      {items.map((item, i) => {
        const isItemSaved =
          Boolean(value.find((el) => el.name === item.name)) ?? false;

        return <Item item={{ ...item, isItemSaved }} key={i + 1} />;
      })}
    </Container>
  );
}

export default RecommendedContainer;
