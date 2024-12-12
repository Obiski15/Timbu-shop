import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 2rem;
`;

const Image = styled.div`
  width: 150px;
  height: 150px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function NoResult() {
  return (
    <Wrapper>
      <Main>
        <Image>
          <img src="/images/no-result.png" alt="no-result-found" />
        </Image>
        <p>We couldn&apos;t Find any Product</p>
      </Main>
    </Wrapper>
  );
}

export default NoResult;
