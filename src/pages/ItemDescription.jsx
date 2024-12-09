import { IoCallOutline, IoShareSocialSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FcFlashAuto } from "react-icons/fc";
import styled from "styled-components";
import toast from "react-hot-toast";

import { updateRecentlyViewedItems } from "../services/offline/recentlyviewed";
import { useReview } from "../services/review/useReview";
import { useItem } from "../services/item/useItem";
import { useCart } from "../services/cart/useCart";
import { formatCurrency } from "../utils/helpers";

import HorizontalItemsContainer from "../features/items/HorizontalItemsContainer";
import ItemQuantityControl from "../ui/components/ItemQuantityControl";
import Specifications from "../features/description/Specifications";
import ProductDetails from "../features/description/ProductDetails";
import BottomSideBar from "../features/description/BottomSideBar";
import DescriptionLayout from "../ui/layouts/DescriptionLayout";
import WishlistControl from "../ui/components/WishlistControl";
import AddtoCartButton from "../ui/components/AddtoCartButton";
import FullPageSpinner from "../ui/components/FullPageSpinner";
import TopSideBar from "../features/description/TopSideBar";
import FullPageError from "../ui/components/FullPageError";
import SavedItems from "../features/items/SavedItems";
import Review from "../features/description/Review";
import Skeleton from "../ui/components/Skeleton";
import Ratings from "../ui/components/Ratings";
import Spinner from "../ui/components/Spinner";

const TopWrapper = styled.div`
  grid-column: 1 / -1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;

  @media only screen and (min-width: 768px) {
    grid-column: span 3;
    background-color: white;
    padding: 1rem;
    justify-content: start;
    padding: 1.5rem 1rem;
    border-radius: 0.8rem;
  }
`;

const ImageWrapper = styled.div`
  width: 353px;
  position: relative;

  @media only screen and (min-width: 768px) {
    position: relative;
    width: 45%;
    height: 100%;
  }
`;

const MainImage = styled.div`
  max-height: 500px;
  margin: 0 auto 0 auto;
  position: relative;

  @media only screen and (min-width: 768px) {
    padding-left: 15%;
  }
`;

const ImageTracker = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem;
  background-color: #313133;
  border-radius: 1rem;
  opacity: 0.5;
  font-weight: 500;
  text-align: center;
  color: white;
  width: fit-content;
`;

const TopRight = styled.div`
  display: none;

  @media only screen and (min-width: 768px) {
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 1rem;
    padding: 10px 0;
  }
`;

const TopRightUpper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;

  & > div {
    &:nth-child(2) {
      padding: 0.5rem;
    }
  }
`;

const TopRightLower = styled.div`
  width: 100%;
  padding-left: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;
`;

const TopRightPriceWrapper = styled.div`
  border: 1px solid var(--destructive);
  border-radius: 0.5rem;
  width: 100%;
`;

const FlashSale = styled.div`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 1rem;
  background-color: var(--destructive);
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;

  & svg {
    width: 24px;
    height: 24px;
  }
`;

const TopRightPrice = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const TopRightNameWrapper = styled.div`
  padding-left: 0.8rem;
  padding-right: 2.4rem;
`;

const OfficialStore = styled.p`
  background-color: #276076;
  border-radius: 0.4rem;
  padding: 0.4rem;
  color: white;
  font-size: 1.2rem;
  width: fit-content;
`;

const ItemName = styled.p`
  font-size: 2rem;
  font-weight: normal;
  padding-bottom: 0.4rem;
  padding-top: 0.8rem;
  letter-spacing: 0.1rem;
`;

const ItemPrice = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
`;

const DIscount = styled.span`
  text-decoration: line-through;
  font-style: italic;
  color: var(--border);
  font-size: 1.6rem;
`;

const Stock = styled.p`
  font-size: 1.2rem;
  color: ${(props) => props.color};
`;

const TopRightRatings = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.2rem;
`;

