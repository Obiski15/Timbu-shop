import { FaRegHeart } from "react-icons/fa";
import PropTypes from "prop-types";

import { useDeleteFromWishlist } from "../../services/wishlist/useDeleteFromWishlist";
import { useAddToWishlist } from "../../services/wishlist/useAddToWishlist";
import { useWishlist } from "../../services/wishlist/useWishlist";
import { useUser } from "../../services/user/useUser";

import Icon from "./Icon";

function WishlistControl({ id }) {
  const { isDeletingFromWishlist, deleteFromWishlist } =
    useDeleteFromWishlist();

  const { addToWishlist, isAddingToWishlist } = useAddToWishlist();

  const { wishlist, isLoadingWishlist } = useWishlist();

  const { isLoadingUser } = useUser();

  const isItemInWishlist =
    wishlist?.data?.wishlist?.items?.findIndex((item) => item?._id === id) > -1;

  return (
    <Icon
      Svg={FaRegHeart}
      disabled={
        isAddingToWishlist || isDeletingFromWishlist || isLoadingWishlist
      }
      onClick={() => {
        if (isLoadingUser) return;

        if (isItemInWishlist) return deleteFromWishlist(id);

        addToWishlist(id);
      }}
      bgColor={isItemInWishlist ? "hsla(28, 100%, 51%, 0.6)" : ""}
      fill="var(--secondary-color)"
    />
  );
}

WishlistControl.propTypes = {
  id: PropTypes.string.isRequired,
};

export default WishlistControl;
