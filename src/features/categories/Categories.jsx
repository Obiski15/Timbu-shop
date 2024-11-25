import styled from "styled-components";

import CategoriesContainer from "./CategoriesContainer";

const MobileCategories = styled.div`
  width: 100%;

  @media only screen and (min-width: 992px) {
    display: none;
  }
`;

const Heading = styled.p`
  padding-left: 2rem;
  font-weight: 500;
`;

const DesktopCategories = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  display: none;

  @media only screen and (min-width: 992px) {
    display: block;
  }
`;

function Categories() {
  return (
    <>
      <MobileCategories>
        <Heading>Categories</Heading>
        <CategoriesContainer />
      </MobileCategories>

      <DesktopCategories>
        <CategoriesContainer />
      </DesktopCategories>
    </>
  );
}

export default Categories;
