import SectionHeader from "../ui/components/SectionHeader";
import DummyItem from "../ui/layouts/dummy/DummyItem";
import styled from "styled-components";

import { useRecentlyViewedItems } from "../services/offline/useRecentlyViewedItems";

import ProfilePagesLayout from "../ui/layouts/ProfilePagesLayout";
import ErrorMessage from "../ui/components/ErrorMessage";
import NoResult from "../ui/components/NoResult";
import Item from "../features/items/Item";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.4rem;
  padding: 1rem 2rem;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media only screen and (min-width: 1100px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media only screen and (min-width: 1440px) {
    grid-gap: 2rem;
    grid-template-columns: repeat(7, 1fr);
  }
`;

function RecentlyViewed() {
  const { data, isLoading, error } = useRecentlyViewedItems();

  return (
    <ProfilePagesLayout>
      <SectionHeader>Recently Viewed products</SectionHeader>

      {error ? (
        <ErrorMessage message={error.message} />
      ) : !data?.length ? (
        <NoResult />
      ) : (
        <Container>
          {isLoading
            ? Array.from({ length: 5 }, (_, i) => <DummyItem key={i + 1} />)
            : data?.map((item, i) => <Item key={i + 1} item={item} />)}
        </Container>
      )}
    </ProfilePagesLayout>
  );
}

export default RecentlyViewed;
