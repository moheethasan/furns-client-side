import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Loader from "../../components/Shared/Loader/Loader";

const Cart = () => {
  const { user, loading } = useAuth();
  const { data: products = [], refetch } = useQuery(
    ["products", user],
    async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_apiUrl}/purchases/bookmarked?email=${
          user?.email
        }`
      );
      return res.data;
    }
  );

  const handleDelete = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_apiUrl}/purchases/${product._id}`)
          .then((data) => {
            if (data.data.deletedCount > 0) {
              refetch();
              Swal.fire(
                "Deleted!",
                "Product has been deleted from your cart.",
                "success"
              );
            }
          });
      }
    });
  };

  if (loading) {
    return <Loader></Loader>;
  }
  if (products?.length === 0) {
    return (
      <p className="text-error mt-10 text-lg font-semibold text-center">
        No products added in cart.
      </p>
    );
  }
  return (
    <div className="container mx-auto my-20">
      <Link to="/products" className="text-gray-500 font-semibold inline-block">
        <button className="flex gap-2 items-center">
          <HiArrowLongLeft className="text-3xl border border-gray-500 rounded-full p-1" />{" "}
          Continue Shopping
        </button>
      </Link>
      <div className="overflow-x-auto">
        <table className="text-gray-500 table-sm font-semibold md:table-md lg:table-lg w-full mt-5 rounded-lg">
          <thead className="border-b-2">
            <tr>
              <th className="text-start uppercase text-gray-500">No.</th>
              <th className="text-start uppercase text-gray-500">Product</th>
              <th className="text-start uppercase text-gray-500">Price</th>
              <th className="text-start uppercase text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={product._id} className="border-b-2">
                <td>{index + 1}</td>
                <td className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={product?.image} alt="product" />
                    </div>
                  </div>
                  {product?.name.length > 20
                    ? `${product?.name.slice(0, 20)}...`
                    : product?.name}
                </td>
                <td>${product?.price}</td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={() => handleDelete(product)}
                    className="text-red-600"
                  >
                    <FaTrashAlt className="text-lg md:text-xl" />
                  </button>
                  <Link
                    to={`/paymentCheckout/${product?._id}`}
                    className="px-2 py-1 bg-orange-500 text-white hover:bg-orange-600 text-sm"
                  >
                    Checkout
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
