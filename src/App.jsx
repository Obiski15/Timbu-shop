import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import GlobalStyles from "./styles/GlobalStyles";
import store from "./store";

import CategoryPage from "./pages/CategoryPage";
import PageNotFound from "./pages/PageNotFound";
import Description from "./pages/Description";
import Homepage from "./pages/Homepage";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/:category",
      element: <CategoryPage />,
    },
    {
      path: "/:product-name/:id",
      element: <Description />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GlobalStyles />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={true} />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            success: {
              duration: 3000,
            },
          }}
        />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
