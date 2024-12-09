import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

import FullPageSpinner from "./ui/components/FullPageSpinner";

import GlobalStyles from "./styles/GlobalStyles";

const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const RecentlyViewed = lazy(() => import("./pages/RecentlyViewed"));
const Description = lazy(() => import("./pages/ItemDescription"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const RecommededAll = lazy(() => import("./pages/RecommededAll"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Homepage = lazy(() => import("./pages/Homepage"));
const Account = lazy(() => import("./pages/Account"));
const Profile = lazy(() => import("./pages/Profile"));
const Explore = lazy(() => import("./pages/Explore"));
const Signup = lazy(() => import("./pages/Signup"));
const Search = lazy(() => import("./pages/Search"));
const Orders = lazy(() => import("./pages/Orders"));
const Login = lazy(() => import("./pages/Login"));
const Cart = lazy(() => import("./pages/Cart"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <Signup />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <ForgotPassword />
        </Suspense>
      ),
    },
    {
      path: "/reset-password/:resetToken",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <ResetPassword />
        </Suspense>
      ),
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <Homepage />
        </Suspense>
      ),
    },
    {
      path: "/category/:category",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <CategoryPage />
        </Suspense>
      ),
    },
    {
      path: "/product/:product-name/:id",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <Description />
        </Suspense>
      ),
    },
    {
      path: "/cart",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <Cart />
        </Suspense>
      ),
    },
    {
      path: "/checkout",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <Checkout />
        </Suspense>
      ),
    },
    {
      path: "/search",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <Search />
        </Suspense>
      ),
    },
    {
      path: "/wishlist",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <Wishlist />
        </Suspense>
      ),
    },
    {
      path: "/explore",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <Explore />
        </Suspense>
      ),
    },
    {
      path: "/profile",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <Profile />
        </Suspense>
      ),
    },
    {
      path: "/profile/my-account",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <Account />
        </Suspense>
      ),
    },
    {
      path: "/profile/history/view",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <RecentlyViewed />
        </Suspense>
      ),
    },
    {
      path: "/profile/orders",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <Orders />
        </Suspense>
      ),
    },
    {
      path: "/recommended",
      element: (
        <Suspense fallback={<FullPageSpinner />}>
          <RecommededAll />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense>
          <PageNotFound />
        </Suspense>
      ),
    },
  ]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          success: {
            duration: 3000,
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
