import styled from "styled-components";

import Button from "../../ui/components/Button";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const StyledTopSideBar = styled.aside`
  display: none;

  @media only screen and (min-width: 768px) {
    grid-column: span 1;
    background-color: white;
    border-radius: 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: 1rem;

    & > div {
      padding: 1rem;

      &:first-child {
        border-bottom: 1px solid var(--border);
        text-transform: uppercase;
        font-weight: 500;
      }

      &:nth-child(2) {
        & > div:nth-child(2) {
          & > div:first-child {
            flex: 1;
          }
        }
      }
    }
  }
`;

const SellerInfoHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SellerInfoBodyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const SellerInfoBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

function TopSideBar() {
  return (
    <StyledTopSideBar>
      <SellerInfoHead>
        <div>Seller Information</div>
        <MdOutlineArrowForwardIos fill="var(--secondary-color)" />
      </SellerInfoHead>

      <SellerInfoBodyWrapper>
        <div>
          <p>{name}</p>
        </div>

        <SellerInfoBody>
          <div>
            <p>80% seller score</p>
            <p>400 followers</p>
          </div>
          <Button type="small" rounded={false}>
            Follow
          </Button>
        </SellerInfoBody>
      </SellerInfoBodyWrapper>
    </StyledTopSideBar>
  );
}

export default TopSideBar;
