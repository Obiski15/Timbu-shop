import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { useEffect } from "react";

import { useRetrievePaymentIntent } from "../services/payment/useRetrievePaymentIntent";

import ErrorMessage from "../ui/components/ErrorMessage";
import Spinner from "../ui/components/Spinner";
import Button from "../ui/components/Button";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Status = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 3rem;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const Icon = styled.div`
  font-size: 8rem;
  color: ${(props) =>
    props.status === "failed"
      ? "var(--destructive)"
      : props.status === "succeeded"
      ? "var(--secondary-color)"
      : ""};
  line-height: 6rem;
`;

const Heading = styled.h1`
  font-size: 2.4rem;
  margin: 1rem 0;
  color: #333;
`;

const Des = styled.p`
  color: #666;
  margin: 1rem 0 2rem;
`;

function CheckoutPaymentStatus() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, error } = useRetrievePaymentIntent(location.state);

  useEffect(() => {
    if (!location.state) navigate("/");
  }, [navigate, location]);

  if (!location.state) return;
  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <Status>
          {error ? (
            <ErrorMessage message={error.message} />
          ) : (
            <>
              <Icon status={data?.data?.intent?.status}>
                {data?.data?.intent?.status === "succeeded"
                  ? "✔"
                  : data?.data?.intent?.status === "failed"
                  ? "✖"
                  : data?.data?.intent?.status === "processing"
                  ? "⏳"
                  : ""}
              </Icon>
              <Heading>
                {data?.data?.intent?.status === "succeeded"
                  ? "Order Placed!"
                  : data?.data?.intent?.status === "failed"
                  ? "Payment Failed"
                  : data?.data?.intent?.status === "processing"
                  ? "Processing Payment"
                  : ""}
              </Heading>
              <Des>
                {data?.data?.intent?.status === "succeeded"
                  ? "Your order is processing. Thank you for your purchase!"
                  : data?.data?.intent?.status === "failed"
                  ? "Unfortunately, your payment could not be processed. Please try again"
                  : data?.data?.intent?.status === "processing"
                  ? "Your payment is being processed. Please wait a moment..."
                  : ""}
              </Des>
              <Button
                onClick={() => {
                  queryClient.invalidateQueries({ queryKey: ["cart"] });
                  navigate("/profile/orders");
                }}
                variant={
                  data?.data?.intent?.status === "succeeded"
                    ? "var(--secondary-color)"
                    : data?.data?.intent?.status === "failed"
                    ? "destructive"
                    : data?.data?.intent?.status === "processing"
                    ? "Processing Payment"
                    : ""
                }
              >
                view order
              </Button>
            </>
          )}
        </Status>
      )}
    </Wrapper>
  );
}

export default CheckoutPaymentStatus;
