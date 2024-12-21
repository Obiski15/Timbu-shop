import { GoPencil } from "react-icons/go";
import styled from "styled-components";
import { useRef } from "react";

import { useUser } from "../../services/user/useUser";
import { formatShortDate } from "../../utils/helpers";

import DummyDeliveryDetails from "../../ui/layouts/dummy/DummyDeliveryDetails";
import ErrorMessage from "../../ui/components/ErrorMessage";
import EditDeliveryAddress from "./EditDeliveryAddress";
import EditDeliveryMode from "./EditDeliveryMode";
import Modal from "../../ui/components/Modal";

const StyledDeliveryDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.2rem;

  @media only screen and (min-width: 992px) {
    position: sticky;
    top: 1rem;
  }
`;

const DeliveryDetailsHeader = styled.p`
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.6rem;
  font-weight: 600;
  border-bottom: 1px solid var(--border);
`;

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3.5rex;
  margin-top: 1px solid var(--border);
  padding: 0 2rem;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  border-bottom: 1px solid var(--border);
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  line-height: 3rem;
  font-size: 1.6rem;
`;

const TitleTxt = styled.p``;

const Edit = styled.button`
  padding: 1rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: relative;
  cursor: pointer;

  & > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
  }

  &:hover {
    background-color: hsla(28, 100%, 51%, 0.6);
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const Header = styled.div`
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
`;

const Des = styled.div`
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 300;
  line-height: 30px;
  color: #6d6d6d;
`;

const AddDeliveryAddress = styled.button`
  width: 100%;
  height: 7rem;
  border: 2px dashed var(--border);
  margin-bottom: 1rem;
  font-size: 2rem;
  letter-spacing: 0.2rem;
  font-weight: 500;

  &:hover {
    border: 2px dashed var(--secondary-color);
    background-color: var(--input-background);
    color: var(--secondary-color);
  }

  & > p {
    font-weight: normal;
  }
`;

function DeliveryDetails() {
  const { user, isLoadingUser, userError } = useUser();
  const editDeliveryAddressRef = useRef(null);
  const editDeliveryModeRef = useRef(null);

  return (
    <Modal>
      <StyledDeliveryDetails>
        <DeliveryDetailsHeader>Delivery Details</DeliveryDetailsHeader>

        {isLoadingUser ? (
          <DummyDeliveryDetails />
        ) : userError ? (
          <ErrorMessage message={userError.message} />
        ) : (
          <MainWrapper>
            <Wrapper>
              <Title>
                <TitleTxt>Delivery Address</TitleTxt>
                <Modal.Open modalName="edit-address">
                  <Edit disabled={!user?.data?.user?.shippingAddress}>
                    {user?.data?.user?.shippingAddress && (
                      <GoPencil fill="var(--secondary-color)" />
                    )}
                  </Edit>
                </Modal.Open>
                <Modal.Window
                  modalName="edit-address"
                  cb={() => {
                    editDeliveryAddressRef.current.click();
                  }}
                >
                  <EditDeliveryAddress ref={editDeliveryAddressRef} />
                </Modal.Window>
              </Title>

              <Content>
                {!user?.data?.user?.shippingAddress ? (
                  <Modal.Open modalName="edit-address">
                    <AddDeliveryAddress>
                      <p>+add</p>
                    </AddDeliveryAddress>
                  </Modal.Open>
                ) : (
                  <>
                    <Header>{`${user?.data?.user?.shippingAddress?.region}, ${user?.data?.user?.shippingAddress?.country}`}</Header>
                    <Des>{`${user?.data?.user?.shippingAddress?.address}, ${user?.data?.user?.shippingAddress?.postalCode}, ${user?.data?.user?.shippingAddress?.city}`}</Des>
                  </>
                )}
              </Content>
            </Wrapper>

            <Wrapper>
              <Title>
                <TitleTxt>Delivery Mode</TitleTxt>
                <Modal.Open modalName="edit-delivery-mode">
                  <Edit>
                    <GoPencil fill="var(--secondary-color)" />
                  </Edit>
                </Modal.Open>
                <Modal.Window
                  modalName="edit-delivery-mode"
                  cb={() => {
                    editDeliveryModeRef.current.click();
                  }}
                >
                  <EditDeliveryMode ref={editDeliveryModeRef} />
                </Modal.Window>
              </Title>

              <Content>
                <Header>Door Delivery</Header>
                <Des>
                  Delivery Between {formatShortDate(new Date())} and{" "}
                  {formatShortDate(
                    new Date(new Date().getTime() + 24 * 3 * 60 * 60 * 1000)
                  )}
                </Des>
              </Content>
            </Wrapper>
          </MainWrapper>
        )}
      </StyledDeliveryDetails>
    </Modal>
  );
}

export default DeliveryDetails;
