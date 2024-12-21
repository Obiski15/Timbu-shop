import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../../../ui/components/Button";

const StyledNoRecentView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Empty = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 4rem 0;
`;

const Image = styled.div`
  width: 100px;
  height: 100px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Text = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  & > p {
    &:first-child {
      font-weight: 600;
      word-spacing: 0.1rem;
    }

    &:last-child {
      font-weight: 400;
      letter-spacing: 0.1rem;
    }
  }
`;

function NoRecentView() {
  const navigate = useNavigate();
  return (
    <StyledNoRecentView>
      <Empty>
        <Image>
          <img src="/images/binoculars.svg" alt="empty-order" />
        </Image>

        <Text>
          <p>No Recently Viewed Products</p>
          <p>You have no recently viewed products at the moment</p>
        </Text>
        <Button onClick={() => navigate("/")}>Continue Shopping</Button>
      </Empty>
    </StyledNoRecentView>
  );
}

export default NoRecentView;
