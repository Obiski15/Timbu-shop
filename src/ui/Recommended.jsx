import styled from "styled-components";
import SectionHeader from "./SectionHeader";
import RecommendedContainer from "./RecommendedContainer";

const StyledRecommended = styled.div`
  border-top: 1px solid #e2e1e1;
  width: 100%;

  @media only screen and (min-width: 1201px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
`;

function Recommended() {
  return (
    <StyledRecommended>
      <SectionHeader>
        <p>Recommended For You</p>
        <p>View All</p>
      </SectionHeader>

      <RecommendedContainer />
    </StyledRecommended>
  );
}

export default Recommended;
