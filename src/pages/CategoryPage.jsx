import { useParams } from "react-router-dom";
import { useState } from "react";

import { useCategory } from "../services/useCategory";

import HorizontalLine from "../ui/components/HorizontalLine";
import HomepageLayout from "../ui/layouts/HomepageLayout";
import BottomNav from "../ui/components/BottomNav";
import MainHeader from "../ui/components/MainHeader";
import Recommended from "../ui/Recommended";
import Categories from "../ui/Categories";

function CategoryPage() {
  const category = useParams()
    .category.trim()
    .replaceAll("/", "")
    .replaceAll("-", " ");
  const [navHeight, setNavHeight] = useState(0);

  const { data, isLoading, error } = useCategory(category);

  return (
    <HomepageLayout navHeight={navHeight}>
      <MainHeader />
      <HorizontalLine gap={2} />
      <Categories />
      <Recommended error={error} data={data} isLoading={isLoading} />
      <BottomNav setNavHeight={setNavHeight} />
    </HomepageLayout>
  );
}

export default CategoryPage;
