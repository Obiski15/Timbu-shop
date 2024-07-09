import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";

import Homepage from "./pages/Homepage";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Homepage /> },
    { path: "/cart", element: <Cart /> },
    { path: "/checkout", element: <Checkout /> },
  ]);

  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
