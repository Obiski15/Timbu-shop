import Categories from "../features/categories/Categories";
import ItemsContainer from "../features/items/ItemsContainer";
import PageLayout from "../ui/layouts/PageLayout";

function Homepage() {
  return (
    <PageLayout>
      <Categories />
      <ItemsContainer heading="recommended" />
      <ItemsContainer heading="top deals" limit={10} />
    </PageLayout>
  );
}

export default Homepage;
