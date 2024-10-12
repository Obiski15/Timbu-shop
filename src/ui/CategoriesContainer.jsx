import styled from "styled-components";

import { categories } from "../data/data";

import SwiperWrapper from "./components/SwiperWrapper";
import Category from "./Category";

const MobileCategoriesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 83px 83px 83px 83px;
  grid-template-rows: 86px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px 20px;
  gap: 0.8rem;

  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(6, 83px);
  }

  @media only screen and (min-width: 700px) {
    grid-template-columns: repeat(7, 83px);
  }

  @media only screen and (min-width: 800px) {
    grid-template-columns: repeat(8, 83px);
  }

  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(9, 83px);
  }

  @media only screen and (min-width: 1201px) {
    display: none;
  }
`;

const DesktopCategoriesContainer = styled.div`
  @media only screen and (max-width: 1201px) {
    display: none;
  }

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3.4rem;
`;

const Categories = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.6rem;
`;

function CategoriesContainer() {
  return (
    <>
      <MobileCategoriesContainer>
        {categories.map((category, i) => (
          <Category key={i + 1} category={category} />
        ))}
      </MobileCategoriesContainer>

      <DesktopCategoriesContainer>
        <Categories>
          {categories.slice(0, 8).map((category, i) => (
            <Category key={i + 1} category={category} index={i + 1} />
          ))}
        </Categories>

        <SwiperWrapper />
      </DesktopCategoriesContainer>
    </>
  );
}

export default CategoriesContainer;
