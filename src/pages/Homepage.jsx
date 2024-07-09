import { useEffect, useState } from "react";

import { WISHLIST_KEY } from "../utils/constants";
import { tempWishlist } from "../data/data";

import HomepageHeader from "../../ui/HomepageHeader";
import HomepageLayout from "../../ui/HomepageLayout";
import HorizontalLine from "../../ui/HorizontalLine";
import Recommended from "../../ui/Recommended";
import Categories from "../../ui/Categories";
import BottomNav from "../../ui/BottomNav";

function Homepage() {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(tempWishlist));
  }, []);

  return (
    <HomepageLayout navHeight={navHeight}>
      <HomepageHeader />
      <HorizontalLine gap={2} />
      <Categories />
      <Recommended />
      <BottomNav setNavHeight={setNavHeight} />
    </HomepageLayout>
  );
}

export default Homepage;
