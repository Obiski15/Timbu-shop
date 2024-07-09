import { useEffect } from "react";

import { WISHLIST_KEY } from "../utils/constants";
import { tempWishlist } from "../data/data";

import HomepageHeader from "../../ui/HomepageHeader";
import HomepageLayout from "../../ui/HomepageLayout";
import HorizontalLine from "../../ui/HorizontalLine";
import Recommended from "../../ui/Recommended";
import Categories from "../../ui/Categories";
import BottomNav from "../../ui/BottomNav";

function Homepage() {
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(tempWishlist));
  }, []);

  return (
    <HomepageLayout>
      <HomepageHeader />
      <HorizontalLine gap={2} />
      <Categories />
      <Recommended />
      <BottomNav />
    </HomepageLayout>
  );
}

export default Homepage;
