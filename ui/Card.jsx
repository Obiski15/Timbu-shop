import styled from "styled-components";
import { useState } from "react";

import atm from "../src/assets/icons/atm.svg";
import off from "../src/assets/icons/switch-off.svg";
import on from "../src/assets/icons/switch-on.svg";

import Button from "./Button";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.2rem;
  justify-content: space-between;

  @media only screen and (min-width: 1201px) {
    & div {
      padding: 0;
    }
  }
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  line-height: 10px;
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
`;

const Input = styled.input`
  flex: 1;
`;

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.2rem;
  justify-content: space-between;
`;

const CardNumber = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;
  justify-content: space-between;
  padding: 10px 20px 10px 20px;
  border-bottom: 2px solid #e2e1e1;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const ValidTill = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 0px 20px 0px 20px;
  border-bottom: 2px solid #e2e1e1;
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
  padding: 10px 20px 10px 20px;

  & p {
    flex: 1;
    font-size: 1.2rem;
    font-weight: 400;
  }
`;

const Pay = styled.div`
  width: 100%;
  padding: 10px 20px 10px 20px;
`;

function Card() {
  const [rememberCard, setRememberCard] = useState(false);

  return (
    <Form>
      <CardWrapper>
        <CardNumber>
          <Label htmlFor="card-num">Card Number</Label>

          <InputWrapper>
            <Img src={atm} alt="card-icon" />
            <Input
              id="card-num"
              type="text"
              defaultValue="0000-0000-0000-0000-0000"
            />
          </InputWrapper>
        </CardNumber>

        <ValidTill>
          <DateWrapper>
            <Label htmlFor="date">Valid Date</Label>
            <InputWrapper>
              <Img src={atm} alt="card-icon" />
              <Input type="date" id="date" />
            </InputWrapper>
          </DateWrapper>

          <CvvWrapper>
            <Label htmlFor="cvv">CVV</Label>
            <InputWrapper>
              <Img src={atm} alt="card-icon" />
              <Input type="text" minLength={3} maxLength={3} id="cvv" />
            </InputWrapper>
          </CvvWrapper>
        </ValidTill>
      </CardWrapper>

      <Remind>
        <p>Remember this card next time</p>
        <Img
          src={rememberCard ? on : off}
          alt="remember-card-icon"
          onClick={() => {
            setRememberCard((remember) => !remember);
          }}
        />
      </Remind>

      <Pay>
        <Button
          full={true}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Pay <span>$112</span>
        </Button>
      </Pay>
    </Form>
  );
}

export default Card;
