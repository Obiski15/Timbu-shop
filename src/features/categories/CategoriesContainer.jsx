import styled from "styled-components";

import { useCategories } from "../../services/categories/useCategories";

import ErrorMessage from "../../ui/components/ErrorMessage";
import Skeleton from "../../ui/components/Skeleton";
import Swiper from "../../ui/components/Swiper";
import Category from "./Category";

const MobileCategoriesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;

  gap: 0.8rem;

  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media only screen and (min-width: 700px) {
    grid-template-columns: repeat(7, 1fr);
  }

  @media only screen and (min-width: 800px) {
    grid-template-columns: repeat(8, 1fr);
  }

  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(9, 1fr);
  }

  @media only screen and (min-width: 992px) {
    display: none;
  }
`;

const DesktopCategoriesContainer = styled.div`
  display: none;
  width: 100%;

  @media only screen and (min-width: 992px) {
    display: block;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 3.4rem;
  }
`;

const Categories = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.6rem;
  padding-bottom: 1rem;
`;

function CategoriesContainer() {
  const { data, isLoading, error } = useCategories();

  return (
    <>
      <MobileCategoriesContainer>
        {isLoading ? (
          Array.from({ length: 8 }, (_, index) => (
            <Skeleton
              style={{ borderRadius: "50%" }}
              height={50}
              width={50}
              key={index}
            />
          ))
        ) : error ? (
          <ErrorMessage message={error.message} />
        ) : (
          data?.data?.categories.map((category, i) => (
            <Category key={i + 1} category={category} />
          ))
        )}
      </MobileCategoriesContainer>

      <DesktopCategoriesContainer>
        <Categories>
          {isLoading ? (
            Array.from({ length: 7 }, (_, index) => (
              <Skeleton
                key={index}
                height={30}
                style={{ borderRadius: "10px" }}
              />
            ))
          ) : error ? (
            <ErrorMessage message={error.message} />
          ) : (
            data?.data?.categories.map((category, i) => (
              <Category key={i + 1} category={category} index={i + 1} />
            ))
          )}
        </Categories>

        <Swiper />
      </DesktopCategoriesContainer>
    </>
  );
}

export default CategoriesContainer;
