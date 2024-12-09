import { MdOutlineHistory, MdOutlineStoreMallDirectory } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { FaStoreAlt } from "react-icons/fa";
import styled from "styled-components";
import toast from "react-hot-toast";

import { useLogout } from "../../services/auth/useLogout";
import { useUser } from "../../services/user/useUser";

import AlertDialog from "../../ui/components/AlertDialog";
import useDeleteUser from "../../services/user/useDeleteUser";

const StyledProfileNavBar = styled.main`
  display: flex;
  padding: 1rem 0;
  flex-direction: column;
  gap: 1rem;

  @media only screen and (min-width: 992px) {
    gap: 0;

    & > div {
      &:nth-child(2) {
        & > div {
          & > div {
            & > p {
              padding-left: 0;
            }
          }
        }
      }
    }
  }
`;

const SectionHeading = styled.p`
  padding: 1rem 2rem;
  font-weight: 500;
  text-transform: uppercase;

  @media only screen and (min-width: 992px) {
    display: none;
  }
`;

const SectionBody = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 2rem;

  &:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  &:last-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  &:hover {
    transform: scale(1.01);
  }

  & > svg {
    width: 24px;
    height: 24px;

    &:last-child {
      @media only screen and (min-width: 992px) {
        display: none;
      }
    }
  }

  & > p {
    text-transform: capitalize;
    flex: 1;
    padding: 1rem 2rem;
  }
`;

const Action = styled.button`
  color: var(--secondary-color);
  padding: 2rem 1rem;
  width: fit-content;
  margin: auto;
  letter-spacing: 0.1rem;

  &:active {
    background-color: var(--border);
    opacity: 0.8;
  }
`;

const paths = [
  {
    value: "my account",
    Icon: RiAccountPinCircleLine,
    nav: "my-account",
  },
  {
    value: "orders",
    Icon: MdOutlineStoreMallDirectory,
    nav: "orders",
  },
  {
    value: "recently viewed",
    Icon: MdOutlineHistory,
    nav: "history/view",
  },
  { value: "follow seller", Icon: FaStoreAlt, nav: "follow seller" },
];

function ProfileNavBar() {
  const { deleteUser, isDeletingUser } = useDeleteUser();
  const { logout, isLoggingOut } = useLogout();
  const { user, isLoadingUser } = useUser();
  const urlPath = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <AlertDialog>
      <StyledProfileNavBar>
        <div>
          <SectionHeading>My Ruvid Store Account</SectionHeading>
          <SectionBody>
            {paths.map(({ value, Icon, nav }, i) => (
              <Row
                key={i + 1}
                onClick={() => navigate(`/profile/${nav}`)}
                style={{
                  backgroundColor: urlPath.endsWith(nav) ? "var(--border)" : "",
                }}
              >
                <Icon />
                <p>{value}</p>
                <IoIosArrowForward />
              </Row>
            ))}
          </SectionBody>
        </div>

        <div>
          <SectionHeading>My Settings</SectionHeading>
          <SectionBody>
            <Row>
              <p>Account Management</p>
              <IoIosArrowForward />
            </Row>

            <AlertDialog.Open
              modalName={!user?.data || isDeletingUser ? "" : "close-account"}
            >
              <Row>
                <p>Close Account </p>
                <IoIosArrowForward />
              </Row>
            </AlertDialog.Open>
            <AlertDialog.Window
              modalName="close-account"
              buttonText="close account"
              cb={deleteUser}
            >
              <p>Are you sure you want to delete your account?</p>
            </AlertDialog.Window>
          </SectionBody>
        </div>
        {!user?.data?.user && !isLoadingUser ? (
          <Action
            disabled={isLoadingUser}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Action>
        ) : (
          <Action
            disabled={isLoggingOut || isLoadingUser}
            onClick={() => {
              toast.success("Logging out");
              logout();
            }}
          >
            Logout
          </Action>
        )}
      </StyledProfileNavBar>
    </AlertDialog>
  );
}

export default ProfileNavBar;
