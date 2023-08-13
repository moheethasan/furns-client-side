import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Products from "../pages/Home/Products/Products";
import ProductDetail from "../pages/Home/Products/ProductDetail";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Cart/Checkout";
import Dashboard from "../pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "products",
        element: <Products></Products>,
      },
      {
        path: "products/:id",
        element: <ProductDetail></ProductDetail>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_apiUrl}/products/${params.id}`),
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "paymentCheckout/:id",
        element: <Checkout></Checkout>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_apiUrl}/purchases/${params.id}`),
      },
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);
