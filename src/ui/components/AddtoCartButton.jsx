import { MdAddShoppingCart } from "react-icons/md";
import styled from "styled-components";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

import { useAddToCart } from "../../services/cart/useAddToCart";
import { useCart } from "../../services/cart/useCart";

import ItemQuantityControl from "./ItemQuantityControl";
import Spinner from "./Spinner";
import Button from "./Button";

const Wrapper = styled.div`
  width: 100%;

  & button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  & svg {
    width: 24px;
    height: 24px;
  }

  & p {
    flex: 1;
  }
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function AddtoCartButton({ id }) {
  const { addToCart, isAddingToCart } = useAddToCart();
  const { cart } = useCart();

  const currentItem = cart?.data?.cart?.items?.find(
    (item) => item?.product?._id === id
  );

  return (
    <>
      {currentItem ? (
        <ItemQuantityControl id={id} />
      ) : (
        <Wrapper>
          <Button
            full={true}
            disabled={isAddingToCart}
            onClick={(e) => {
              e.stopPropagation();
              if (!navigator.onLine) return toast.error("No Internet Access");
              addToCart(id);
            }}
          >
            <MdAddShoppingCart />
            {isAddingToCart ? (
              <SpinnerWrapper>
                <Spinner />
              </SpinnerWrapper>
            ) : (
              <p>add to cart</p>
            )}
          </Button>
        </Wrapper>
      )}
    </>
  );
}

AddtoCartButton.propTypes = {
  id: PropTypes.string,
};
export default AddtoCartButton;
