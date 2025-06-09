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
  const formattedCategoryId = categoryId.replace(/-/g, " ");
  const {
    category,
    isLoading: isLoadingCategory,
    error: categoryError,
  } = useCategory(formattedCategoryId);

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
        {formattedCategoryId}
      </div>

      {isLoadingCategory ? (
        <Spinner />
      ) : categoryError ? (
        <ErrorMessage message={categoryError.message} />
      ) : (
        <ItemsContainer categoryId={formattedCategoryId} heading="top deals" />
      )}

      {category?.data?.category?.subCategory && (
        <>
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
          {category?.data?.category?.subCategory?.map((subCategoryId, i) => (
            <HorizontalItemsContainer
              key={i + 1}
              categoryId={subCategoryId}
              heading={subCategoryId}
            />
          ))}
        </>
      )}
    </PageLayout>
  );
}

export default CategoryPage;
