import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Products from "../pages/Home/Products/Products";
import ProductDetail from "../pages/Home/Products/ProductDetail";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Cart/Checkout";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import AllCustomers from "../pages/Dashboard/AllCustomers/AllCustomers";
import AllOrders from "../pages/Dashboard/AllOrders/AllOrders";
import AllProducts from "../pages/Dashboard/AllProducts/AllProducts";
import CustomerDetails from "../pages/Dashboard/AllCustomers/CustomerDetails";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";

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
        path: "dashboard/allCustomers",
        element: <AllCustomers></AllCustomers>,
      },
      {
        path: "allCustomers/:id",
        element: <CustomerDetails></CustomerDetails>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_apiUrl}/users/${params.id}`),
      },
      {
        path: "dashboard/allProducts",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "dashboard/addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "dashboard/allOrders",
        element: <AllOrders></AllOrders>,
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
