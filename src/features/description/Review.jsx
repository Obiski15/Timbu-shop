import styled from "styled-components";
import { forwardRef } from "react";
import PropTypes from "prop-types";

import { useReview } from "../../services/review/useReview";
import { formatDate } from "../../utils/helpers";

import ErrorMessage from "../../ui/components/ErrorMessage";
import DummyReview from "../../ui/layouts/dummy/DummyReview";
import Progress from "../../ui/components/Progress";
import Ratings from "../../ui/components/Ratings";
import TabHeading from "./components/Tabheading";

import Pagination from "../../ui/components/Pagination";
import star from "../..//assets/icons/active-star.svg";
import chat from "../../assets/icons/chat.svg";

const ReviewsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-items: start;
  align-items: start;
  flex-direction: column;
  gap: 2rem;

  & > h1 {
    width: 100%;
    padding: 2rem;
    border-bottom: 1px solid #c7c7cd;
  }

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

const NoReviews = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;

  & > p {
    padding: 0 1rem;
  }
`;

const RatingCount = styled.p`
  min-width: 35px;
  color: #75757a;
  font-size: 1.2rem;
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

const AverageRatingWrapper = styled.div`
  background-color: #f1f1f2;
  padding: 2rem 2rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
`;

const AverageRating = styled.p`
  color: var(--secondary-color);
  font-size: 2.9rem;
  font-weight: 500;
`;

const TotalRatingCount = styled.p`
  font-size: 1.6rem;
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

const ReviewComments = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
  grid-column: span 4;

  & > h1 {
    display: none;
  }

  @media only screen and (min-width: 768px) {
    padding-left: 1rem;
    grid-column: span 3;
  }
`;

const Comments = styled.div`
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
    gap: 2rem;
    padding-bottom: 1rem;
    margin-top: 1rem;

    &:not(:last-child) {
      border-bottom: 1px solid #c7c7cd;
    }
  }
`;

const Review = forwardRef(
  (
    {
      productId,
      calculateTotalRating,
      calculateAverageRating,
      calculateSingleRating,
      ...props
    },
    ref
  ) => {
    const { data, isLoading, error } = useReview(productId);

    const comments = data?.data?.reviews?.filter(
      (val) => typeof val.comment === "string"
    );

    return (
      <ReviewsWrapper
        data-active-section="reviews-section"
        id="reviews-section"
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <DummyReview />
        ) : error ? (
          <ErrorMessage message={error.message} />
        ) : (
          <>
            <TabHeading>Verified Customer&apos;s FeedBack</TabHeading>

            {!data?.data?.reviews?.length ? (
              <NoReviews>
                <img
                  src={chat}
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "auto",
                  }}
                />
                <p>
                  Customers who have bought this product have not yet posted
                  comments
                </p>
              </NoReviews>
            ) : (
              <Reviews>
                <ReviewRatings>
                  <TabHeading>
                    Verified Ratings({calculateTotalRating()})
                  </TabHeading>

                  <AverageRatingWrapper>
                    <AverageRating>{calculateAverageRating()}/5</AverageRating>
                    <Ratings avg={(calculateAverageRating() * 100) / 5} />
                    <TotalRatingCount>
                      {calculateTotalRating()} verified ratings
                    </TotalRatingCount>
                  </AverageRatingWrapper>

                  <RatingsCounter>
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <p>{5 - i}</p>
                        <img
                          src={star}
                          alt="rating-star"
                          style={{ flexShrink: 0 }}
                        />
                        <RatingCount>
                          ({calculateSingleRating(5 - i)})
                        </RatingCount>
                        <Progress
                          percentage={
                            (calculateSingleRating(5 - i) /
                              calculateTotalRating()) *
                            100
                          }
                        />
                      </div>
                    ))}
                  </RatingsCounter>
                </ReviewRatings>

                <ReviewComments>
                  {!comments.length ? (
                    <NoReviews>
                      <img
                        src={chat}
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "auto",
                        }}
                      />
                      <p>
                        Customers who have bought this product have not yet
                        posted comments
                      </p>
                    </NoReviews>
                  ) : (
                    <>
                      <TabHeading>Comments from verified purchases</TabHeading>

                      <Comments>
                        {comments?.map((review, i) => (
                          <div key={i}>
                            <Ratings avg={review?.rating * 20} />
                            <p>{review?.comment}</p>
                            <div style={{ textTransform: "capitalize" }}>
                              {formatDate(review?.createdAt)} by{" "}
                              {review?.user?.firstName || "User"}
                            </div>
                          </div>
                        ))}
                      </Comments>
                    </>
                  )}
                  <Pagination
                    hasNextPage={true}
                    fetchNextPage={() => console.log("next page fectched")}
                    isFetchingNextPage={false}
                  />
                </ReviewComments>
              </Reviews>
            )}
          </>
        )}
      </ReviewsWrapper>
    );
  }
);

Review.displayName = "Review";

Review.propTypes = {
  calculateAverageRating: PropTypes.func,
  calculateSingleRating: PropTypes.func,
  calculateTotalRating: PropTypes.func,
  productId: PropTypes.string,
};

export default Review;
