import styled from "styled-components";

import CategoriesContainer from "./CategoriesContainer";
import SectionHeader from "./SectionHeader";

const MobileCategories = styled.div`
  width: 100%;

  @media only screen and (min-width: 1201px) {
    display: none;
  }
`;

const DesktopCategories = styled.div`
  @media only screen and (max-width: 1201px) {
    display: none;
  }
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

function Categories() {
  return (
    <>
      <MobileCategories>
        <SectionHeader>
          <p>Categories</p>
        </SectionHeader>
        <CategoriesContainer />
      </MobileCategories>

      <DesktopCategories>
        <CategoriesContainer />
      </DesktopCategories>
    </>
  );
}

export default Categories;
