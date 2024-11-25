import { IoIosNotificationsOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../ui/components/Dropdown";
import styled from "styled-components";
import toast from "react-hot-toast";

import { useLogout } from "../../services/auth/useLogout";
import { useUser } from "../../services/user/useUser";

import CartIcon from "../../ui/components/CartIcon";
import Spinner from "../../ui/components/Spinner";

const Profile = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  gap: 8px;

  & p {
    flex: 1;
  }
`;

const Name = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
    text-transform: capitalize;
  }

  & > img {
    display: none;
    @media only screen and (min-width: 992px) {
      display: block;
    }
  }
`;

const Img = styled.img`
  width: 54px;
  height: 54px;
  object-fit: cover;
  border-radius: 50%;
`;

const DropdownIcon = styled.button`
  width: 40px;
  height: 40px;
  padding: 0.5rem;

  & svg {
    width: 30px;
    height: 30px;
  }
`;

const Mobile = styled.div`
  @media only screen and (min-width: 992px) {
    display: none;
  }
`;

const RightIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  & svg {
    width: 24px;
    height: 24px;
  }
`;

const tabs = [
  { path: "/explore", value: "explore" },
  { path: "/profile/my-account", value: "profile" },
  { path: "/wishlist", value: "wishlist" },
  { path: "/profile/orders", value: "my orders" },
];

function UserProfile() {
  const { logout, isLoggingOut } = useLogout();
  const { user, isLoadingUser, userError } = useUser();
  const navigate = useNavigate();

  return (
    <Profile>
      <Dropdown>
        <Img
          src={user?.data?.user?.photo || "/images/profile.png"}
          alt="user-profile"
        />
        <Name>
          {isLoadingUser ? (
            <Spinner />
          ) : (
            <span>
              Welcome, {userError ? "User" : user?.data?.user?.firstName}
            </span>
          )}
          <Dropdown.DropButton name="profile-dropdown">
            <DropdownIcon disabled={isLoadingUser}>
              <RiArrowDropDownLine />
            </DropdownIcon>
          </Dropdown.DropButton>

          <Dropdown.Window name="profile-dropdown">
            <Dropdown.List>
              {tabs.map(({ path, value }, i) => (
                <Dropdown.Button
                  key={i + 1}
                  onClick={() => {
                    navigate(path);
                  }}
                >
                  {value}
                </Dropdown.Button>
              ))}
              {!user && !isLoadingUser ? (
                <Dropdown.Button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Dropdown.Button>
              ) : (
                <Dropdown.Button
                  disabled={isLoggingOut}
                  onClick={() => {
                    toast.success("Logging Out");
                    logout();
                  }}
                >
                  Logout
                </Dropdown.Button>
              )}
            </Dropdown.List>
          </Dropdown.Window>
        </Name>

        <RightIcons>
          <Mobile>
            <IoIosNotificationsOutline />
          </Mobile>

          <CartIcon />
        </RightIcons>
      </Dropdown>
    </Profile>
  );
}

export default UserProfile;
