import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

import ItemQuantityControl from "../ui/ItemQuantityControl";
import { addToCart } from "../features/cart/cartSlice";
import { formatCurrency } from "../utils/helpers";
import { useItem } from "../services/useItem";

import DescriptionLayout from "../ui/DescriptionLayout";
import FullPageSpinner from "../ui/FullPageSpinner";
import FullPageError from "../ui/FullPageError";
import Header from "../ui/Header";
import Button from "../ui/Button";
import toast from "react-hot-toast";

const LargeImageWapper = styled.div`
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  height: 291px;
  width: 353px;
`;

const SmallImageWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 103px);
  grid-template-rows: 81px;
  justify-content: space-between;
  align-items: flex-start;
  grid-gap: 2rem;
  padding: 0 20px 0 20px;

  & img:hover {
    border: 1px solid var(--text-color);
    transform: scale(1.3);
    zoom: 130%;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.8rem;
`;

const DescriptionTab = styled.div`
  width: 100%;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  padding: 6px 20px 6px 20px;
`;

const Tab = styled.div`
  padding: 6px 4px 6px 4px;
  border-radius: 5rem;
  cursor: default;

  & > p {
    line-height: 1.6rem;
    text-align: center;
    font-weight: 500;
    padding: 0.4rem;
  }

  &.active-description-tab {
    background-color: var(--secondary-color);
    color: var(--background-color);
  }
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 10px 20px 10px 20px;
`;

const TabContenHeading = styled.h1`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.6rem;
  text-transform: capitalize;
`;

const TabContenBody = styled.h1`
  width: 100%;
  font-size: 1.3rem;
  font-weight: 300;
  line-height: 1.6rem;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px 8px 20px;
`;

const Label = styled.div`
  flex: 1;
  text-align: left;
  font-weight: 600;
`;

const Price = styled.div`
  flex: 1;
  text-align: right;
  font-weight: 500;
  font-size: 2rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 20px 0 20px;
`;

function Description() {
  const [activeTab, setActiveTab] = useState("description");
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const param = useParams();

  // variables
  const { data = {}, error, isLoading } = useItem(param.id);
  const { id, current_price, photos, description, name } = data;
  const image = `https://api.timbu.cloud/images/${photos?.[0]?.url}`;
  const discount = 400;

  useEffect(() => {
    toast.error("width is fixed for now, designer doesn't have electricity", {
      duration: 10000,
    });
  }, []);

  if (isLoading) return <FullPageSpinner />;

  if (error)
    return <FullPageError message={error.message}>{error}</FullPageError>;

  function handleTabChange(value) {
    setActiveTab(value);
  }

  return (
    <DescriptionLayout>
      <Header>Description</Header>
      <LargeImageWapper>
        <Img src={image} alt="large-img" />
      </LargeImageWapper>
      <DescriptionTab>
        <Tabs>
          <Tab
            className={
              activeTab === "description" ? "active-description-tab" : ""
            }
            onClick={() => {
              handleTabChange("description");
            }}
          >
            <p>Description</p>
          </Tab>
          <Tab
            className={
              activeTab === "specification" ? "active-description-tab" : ""
            }
            onClick={() => {
              handleTabChange("specification");
            }}
          >
            <p>Specification</p>
          </Tab>
          <Tab
            className={activeTab === "reviews" ? "active-description-tab" : ""}
            onClick={() => {
              handleTabChange("reviews");
            }}
          >
            <p>Reviews</p>
          </Tab>
        </Tabs>

        <TabContent>
          {activeTab === "description" ? (
            <>
              <TabContenHeading>{name}</TabContenHeading>
              <TabContenBody>{description}</TabContenBody>
            </>
          ) : activeTab === "specification" ? (
            <>
              <TabContenHeading>Product Specification</TabContenHeading>
              <TabContenBody>Specification Page</TabContenBody>
            </>
          ) : (
            <>
              <TabContenHeading>Customer&apos;s Review</TabContenHeading>
              <TabContenBody>Review Page</TabContenBody>
            </>
          )}
        </TabContent>
      </DescriptionTab>

      <SmallImageWrapper>
        {photos.slice(1, 4).map((photo, i) => (
          <Img
            src={`https://api.timbu.cloud/images/${photo.url}`}
            alt="large-img"
            key={i + 1}
          />
        ))}
      </SmallImageWrapper>

      <Row>
        <Label>Price</Label>
        <Price>{formatCurrency(current_price)}</Price>
      </Row>

      <ButtonWrapper>
        {cart.find((product) => product.id === id) ? (
          <ItemQuantityControl id={id} />
        ) : (
          <Button
            full={true}
            onClick={() =>
              dispatch(
                addToCart({
                  id,
                  name,
                  price: current_price,
                  discount,
                  totalPrice: current_price - discount,
                  quantity: 1,
                  image,
                })
              )
            }
          >
            Add To Cart
          </Button>
        )}
      </ButtonWrapper>
    </DescriptionLayout>
  );
}

export default Description;
