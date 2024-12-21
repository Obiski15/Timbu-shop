import styled from "styled-components";

const StyledNoRecentSearch = styled.div`
  height: 100%;
  font-weight: 500;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
`;

const NoHistoryImage = styled.div`
  width: 50px;
  height: 50px;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

function NoRecentSearch() {
  return (
    <StyledNoRecentSearch>
      <div>
        <p>No search history recorded</p>

        <NoHistoryImage>
          <img src="/images/history.png" alt="history" />
        </NoHistoryImage>
      </div>
    </StyledNoRecentSearch>
  );
}

export default NoRecentSearch;
