import PropTypes from "prop-types";

import { useAddToCart } from "../../services/cart/useAddToCart";
import { useCart } from "../../services/cart/useCart";

import ItemQuantityControl from "./ItemQuantityControl";
import Button from "./Button";

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
        <Button
          full={true}
          disabled={isAddingToCart}
          type="small"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(id);
          }}
        >
          Add To Cart
        </Button>
      )}
    </>
  );
}

AddtoCartButton.propTypes = {
  id: PropTypes.string,
};
export default AddtoCartButton;
