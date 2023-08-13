import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const AllCustomers = () => {
  const { data: users = [] } = useQuery(["users"], async () => {
    const res = await axios.get(`${import.meta.env.VITE_apiUrl}/users`);
    return res.data;
  });
  const customers = users?.filter((user) => user.role !== "admin");
  return (
    <div className="container mx-auto my-20">
      <div className="flex justify-between items-center mb-4 md:mb-8">
        <h1 className="text-2xl">Total Customers: {customers?.length}</h1>
        <Link to="/register" className="btn-secondary">
          Add Customer
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="text-gray-500 table-sm font-semibold md:table-md lg:table-lg w-full mt-5 rounded-lg">
          <thead className="border-b-2">
            <tr>
              <th className="text-start uppercase text-gray-500">No.</th>
              <th className="text-start uppercase text-gray-500">Name</th>
              <th className="text-start uppercase text-gray-500">Email</th>
              <th className="text-start uppercase text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer, index) => (
              <tr key={customer._id} className="border-b-2">
                <td>{index + 1}</td>
                <td>{customer?.name}</td>
                <td>{customer?.email}</td>
                <td>
                  <Link
                    to={`/allCustomers/${customer._id}`}
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

export default AllCustomers;
