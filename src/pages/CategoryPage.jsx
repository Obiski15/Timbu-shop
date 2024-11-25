import { useParams } from "react-router-dom";

import { useCategory } from "../services/categories/useCategory";

import HorizontalItemsContainer from "../features/items/HorizontalItemsContainer";
import ItemsContainer from "../features/items/ItemsContainer";
import Categories from "../features/categories/Categories";
import ErrorMessage from "../ui/components/ErrorMessage";
import PageLayout from "../ui/layouts/PageLayout";
import Spinner from "../ui/components/Spinner";

function CategoryPage() {
  const { category: categoryId } = useParams();
  const {
    category,
    isLoading: isLoadingCategory,
    error: categoryError,
  } = useCategory(categoryId);

  return (
    <PageLayout>
      <Categories />
      <div
        style={{
          backgroundColor: "var(--secondary-color)",
          color: "white",
          padding: "1.5rem",
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: "2rem",
          fontWeight: 600,
          margin: "2rem 2rem 0 2rem",
          borderRadius: "0.5rem",
        }}
      >
        {categoryId}
      </div>

      <ItemsContainer categoryId={categoryId} heading="top deals" />
      <div
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "1.5rem",
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: "1.6rem",
          fontWeight: 600,
          margin: "2rem 2rem 0 2rem",
          borderRadius: "0.5rem",
        }}
      >
        Shop by category
      </div>

      {isLoadingCategory && <Spinner />}
      {categoryError && <ErrorMessage message={categoryError.message} />}
      {category?.data?.category?.subCategory?.map((category, i) => (
        <HorizontalItemsContainer
          key={i + 1}
          categoryId={category}
          heading={category}
        />
      ))}
    </PageLayout>
  );
}

export default CategoryPage;
