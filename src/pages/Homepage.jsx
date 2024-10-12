import { useEffect, useState } from "react";

import { WISHLIST_KEY } from "../utils/constants";
import { useItems } from "../services/useItems";
import { tempWishlist } from "../data/data";

import HomepageLayout from "../ui/layouts/HomepageLayout";
import HorizontalLine from "../ui/components/HorizontalLine";
import MainHeader from "../ui/components/MainHeader";
import BottomNav from "../ui/components/BottomNav";
import Recommended from "../ui/Recommended";
import Categories from "../ui/Categories";

function Homepage() {
  const [navHeight, setNavHeight] = useState(0);
  const { data, isLoading, error } = useItems();

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(tempWishlist));
  }, []);

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

export default Homepage;
