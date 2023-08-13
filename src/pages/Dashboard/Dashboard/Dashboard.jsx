import { FaBoxOpen, FaPaperPlane, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Shared/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Dashboard = () => {
  const { user, loading } = useAuth();

  const { data: users = [] } = useQuery(["users"], async () => {
    const res = await axios.get(`${import.meta.env.VITE_apiUrl}/users`);
    return res.data;
  });
  const customers = users?.filter((user) => user.role !== "admin");

  const { data: products = [] } = useQuery(["products"], async () => {
    const res = await axios.get(`${import.meta.env.VITE_apiUrl}/products`);
    return res.data;
  });

  const { data: orders = [] } = useQuery(["orders"], async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_apiUrl}/purchases/purchased`
    );
    return res.data;
  });

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="container mx-auto px-4 mt-16 md:mt-24">
      <h4 className="text-center text-2xl lg:text-3xl font-medium mb-2">
        Welcome back,{" "}
        <span className="text-orange-600">{user?.displayName}</span>
      </h4>
      <div className="flex items-center justify-center mt-12 md:mt-16 gap-8">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="h-40 w-40 flex flex-col gap-1 items-center justify-center border-2 border-slate-700 hover:border-orange-600 rounded-lg">
            <div className="text-5xl">
              <FaUsers />
            </div>
            <h3 className="uppercase font-medium">Customers</h3>
            <h3 className="text-4xl">{customers?.length}</h3>
          </div>
          <div className="h-40 w-40 flex flex-col gap-1 items-center justify-center border-2 border-slate-700 hover:border-orange-600 rounded-lg">
            <div className="text-5xl">
              <FaBoxOpen />
            </div>
            <h3 className="uppercase font-medium">Products</h3>
            <h3 className="text-4xl">{products?.length}</h3>
          </div>
          <div className="h-40 w-40 flex flex-col gap-1 items-center justify-center border-2 border-slate-700 hover:border-orange-600 rounded-lg">
            <div className="text-5xl">
              <FaPaperPlane />
            </div>
            <h3 className="uppercase font-medium">Orders</h3>
            <h3 className="text-4xl">{orders?.length}</h3>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard/allCustomers"
            className="px-3 py-2 font-medium border-2 border-slate-700 hover:text-white hover:border-orange-600 hover:bg-orange-600 text-sm"
          >
            All Customers
          </Link>
          <Link
            to="/dashboard/allProducts"
            className="px-3 py-2 font-medium border-2 border-slate-700 hover:text-white hover:border-orange-600 hover:bg-orange-600 text-sm"
          >
            All Products
          </Link>
          <Link
            to="/dashboard/allOrders"
            className="px-3 py-2 font-medium border-2 border-slate-700 hover:text-white hover:border-orange-600 hover:bg-orange-600 text-sm"
          >
            All Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
