import { GoPencil } from "react-icons/go";
import styled from "styled-components";
import { useRef } from "react";

import { useUser } from "../services/user/useUser";

import ProfilePagesLayout from "../ui/layouts/ProfilePagesLayout";
import EditUserAddress from "../features/profile/EditUserAddress";
import DummyAccount from "../ui/layouts/dummy/DummyAccount";
import ErrorMessage from "../ui/components/ErrorMessage";
import Modal from "../ui/components/Modal";
import Icon from "../ui/components/Icon";
import UserSignInPrompt from "../features/profile/userSignInPrompt";

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 1rem;
`;

const Heading = styled.h1`
  padding: 1rem 0 2rem 0;
  font-size: 2.2rem;
  text-transform: capitalize;
  font-weight: 600;
`;

const Section = styled.div`
  border: 1px solid var(--border);
  grid-column: 1 / -1;

  @media only screen and (min-width: 768px) {
    grid-column: span 1;
  }
`;

const Description = styled.h4`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: normal;
  max-height: 50px;
  height: 100%;
  border: 1px solid var(--border);
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 2rem;
`;

const TableBodyHeading = styled.h3`
  text-transform: capitalize;
  font-size: 1.5rem;
  font-weight: normal;
  padding-top: 1rem;
`;

const TableBodyContent = styled.div`
  color: #75757a;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.2rem;
  text-transform: capitalize;
  font-size: 1.4rem;
`;

const Address = styled.p`
  text-transform: lowercase;
`;

function Account() {
  const userAddressRef = useRef(null);
  const { user, isLoadingUser, userError } = useUser();

  return (
    <ProfilePagesLayout>
      {isLoadingUser ? (
        <DummyAccount />
      ) : !user?.data ? (
        <UserSignInPrompt />
      ) : userError ? (
        <ErrorMessage message={userError.message} />
      ) : (
        <>
          <Heading>Account overview</Heading>

          <Modal>
            <Main>
              <Section>
                <Description>
                  <p>Account Details</p>
                </Description>

                <TableBody>
                  <TableBodyHeading>
                    {user?.data?.user?.firstName} {user?.data?.user?.lastName}
                  </TableBodyHeading>
                  <TableBodyContent>
                    <Address>{user?.data?.user?.email}</Address>
                  </TableBodyContent>
                </TableBody>
              </Section>

              <Section>
                <Description>
                  <p>Address Book</p>
                  <Modal.Open modalName="edit-user-address">
                    <Icon Svg={GoPencil} fill="var(--secondary-color)" />
                  </Modal.Open>

                  <Modal.Window
                    modalName="edit-user-address"
                    handler={() => userAddressRef.current.click()}
                  >
                    <EditUserAddress ref={userAddressRef} />
                  </Modal.Window>
                </Description>

                <TableBody>
                  <TableBodyHeading>
                    Your Default Shipping Address:
                  </TableBodyHeading>

                  <TableBodyContent>
                    <p>
                      {user?.data?.user?.firstName} {user?.data?.user?.lastName}
                    </p>
                    <p>
                      {`${user?.data?.user?.userAddress?.address}, ${user?.data?.user?.userAddress?.region}, ${user?.data?.user?.userAddress?.city}, ${user?.data?.user?.userAddress?.country}`}
                    </p>
                    <p>{user?.data?.user?.tel}</p>
                  </TableBodyContent>
                </TableBody>
              </Section>
            </Main>
          </Modal>
        </>
      )}
    </ProfilePagesLayout>
  );
}

export default Account;
