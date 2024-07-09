import styled from "styled-components";
import SectionHeader from "./SectionHeader";
import RecommendedContainer from "./RecommendedContainer";

const StyledSavedItems = styled.div`
  border-top: 1px solid #e2e1e1;
  width: 100%;

  @media only screen and (min-width: 1201px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
`;

function SavedItems() {
  return (
    <StyledSavedItems>
      <SectionHeader>
        <p>Saved Items(5)</p>
      </SectionHeader>

      <RecommendedContainer />
    </StyledSavedItems>
  );
}

export default SavedItems;