const MobileRatingsOverview = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.2rem;
  padding-right: 1rem;

  & > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;

    &:last-child {
      & > svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`;

const MiniImages = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
  overflow: scroll;
  max-height: 100%;

  & > img {
    width: 100px;
    height: 100px;
  }

  @media only screen and (min-width: 768px) {
    & > img {
      width: 100%;
      height: 100%;
    }

    position: absolute;
    width: 12%;
    left: 0;
    top: 0;
    flex-direction: column;
    align-items: center;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const MobileDescription = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.3rem;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.6rem 0 0.6rem 1.2rem;
`;

const Tab = styled.div`
  padding: 6px 4px;
  border-radius: 5rem;
  cursor: default;

  & > p {
    line-height: 1.6rem;
    text-align: center;
    font-weight: 500;
    padding: 0.4rem;
    text-transform: capitalize;
  }

  &.active-tab {
    background-color: var(--secondary-color);
    color: var(--background-color);
  }
`;

const ItemQuantityControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const CallAddToCart = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  position: sticky;
  bottom: 0;
  background-color: white;

  & > button {
    flex: 1;
  }

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const Call = styled.div`
  padding: 1rem;
  border: 1px solid var(--secondary-color);
  border-radius: 0.5rem;

  & svg {
    width: 24px;
    height: 24px;
  }
`;

const DesktopDescription = styled.div`
  display: none;

  @media only screen and (min-width: 768px) {
    grid-column: span 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    grid-gap: 1rem;

    & > div {
      width: 100%;
      background-color: white;
      border-radius: 1rem;
    }
  }
`;

const MobileItemOverview = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  padding-left: 2rem;
`;

function Description() {
  const [activeTab, setActiveTab] = useState("description-section");
  const [activeSection, setActiveSection] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [item, setItem] = useState({});
  const bottomSectionRef = useRef([]);
  const param = useParams();

  const { cart = {}, isLoading: isLoadingCart } = useCart();
  const { data: productReview = {}, isLoading: isLoadingReview } = useReview(
    param.id
  );
  const {
    data = {},
    error: itemError,
    isLoading: isLoadingItem,
    isFetched,
    isSuccess,
  } = useItem(param.id);

  useEffect(() => {
    if (data?.data?.item) {
      setItem(data?.data?.item);
    }
  }, [data]);

  function observerCallback(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.dataset.activeSection);
      }
    });
  }

  useEffect(() => {
    if (isLoadingItem) return;

    const current = bottomSectionRef.current;

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0,
      rootMargin: "-50%",
    });

    current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () =>
      current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
  }, [isLoadingItem]);

  useEffect(() => {
    if (isFetched && isSuccess && item?._id) {
      updateRecentlyViewedItems({
        name: item?.name,
        id: item?._id,
        price: item?._price,
        image: item?.photo,
      });
    }
  }, [isFetched, isSuccess, item]);

  function handleImageChange(index) {
    setActiveImage(index);
  }

  function calculateTotalRating() {
    return productReview?.data?.reviews?.length ?? 0;
  }

  function calculateAverageRating() {
    if (calculateTotalRating() === 0) return 0;
    return (
      productReview?.data?.reviews?.reduce(
        (acc, review) => review.rating + acc,
        0
      ) / productReview?.data?.reviews?.length
    ).toPrecision(2);
  }

  function calculateSingleRating(val) {
    return productReview?.data?.reviews?.filter(
      (review) => review?.rating === val
    ).length;
  }

  function handleTabChange(value) {
    setActiveTab(value);
  }

  if (isLoadingItem) return <FullPageSpinner />;

  if (itemError)
    return (
      <FullPageError message={itemError?.message}>{itemError}</FullPageError>
    );

  return (
    <DescriptionLayout>
      <TopWrapper>
        <ImageWrapper>
          <MainImage>
            <Img
              src={
                activeImage === 0 ? item?.photo : item?.images[activeImage - 1]
              }
              alt="large-img"
            />
            <ImageTracker>{`${activeImage + 1}/${
              item?.images?.length + 1
            }`}</ImageTracker>
          </MainImage>

          <MiniImages>
            <Img
              loading="lazy"
              src={item?.photo}
              alt="large-img"
              onMouseEnter={() => {
                handleImageChange(0);
              }}
              style={{
                border: activeImage === 0 ? " 1px solid #222222" : "",
              }}
            />
            {item?.images?.map((photo, i) => (
              <Img
                loading="lazy"
                key={i + 1}
                src={photo}
                alt={photo}
                onMouseEnter={() => {
                  handleImageChange(i + 1);
                }}
                style={{
                  border: activeImage === i + 1 ? " 1px solid #222222" : "",
                }}
              />
            ))}
          </MiniImages>
        </ImageWrapper>

        <TopRight>
          <TopRightUpper>
            <TopRightNameWrapper>
              <OfficialStore>Official Store</OfficialStore>
              <ItemName>{item?.name}</ItemName>
            </TopRightNameWrapper>
            <div>
              <WishlistControl id={param.id} />
            </div>
          </TopRightUpper>

          <TopRightLower>
            <TopRightPriceWrapper>
              <FlashSale>
                <FcFlashAuto />
                <p>Flash sale</p>
              </FlashSale>

              <TopRightPrice>
                <ItemPrice>
                  {formatCurrency(item?.price)}{" "}
                  <DIscount>{formatCurrency(item?.discount)}</DIscount>
                </ItemPrice>
                {item?.stock === 0 ? (
                  <Stock color="var(--destructive)">Out of stock</Stock>
                ) : item?.stock >= 100 ? (
                  <Stock color="#75757a">In stock</Stock>
                ) : (
                  <Stock color="#af7d15">Few Units Left</Stock>
                )}
              </TopRightPrice>
            </TopRightPriceWrapper>
            <TopRightRatings>
              {isLoadingReview ? (
                <Skeleton width={70} height={10} />
              ) : (
                <>
                  <Ratings avg={(calculateAverageRating() * 100) / 5} />

                  <span>
                    <a href="#reviews-section" style={{ fontSize: "1.2rem" }}>
                      {`(${calculateTotalRating()} verified ratings)`}
                    </a>
                  </span>
                </>
              )}
            </TopRightRatings>

            {isLoadingCart ? (
              <Spinner />
            ) : (
              <>
                {cart?.data?.cart?.items?.find(
                  (itm) => itm?.product?._id === item?._id
                ) ? (
                  <ItemQuantityControlWrapper>
                    <ItemQuantityControl id={item?._id} />
                    <p>
                      {`${
                        cart?.data?.cart?.items?.find(
                          (itm) => itm?.product?._id === item?._id
                        ).quantity
                      } items(s) added`}
                    </p>
                  </ItemQuantityControlWrapper>
                ) : (
                  <AddtoCartButton id={item?._id} />
                )}
              </>
            )}
          </TopRightLower>
        </TopRight>
      </TopWrapper>

      <TopSideBar />

      <DesktopDescription>
        <ProductDetails
          description={item?.description}
          ref={(ref) => (bottomSectionRef.current[0] = ref)}
        />

        <Specifications
          specifications={item?.specifications}
          ref={(ref) => (bottomSectionRef.current[1] = ref)}
        />

        <SavedItems />

        <Review
          productId={param.id}
          calculateTotalRating={calculateTotalRating}
          calculateAverageRating={calculateAverageRating}
          calculateSingleRating={calculateSingleRating}
          ref={(ref) => (bottomSectionRef.current[2] = ref)}
        />

        <HorizontalItemsContainer
          heading="you may also like"
          limit={6}
          categoryId={item?.categories?.join(",")}
        />
      </DesktopDescription>

      <BottomSideBar
        image={item?.photo}
        name={item?.name}
        price={item?.price}
        id={item?._id}
        activeSection={activeSection}
      />

      <MobileDescription>
        <MobileItemOverview>
          <ItemName>{name}</ItemName>

          <ItemPrice>{formatCurrency(item?.price)}</ItemPrice>
          <div>
            {item?.stock === 0 ? (
              <Stock color="hsl(0 100% 61%)">Out of stock</Stock>
            ) : item?.stock >= 100 ? (
              <Stock color="#75757a">In stock</Stock>
            ) : (
              <Stock color="#af7d15">Few Units Left</Stock>
            )}
          </div>

          <MobileRatingsOverview>
            <div>
              <Ratings avg={(calculateAverageRating() * 100) / 5} />
              <span>
                <a href="#reviews-section" style={{ fontSize: "1.2rem" }}>
                  {`(${calculateTotalRating()} verified ratings)`}
                </a>
              </span>
            </div>
            <div>
              <IoShareSocialSharp
                fill="var(--secondary-color)"
                onClick={async () => {
                  if (!navigator.canShare({ text: window.location.href })) {
                    return toast.error(
                      "Your browser doesn't support the Web Share API!"
                    );
                  }

                  try {
                    await navigator.share({
                      text: window.location.href,
                      title: data?.data?.item?.name,
                    });
                  } catch (err) {
                    toast.error(err.message);
                  }
                }}
              />
              <WishlistControl id={param.id} />
            </div>
          </MobileRatingsOverview>
        </MobileItemOverview>
        <Tabs>
          {["description", "specification", "reviews"].map((tab) => (
            <Tab
              key={tab}
              className={activeTab === `${tab}-section` ? "active-tab" : ""}
              onClick={() => {
                handleTabChange(`${tab}-section`);
              }}
            >
              <p>{tab}</p>
            </Tab>
          ))}
        </Tabs>

        <>
          {activeTab === "description-section" ? (
            <ProductDetails description={item?.description} />
          ) : activeTab === "specification-section" ? (
            <Specifications specifications={item?.specifications} />
          ) : activeTab === "reviews-section" ? (
            <Review
              productId={param.id}
              calculateTotalRating={calculateTotalRating}
              calculateAverageRating={calculateAverageRating}
              calculateSingleRating={calculateSingleRating}
            />
          ) : (
            ""
          )}
        </>

        <CallAddToCart>
          <Call>
            <IoCallOutline color="var(--secondary-color)" />
          </Call>
          <AddtoCartButton id={item?._id} />
        </CallAddToCart>

        <SavedItems />
        <HorizontalItemsContainer
          heading="you may also like"
          limit={6}
          categoryId={item?.categories?.join(",")}
        />
      </MobileDescription>
    </DescriptionLayout>
  );
}

export default Description;
