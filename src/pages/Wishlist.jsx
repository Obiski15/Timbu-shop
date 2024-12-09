import styled from "styled-components";

import { useWishlist } from "../services/wishlist/useWishlist";
import { formatCurrency } from "../utils/helpers";

import DummyWishlist from "../ui/layouts/dummy/DummyWishlist";
import BottomNav from "../ui/components/BottomNav";
import Footer from "../ui/components/Footer";
import Button from "../ui/components/Button";
import Header from "../ui/components/Header";

import { useDeleteFromWishlist } from "../services/wishlist/useDeleteFromWishlist";
import { useAddToCart } from "../services/cart/useAddToCart";

import UserSignInPrompt from "../features/profile/UserSignInPrompt";
import EmptyWishlist from "../features/wishlist/EmptyWishlist";
import ErrorMessage from "../ui/components/ErrorMessage";

const StyledWishlist = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  flex: 1;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const WishlistItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
`;

const DetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem 2rem;
  gap: 1rem;
`;

const Image = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 0.4rem;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const Name = styled.p`
  font-weight: 500;
`;

const Remove = styled.button`
  color: var(--secondary-color);
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  width: 100%;
`;

function Wishlist() {
  const { deleteFromWishlist, isDeletingFromWishlist } =
    useDeleteFromWishlist();
  const { wishlist, isLoadingWishlist, error: wishlistError } = useWishlist();
  const { addToCart } = useAddToCart();

  return (
    <StyledWishlist>
      <Header>Wishlist</Header>
      <Main>
        {isLoadingWishlist ? (
          <DummyWishlist />
        ) : !wishlist?.data ? (
          <UserSignInPrompt />
        ) : !wishlist?.data?.wishlist?.items?.length ? (
          <EmptyWishlist />
        ) : wishlistError ? (
          <ErrorMessage message={wishlistError.message} />
        ) : (
          wishlist?.data?.wishlist?.items?.map((item, i) => (
            <WishlistItem key={i + 1}>
              <DetailsWrapper>
                <Image>
                  <img src={item.photo} alt="item-name" />
                </Image>

                <Details>
                  <Name>{item?.name}</Name>
                  <p>{formatCurrency(item?.price)}</p>
                </Details>
              </DetailsWrapper>

              <Buttons>
                <Remove
                  onClick={() => {
                    deleteFromWishlist(item?._id);
                  }}
                  disabled={isDeletingFromWishlist}
                >
                  Remove
                </Remove>
                <Button
                  type="small"
                  onClick={() => {
                    addToCart(item?._id);
                  }}
                >
                  Buy Now
                </Button>
              </Buttons>
            </WishlistItem>
          ))
        )}
      </Main>
      <BottomNav />
      <Footer />
    </StyledWishlist>
  );
}

export default Wishlist;
