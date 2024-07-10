import styled from "styled-components";

import notification from "../assets/icons/notification.svg";
import cart from "../assets/icons/cart.svg";
import dropDown from "../assets/icons/drop-down.svg";
import profile from "/images/profile.png";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px 12px 20px;
  gap: 8px;

  & p {
    flex: 1;
  }
`;

const Name = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > img {
    @media only screen and (max-width: 1201px) {
      display: none;
    }
  }
`;

const Img = styled.img`
  width: 54px;
  height: 54px;
  object-fit: cover;
  border-radius: 50%;
`;

const DropdownIcon = styled.img`
  display: inline-block;
`;

const Mobile = styled.div`
  @media only screen and (min-width: 1201px) {
    display: none;
  }
`;

function Profile() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Dropdown>
        <Img src={profile} alt="user-profile" />
        <Name>
          <span>Welcome, Obiski</span>
          <Dropdown.DropButton name="profile-dropdown">
            <DropdownIcon src={dropDown} alt="drop-down-icon" />
          </Dropdown.DropButton>

          <Dropdown.Window name="profile-dropdown">
            <Dropdown.List>
              <Dropdown.Button>Explore</Dropdown.Button>
              <Dropdown.Button>Cart</Dropdown.Button>
              <Dropdown.Button>Wishlist</Dropdown.Button>
            </Dropdown.List>
          </Dropdown.Window>
        </Name>

        <Mobile>
          <img src={notification} alt="notification-icon" />
        </Mobile>
        <img src={cart} alt="cart-icon" onClick={() => navigate("/cart")} />
      </Dropdown>
    </Wrapper>
  );
}

export default Profile;
