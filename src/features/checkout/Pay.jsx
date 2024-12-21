import { forwardRef, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useCreatePaymentIntent } from "../../services/payment/useCreatePaymentIntent";
import { useDeliveryContext } from "../../providers/delivery/useDeliveryContext";
import { useCart } from "../../services/cart/useCart";
import { useUser } from "../../services/user/useUser";
import { formatCurrency } from "../../utils/helpers";
import { useModal } from "../../hooks/useModal";

import processing from "../../assets/icons/processing.svg";
import ErrorMessage from "../../ui/components/ErrorMessage";
import Skeleton from "../../ui/components/Skeleton";
import Spinner from "../../ui/components/Spinner";
import Button from "../../ui/components/Button";
import Modal from "../../ui/components/Modal";

const StyledPay = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media only screen and (min-width: 500px) {
    flex-direction: row;
    gap: 0;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1rem 0 2rem;

  & > p {
    font-weight: 600;
    font-size: 1.6rem;
  }

  @media only screen and (min-width: 500px) {
    width: 60%;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 1rem 0 2rem;

  @media only screen and (min-width: 500px) {
    width: 40%;
  }
`;

const SkeletonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 2rem;
`;

const ProcessingOrderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: var(--backdrop);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProcessingOrder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.1rem;
`;

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function Pay() {
  const { mutate: createPaymentIntent, isPending: isCreatingIntent } =
    useCreatePaymentIntent();
  const { user } = useUser();

  const [clientSecret, setClientSecret] = useState("");
  const { deliveryMode } = useDeliveryContext();
  const { cart, isLoading, error } = useCart();
  const openPaymentModal = useRef(null);
  const paymentRef = useRef(null);

  async function handleCheckout() {
    if (!user?.data) return;

    if (!user?.data?.user?.shippingAddress) {
      toast.error("No shipping address");
      return;
    }

    // create intent
    createPaymentIntent(
      { amount: cart?.data?.cart?.totalPrice, deliveryMode },
      {
        onSuccess: (data) => {
          // setClientSecret
          setClientSecret(data?.data?.client_secret);

          // open modal
          setTimeout(() => {
            openPaymentModal.current.click();
          }, 100);
        },

        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  }

  return isLoading ? (
    <SkeletonWrapper>
      <Skeleton width={150} height={15} />
      <Skeleton width={150} height={15} />
    </SkeletonWrapper>
  ) : error ? (
    <ErrorMessage message={error.message} />
  ) : (
    <Modal>
      <StyledPay>
        <TotalPrice>
          <p>Total Price</p>
          <p>{formatCurrency(cart?.data?.cart?.finalPrice)}</p>
        </TotalPrice>

        <ButtonWrapper>
          <Button
            full={true}
            disabled={!user.data || isCreatingIntent}
            onClick={handleCheckout}
          >
            {isCreatingIntent ? (
              <Spinner />
            ) : (
              <p>
                Pay <span>{formatCurrency(cart?.data?.cart?.finalPrice)}</span>
              </p>
            )}
          </Button>
        </ButtonWrapper>
      </StyledPay>

      <Modal.Open modalName="payment">
        <button ref={openPaymentModal} hidden></button>
      </Modal.Open>

      <Modal.Window modalName="payment" cb={() => paymentRef.current.click()}>
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentWindow ref={paymentRef} />
          </Elements>
        )}
      </Modal.Window>
    </Modal>
  );
}

const PaymentWindow = forwardRef((_, ref) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();

  async function handlePayment(e) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsConfirming(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(`${error.message}`);
      setIsConfirming(false);
    } else {
      closeModal();
      navigate("/payment/status", { state: paymentIntent.id });
      setIsConfirming(false);
    }
  }

  return (
    <form onSubmit={handlePayment}>
      <PaymentElement />
      {isConfirming && (
        <ProcessingOrderWrapper>
          <ProcessingOrder>
            <img src={processing} alt="processing-order" />
            <p>Processing your order...</p>
            <p>Do not refresh page</p>
          </ProcessingOrder>
        </ProcessingOrderWrapper>
      )}
      <button ref={ref} hidden disabled={isConfirming}></button>
    </form>
  );
});

PaymentWindow.displayName = "PaymentWindow";

export default Pay;
