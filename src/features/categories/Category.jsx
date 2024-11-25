import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import styled from "styled-components";
import PropTypes from "prop-types";

const MobileCategory = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
  gap: 6px;

  @media only screen and (min-width: 992px) {
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

const DesktopCategory = styled.div`
  display: none;
  width: 100%;
  @media only screen and (min-width: 992px) {
    display: block;
  }
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

function Category({ category }) {
  const navigate = useNavigate();
  const { category: urlCategory } = useParams();

  const categoryName = category?.name?.toLowerCase()?.replace(/ /g, "-");

  function handleCategoryChange() {
    navigate(`/category/${categoryName}`);
  }

  return (
    <>
      <MobileCategory onClick={handleCategoryChange}>
        <CategoryImage src={category?.image} alt={category?.name} />
        <CategoryName
          style={{
            color:
              categoryName === urlCategory
                ? "var(--secondary-color)"
                : "var(--text-color)",
          }}
        >
          {category?.name}
        </CategoryName>
      </MobileCategory>

      <DesktopCategory>
        <Row onClick={handleCategoryChange}>
          <p
            style={{
              color:
                categoryName === urlCategory
                  ? "var(--secondary-color)"
                  : "var(--text-color)",
            }}
          >
            {category?.name}
          </p>

          <MdOutlineArrowForwardIos
            fill={categoryName === urlCategory ? "var(--secondary-color)" : ""}
          />
        </Row>
      </DesktopCategory>
    </>
  );
}

Category.propTypes = {
  activeCategory: PropTypes.object,
  category: PropTypes.object,
  onClick: PropTypes.func,
  index: PropTypes.number,
};

export default Category;
