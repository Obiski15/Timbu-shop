import { memo, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useImageIntersection } from "../../hooks/useImageIntersection";
import { formatCurrency } from "../../utils/helpers";

import WishlistControl from "../../ui/components/WishlistControl";
import AddtoCartButton from "../../ui/components/AddtoCartButton";

const StyledItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;

  &:hover {
    scale: 1.05;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
    border-radius: 0.5rem;
  }
`;

const Image = styled.div`
  width: 100%;
  height: 102px;

  & > img {
    border-radius: 0.5rem 0.5rem 0 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const WishlistControlWrapper = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

const ItemDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  gap: 0.6rem;
`;

const ItemName = styled.p`
  text-transform: capitalize;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.6rem;
  text-overflow: ellipsis;
  width: 10.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemPrice = styled.p`
  color: var(--secondary-color);
`;

const Discount = styled.p`
  text-decoration: line-through;
  font-style: italic;
  color: var(--border);
`;

const Item = memo(function Item({ item }) {
  // const navigate = useNavigate();
  const { _id: id, name, photo: image, price, discount } = item;
  const { ref, isImageIntersecting } = useImageIntersection();

  const handleNavigate = useCallback(() => {
    // react router's useNavigate re-renders when searching
    // for items due to url change. Bad for app's performance
    // navigate(`/product/${name}/${id}`);

    window.location = `/product/${name}/${id}`;
  }, [id, name]);

  return (
    <StyledItem onClick={handleNavigate}>
      <Image ref={ref}>
        <img
          src={isImageIntersecting ? image : "/dummy_item_image.png"}
          loading="lazy"
          alt={name}
        />
      </Image>
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <ItemPrice>{formatCurrency(price)}</ItemPrice>
        <Discount>{formatCurrency(discount)}</Discount>
        {/* <AddtoCartButton id={id} /> */}
      </ItemDetails>

      <WishlistControlWrapper>
        <WishlistControl id={id} />
      </WishlistControlWrapper>
    </StyledItem>
  );
});

Item.propTypes = {
  item: PropTypes.object,
};

export default Item;
