import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const { data: products = [] } = useQuery(["products"], async () => {
    const res = await axios.get(`${import.meta.env.VITE_apiUrl}/products`);
    return res.data;
  });
  return (
    <div className="container mx-auto my-20">
      <div className="flex justify-between items-center mb-4 md:mb-8">
        <h1 className="text-2xl">Total Products: {products?.length}</h1>
        <Link to="/dashboard/addProduct" className="btn-secondary">
          Add Product
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="text-gray-500 table-sm font-semibold md:table-md lg:table-lg w-full mt-5 rounded-lg">
          <thead className="border-b-2">
            <tr>
              <th className="text-start uppercase text-gray-500">No.</th>
              <th className="text-start uppercase text-gray-500">Product</th>
              <th className="text-start uppercase text-gray-500">Price</th>
              <th className="text-start uppercase text-gray-500">Quantity</th>
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
                <td>{product?.availability} pcs</td>
                <td>
                  <Link
                    to={`/products/${product._id}`}
                    className="px-2 py-1 bg-orange-500 text-white hover:bg-orange-600 text-sm"
                  >
                    {" "}
                    See Details
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

export default AllProducts;
