import { TbFileDescription } from "react-icons/tb";
import { RiFeedbackLine } from "react-icons/ri";
import { AiOutlineBars } from "react-icons/ai";
import styled from "styled-components";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

import { useAddToCart } from "../../services/cart/useAddToCart";
import { formatCurrency } from "../../utils/helpers";

import Spinner from "../../ui/components/Spinner";
import Button from "../../ui/components/Button";

const StyledBottomSideBar = styled.aside`
  display: none;

  @media only screen and (min-width: 768px) {
    column-span: 1;
    position: sticky;
    padding: 0;
    top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;

    & > div {
      width: 100%;
      background-color: white;
      border-radius: 0.8rem;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: start;
    }
  }
`;

const SideNav = styled.div`
  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1.6rem;
    padding: 1.2rem 1.6rem;
    cursor: default;
    transition: all 0.2s;

    &:not(:last-child) {
      border-bottom: 1px solid var(--border);
    }

    &:hover {
      background-color: #f1f1f2;
    }

    & > svg {
      width: 24px;
      height: 24px;
    }

    & > p {
      flex: 1;
    }
  }
`;

const MiniProductOverView = styled.div`
  padding: 1.2rem 1.6rem;
  gap: 1rem;
`;

const ItemDetailsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;

  & > div {
    &:first-child {
      width: 100px;
      height: 100px;
      flex-grow: 0;
    }
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.8rem;
`;

const ItemName = styled.p`
  font-weight: normal;
  padding-bottom: 0.4rem;
  padding-top: 0.8rem;
  letter-spacing: 0.1rem;
`;

const ItemPrice = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
`;

const SpinnerWrapper = styled.div`
  padding: 1rem 0;
  width: 100%;
`;

function BottomSideBar({ image, name, price, id, activeSection }) {
  const { addToCart, isAddingToCart } = useAddToCart();

  function handleScrollIntoView(viewId) {
    document.getElementById(viewId).scrollIntoView({ behavior: "smooth" });
  }

  return (
    <StyledBottomSideBar>
      <SideNav>
        {[
          { value: "description", Icon: TbFileDescription },
          { value: "specifications", Icon: AiOutlineBars },
          { value: "reviews", Icon: RiFeedbackLine },
        ].map((tab, i) => (
          <div
            style={{
              backgroundColor:
                activeSection === `${tab.value}-section` ? "var(--border)" : "",
            }}
            key={i + 1}
            onClick={() => {
              handleScrollIntoView(`${tab.value}-section`);
            }}
          >
            <tab.Icon />
            <p>{tab.value}</p>
          </div>
        ))}
      </SideNav>

      <MiniProductOverView>
        <ItemDetailsWrapper>
          <div>
            <Img src={image} alt="product-image" />
          </div>
          <div>
            <ItemName>{name}</ItemName>
            <ItemPrice>{formatCurrency(price)}</ItemPrice>
          </div>
        </ItemDetailsWrapper>
        <Button full={true}>Buy Now</Button>
        {isAddingToCart ? (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        ) : (
          <Button
            full={true}
            onClick={() => {
              if (!navigator.onLine) return toast.error("No Internet Access");
              addToCart(id);
            }}
          >
            Add to Cart
          </Button>
        )}
      </MiniProductOverView>
    </StyledBottomSideBar>
  );
}

BottomSideBar.propTypes = {
  activeSection: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default BottomSideBar;
