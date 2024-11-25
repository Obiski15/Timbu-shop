import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useState } from "react";

import { useCart } from "../../services/cart/useCart";
import { formatCurrency } from "../../utils/helpers";

import ErrorMessage from "../../ui/components/ErrorMessage";
import DummyCard from "../../ui/layouts/dummy/DummyCard";
import Button from "../../ui/components/Button";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;

  & svg {
    width: 24px;
    height: 24px;
  }
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  line-height: 10px;
`;

const Input = styled.input`
  flex: 1;
`;

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3.2rem;
`;

const CardNumber = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;
  padding: 1rem 2rem;

  border-bottom: 1px solid var(--border);
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const DateCvvWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 0 2rem;
  border-bottom: 1px solid var(--border);
`;

const DateWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 30px;
`;

const CvvWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 30px;
`;

const Remind = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 1rem 2rem;

  & > p {
    flex: 1;
    font-size: 1.2rem;
    font-weight: 400;
  }
`;

const Error = styled.p`
  font-size: 12px;
  color: var(--destructive);
`;

const Pay = styled.div`
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

const date = new Date();

function Card() {
  const [rememberCard, setRememberCard] = useState(false);
  const { cart, isLoading, error } = useCart();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      expiryDate: `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(
        2,
        0
      )}-${date.getDate().toString().padStart(2, 0)}`,
    },
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? (
        <DummyCard />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <>
          <CardWrapper>
            <CardNumber>
              <Label htmlFor="card-num">Card Number</Label>
              <InputWrapper>
                <CiCreditCard1 fill="var(--secondary-color)" />
                <Input
                  id="card-num"
                  type="text"
                  placeholder="0000-0000-0000-0000-0000"
                  {...register("cardNum", {
                    required: "Kindly provide a valid card number",
                  })}
                />
                {errors?.cardNum?.message && (
                  <Error>{errors?.cardNum?.message}</Error>
                )}
              </InputWrapper>
            </CardNumber>

            <DateCvvWrapper>
              <DateWrapper>
                <Label htmlFor="date">Valid Date</Label>
                <InputWrapper>
                  <CiCreditCard1 fill="var(--secondary-color)" />
                  <Input
                    type="date"
                    id="date"
                    {...register("expiryDate", {
                      required: "Date field is required",
                    })}
                  />
                  {errors?.expiryDate?.message && (
                    <Error>{errors?.expiryDate?.message}</Error>
                  )}
                </InputWrapper>
              </DateWrapper>

              <CvvWrapper>
                <Label htmlFor="cvv">CVV</Label>
                <InputWrapper>
                  <CiCreditCard1 fill="var(--secondary-color)" />
                  <Input
                    type="number"
                    id="cvv"
                    minLength={3}
                    maxLength={3}
                    {...register("cvv", {
                      required: "cvv is required",
                      maxLength: {
                        value: 3,
                        message: "minimum length is 3",
                      },
                      minLength: {
                        value: 3,
                        message: "maximum length is 3",
                      },
                    })}
                  />
                  {errors?.cvv?.message && (
                    <Error>{errors?.cvv?.message}</Error>
                  )}
                </InputWrapper>
              </CvvWrapper>
            </DateCvvWrapper>
          </CardWrapper>
          <Remind>
            <p>Remember this card next time</p>
            <button
              onClick={() => {
                setRememberCard((remember) => !remember);
              }}
            >
              {rememberCard ? (
                <MdOutlineToggleOn fill="var(--secondary-color)" />
              ) : (
                <MdOutlineToggleOff />
              )}
            </button>
          </Remind>
          <Pay>
            <TotalPrice>
              <p>Total Price</p>
              <p>{formatCurrency(cart?.data?.cart?.finalPrice)}</p>
            </TotalPrice>

            <ButtonWrapper>
              <Button full={true}>
                Pay <span>{formatCurrency(cart?.data?.cart?.finalPrice)}</span>
              </Button>
            </ButtonWrapper>
          </Pay>
        </>
      )}
    </Form>
  );
}

export default Card;
