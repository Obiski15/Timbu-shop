import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import activeRightArrow from "../src/assets/icons/active-right-arrow.svg";
import rightArrow from "../src/assets/icons/right-arrow.svg";

const MobileCategory = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
  gap: 6px;

  &:first-child figcaption {
    color: var(--secondary-color);
  }

  @media only screen and (min-width: 1201px) {
    display: none;
  }
`;

const CategoryImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const CategoryName = styled.figcaption`
  font-weight: 400;
  text-align: center;
  text-transform: capitalize;
`;

// desktop view
const DesktopCategory = styled.div`
  @media only screen and (max-width: 1201px) {
    display: none;
  }

  width: 100%;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  cursor: default;

  &:hover {
    transform: scale(1.02);
  }

  & p {
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

function Category({ category }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const imagePath = `/images/${category.name
    .toLowerCase()
    .trim()
    .replaceAll(" ", "-")
    .replaceAll("&", "and")}.png`;

  const categoryName = category.name.toLowerCase().replace(" ", "-");

  return (
    <>
      <MobileCategory>
        <CategoryImage src={imagePath} alt={category.name} />
        <CategoryName>{category.name}</CategoryName>
      </MobileCategory>

      <DesktopCategory>
        <Row
          onClick={() => {
            searchParams.get("category") !== categoryName
              ? searchParams.set("category", categoryName)
              : searchParams.get("category");
            setSearchParams(searchParams);
          }}
        >
          <p
            style={{
              color:
                categoryName === searchParams.get("category")
                  ? "var(--secondary-color)"
                  : "var(--text-color)",
            }}
          >
            {category.name}
          </p>
          <Icon
            src={
              categoryName === searchParams.get("category")
                ? activeRightArrow
                : rightArrow
            }
            alt="right-arrow"
          />
        </Row>
      </DesktopCategory>
    </>
  );
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  index: PropTypes.number,
  activeCategory: PropTypes.object,
  onClick: PropTypes.func,
};

export default Category;
