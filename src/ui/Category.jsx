import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import activeRightArrow from "../assets/icons/active-right-arrow.svg";
import rightArrow from "../assets/icons/right-arrow.svg";

const MobileCategory = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
  gap: 6px;

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
  const navigate = useNavigate();
  const { category: urlCategory } = useParams();

  const categoryName = category.name
    .trim()
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll("&", "and");

  const textColor =
    categoryName === urlCategory
      ? "var(--secondary-color)"
      : "var(--text-color)";

  const imagePath = `/images/${categoryName}.png`;

  function handleCategoryChange() {
    navigate(`/${categoryName}`);
  }

  return (
    <>
      <MobileCategory onClick={handleCategoryChange}>
        <CategoryImage src={imagePath} alt={category.name} />
        <CategoryName
          style={{
            color: textColor,
          }}
        >
          {category.name}
        </CategoryName>
      </MobileCategory>

      <DesktopCategory>
        <Row onClick={handleCategoryChange}>
          <p
            style={{
              color: textColor,
            }}
          >
            {category.name}
          </p>
          <Icon
            src={categoryName === urlCategory ? activeRightArrow : rightArrow}
            alt="right-arrow"
          />
        </Row>
      </DesktopCategory>
    </>
  );
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  activeCategory: PropTypes.object,
  onClick: PropTypes.func,
  index: PropTypes.number,
};

export default Category;
