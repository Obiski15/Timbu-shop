import styled from "styled-components";
import Skeleton from "../../components/Skeleton";

const ReviewsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-items: start;
  align-items: start;
  flex-direction: column;
  gap: 2rem;

  & > div {
    padding: 1rem 2rem;
    width: 100%;
  }
`;

const Reviews = styled.div`
  display: grid;
  justify-content: space-between;
  align-items: flex-start;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
`;

const ReviewRatings = styled.div`
  display: none;

  @media only screen and (min-width: 768px) {
    grid-column: span 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-right: 1rem;
  }
`;

const RatingsCounter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  align-items: flex-start;

  & > div {
    width: 100%;
  }
`;

const ReviewCommentsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
  grid-column: span 4;

  @media only screen and (min-width: 768px) {
    padding-left: 1rem;
    grid-column: span 3;
  }
`;

const ReviewComments = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    padding-bottom: 1rem;
    margin-top: 1rem;
  }
`;

function DummyReview() {
  return (
    <ReviewsWrapper>
      <Reviews>
        <ReviewRatings>
          <Skeleton width={150} />
          <Skeleton width={150} height={150} style={{ borderRadius: "1rem" }} />

          <RatingsCounter>
            <Skeleton height={10} style={{ borderRadius: "0.8rem" }} />
            <Skeleton height={10} style={{ borderRadius: "0.8rem" }} />
            <Skeleton height={10} style={{ borderRadius: "0.8rem" }} />
          </RatingsCounter>
        </ReviewRatings>

        <ReviewCommentsWrapper>
          <Skeleton width={150} height={25} />
          <ReviewComments>
            <div>
              <Skeleton width={100} />
              <Skeleton
                height={50}
                style={{ borderRadius: "0.5rem", maxWidth: "500px" }}
              />
              <Skeleton width={120} />
            </div>
            <div>
              <Skeleton width={100} />
              <Skeleton
                height={50}
                style={{ borderRadius: "0.5rem", maxWidth: "500px" }}
              />
              <Skeleton width={120} />
            </div>
          </ReviewComments>
        </ReviewCommentsWrapper>
      </Reviews>
    </ReviewsWrapper>
  );
}

export default DummyReview;
