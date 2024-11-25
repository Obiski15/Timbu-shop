import { useState } from "react";
import { useCart } from "../../services/cart/useCart";
import PropTypes from "prop-types";
import styled from "styled-components";
import WishlistControl from "../../ui/components/WishlistControl";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/components/Spinner";
import ItemQuantityControl from "../../ui/components/ItemQuantityControl";
import Button from "../../ui/components/Button";
import { useAddToCart } from "../../services/cart/useAddToCart";
import { useParams } from "react-router-dom";
import Ratings from "../../ui/components/Ratings";

function Hero({ item, calculateTotalRating, calculateAverageRating }) {
  const [activeImage, setActiveImage] = useState(0);
  const { cart = {}, isLoading: isLoadingCart } = useCart();
  const { addToCart } = useAddToCart();
  const param = useParams();

  const { _id: id, price, photo: image, name, images: photos, stock } = item;

  function handleImageChange(image) {
    setActiveImage(image);
  }

  return (
    <TopWrapper>
      <ImageWrapper>
        <div>
          <Img src={activeImage} alt="large-img" loading="lazy" />
          <MiniImages>
            <Img
              loading="lazy"
              src={image}
              alt="large-img"
              onClick={() => {
                handleImageChange(image);
              }}
              style={{
                border: activeImage === image ? " 1px solid #222222" : "",
              }}
            />
            {photos?.map((photo, index) => (
              <Img
                loading="lazy"
                key={index}
                src={photo}
                alt={photo}
                onClick={() => {
                  handleImageChange(photo);
                }}
                style={{
                  border: activeImage === photo ? " 1px solid #222222" : "",
                }}
              />
            ))}
          </MiniImages>
        </div>
      </ImageWrapper>

      <TopRight>
        <TopRightUpper>
          <TopRightNameWrapper>
            <OfficialStore>Official Store</OfficialStore>
            <ItemName>{name}</ItemName>
          </TopRightNameWrapper>
          <div>
            <WishlistControl id={param.id} />
          </div>
        </TopRightUpper>

        <TopRightLower>
          <ItemPrice>{formatCurrency(price)}</ItemPrice>
          <div>
            {stock === 0 ? (
              <Stock color="var(--destructive)">Out of stock</Stock>
            ) : stock >= 100 ? (
              <Stock color="#75757a">In stock</Stock>
            ) : (
              <Stock color="#af7d15">Few Units Left</Stock>
            )}
          </div>
          <TopRightRatings>
            <Ratings avg={(calculateAverageRating() * 100) / 5} />
            <span>
              <a href="#reviews-section" style={{ fontSize: "1.2rem" }}>
                {`(${calculateTotalRating()} verified ratings)`}
              </a>
            </span>
          </TopRightRatings>

          {isLoadingCart ? (
            <Spinner />
          ) : cart?.data?.cart?.items?.find(
              (item) => item?.product?._id === id
            ) ? (
            <ItemQuantityControlWrapper>
              <ItemQuantityControl id={id} />
              <p>
                {`${
                  cart?.data?.cart?.items?.find(
                    (item) => item?.product?._id === id
                  ).quantity
                } items(s) added`}
              </p>
            </ItemQuantityControlWrapper>
          ) : (
            <Button
              full={true}
              onClick={() => {
                addToCart();
              }}
            >
              Add To Cart
            </Button>
          )}
        </TopRightLower>
      </TopRight>
    </TopWrapper>
  );
}

Hero.propTypes = {
  item: PropTypes.object,
  calculateTotalRating: PropTypes.func,
  calculateAverageRating: PropTypes.func,
  setItem: PropTypes.func,
};

export default Hero;
