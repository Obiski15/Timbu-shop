import { useParams } from "react-router-dom";
import { useState } from "react";

import { useCategory } from "../services/useCategory";

import HomepageHeader from "../ui/HomepageHeader";
import HomepageLayout from "../ui/HomepageLayout";
import HorizontalLine from "../ui/HorizontalLine";
import Recommended from "../ui/Recommended";
import Categories from "../ui/Categories";
import BottomNav from "../ui/BottomNav";

function CategoryPage() {
  const category = useParams()
    .category.trim()
    .replaceAll("/", "")
    .replaceAll("-", " ");
  const [navHeight, setNavHeight] = useState(0);

  const { data, isLoading, error } = useCategory(category);

  return (
    <HomepageLayout navHeight={navHeight}>
      <HomepageHeader />
      <HorizontalLine gap={2} />
      <Categories />
      <Recommended error={error} data={data} isLoading={isLoading} />
      <BottomNav setNavHeight={setNavHeight} />
    </HomepageLayout>
  );
}

export default CategoryPage;
