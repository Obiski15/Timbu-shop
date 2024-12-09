import { FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useRef } from "react";

import { useDeleteFromWishlist } from "../../services/wishlist/useDeleteFromWishlist";
import { useAddToWishlist } from "../../services/wishlist/useAddToWishlist";
import { useWishlist } from "../../services/wishlist/useWishlist";
import { useUser } from "../../services/user/useUser";

import AlertDialog from "./AlertDialog";
import Icon from "./Icon";

function WishlistControl({ id }) {
  const { isDeletingFromWishlist, deleteFromWishlist } =
    useDeleteFromWishlist();

  const { addToWishlist, isAddingToWishlist } = useAddToWishlist();

  const { wishlist, isLoadingWishlist } = useWishlist();

  const { user, isLoadingUser } = useUser();

  const alertDialog = useRef(null);

  const isItemInWishlist =
    wishlist?.data?.wishlist?.items?.findIndex((item) => item?._id === id) > -1;

  return (
    <AlertDialog>
      <AlertDialog.Open modalName="sign-in-alert">
        <button ref={alertDialog} hidden></button>
      </AlertDialog.Open>

      <Icon
        Svg={FaRegHeart}
        disabled={
          isAddingToWishlist || isDeletingFromWishlist || isLoadingWishlist
        }
        onClick={(e) => {
          e.stopPropagation();
          if (!navigator.onLine) return toast.error("No Internet Access");
          if (isLoadingUser) return;

          if (!user?.data) {
            return alertDialog.current.click();
          }

          if (isItemInWishlist) return deleteFromWishlist(id);

          addToWishlist(id);
        }}
        bgColor={isItemInWishlist ? "hsla(28, 100%, 51%, 0.6)" : ""}
        fill="var(--secondary-color)"
      />

      <AlertDialog.Window
        modalName="sign-in-alert"
        buttonText="Sign in"
        cb={() => console.log("sign in clicked")}
      >
        <p>kindly sign in to add item to wishlist</p>
      </AlertDialog.Window>
    </AlertDialog>
  );
}

WishlistControl.propTypes = {
  id: PropTypes.string.isRequired,
};

export default WishlistControl;
