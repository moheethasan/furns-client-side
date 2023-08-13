import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AllOrders = () => {
  const { data: orders = [] } = useQuery(["orders"], async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_apiUrl}/purchases/purchased`
    );
    return res.data;
  });
  return (
    <div className="container mx-auto my-20">
      <div className="overflow-x-auto">
        <table className="text-gray-500 table-sm font-semibold md:table-md lg:table-lg w-full mt-5 rounded-lg">
          <thead className="border-b-2">
            <tr>
              <th className="text-start uppercase text-gray-500">No.</th>
              <th className="text-start uppercase text-gray-500">Product</th>
              <th className="text-start uppercase text-gray-500">Price</th>
              <th className="text-start uppercase text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((product, index) => (
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
                <td>{product?.payment_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
