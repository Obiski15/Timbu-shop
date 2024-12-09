import { MdDeleteOutline } from "react-icons/md";
import styled from "styled-components";
import PropTypes from "prop-types";
import { memo } from "react";

import { useRemoveFromCart } from "../../services/cart/useRemoveFromCart";
import { formatCurrency } from "../../utils/helpers";

import ItemQuantityControl from "../../ui/components/ItemQuantityControl";
import { useImageIntersection } from "../../hooks/useImageIntersection";

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 2rem;

  @media only screen and (min-width: 992px) {
    padding-left: 0;
    margin-top: 1rem;

    &:not(:last-child) {
      border-bottom: 1px solid var(--border);
    }
  }
`;

const Img = styled.img`
  width: 108px;
  height: 102px;
  border-radius: 13px;
`;

const DetailsWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.2rem;
`;

const IconWrapper = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;

  &:hover {
    & > span {
      text-decoration: underline;
    }
  }

  & > svg {
    height: 24px;
    width: 24px;
  }
`;

const IconText = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--secondary-color);
  text-transform: capitalize;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: 0.4rem;
  letter-spacing: 0.005rem;
`;

const Price = styled.p`
  font-size: 2rem;
  font-weight: 500;
  color: var(--secondary-color);
`;

const Stock = styled.p`
  font-size: 1.2rem;
  font-size: 1.1rem;
  font-weight: 400;
  color: #bec0bf;
  color: ${(props) => props.color};
`;

const Discount = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  color: #bec0bf;
  text-decoration: line-through;
`;

const CartItem = memo(function CartItem({ item }) {
  const { removeFromCart, isRemovingFromCArt } = useRemoveFromCart();
  const { ref, isImageIntersecting } = useImageIntersection();

  return (
    <Item>
      <DetailsWrapper>
        <Img
          ref={ref}
          src={
            isImageIntersecting ? item?.product?.photo : "/dummy_item_image.png"
          }
          alt={item?.product?.name}
        />
        <Details>
          <p>{item?.product?.name}</p>

          {item?.product?.stock === 0 ? (
            <Stock color="var(--destructive)">Out of stock</Stock>
          ) : item?.product?.stock >= 100 ? (
            <Stock color="#75757a">In stock</Stock>
          ) : (
            <Stock color="#af7d15">Few Units Left</Stock>
          )}

          <IconWrapper
            disabled={isRemovingFromCArt}
            onClick={() => {
              removeFromCart(item?.product?._id);
            }}
          >
            <MdDeleteOutline fill="var(--secondary-color)" />
            <IconText>remove</IconText>
          </IconWrapper>
        </Details>
      </DetailsWrapper>

      <Summary>
        <Price>{formatCurrency(item?.product?.price * item?.quantity)}</Price>
        <Discount>{formatCurrency(item?.product?.discount)}</Discount>
        <ItemQuantityControl id={item?.product?._id} />
      </Summary>
    </Item>
  );
});

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
