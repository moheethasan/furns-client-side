import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = () => {
  const product = useLoaderData();
  const { price, _id } = product || {};
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    const updatedStatus = {
      payment_status: "purchased",
    };
    axios
      .patch(`${import.meta.env.VITE_apiUrl}/purchases/${_id}`, updatedStatus)
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Purchased successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/cart");
        }
      });
  };
  return (
    <div className="container mx-auto px-4 mt-16 md:mt-24">
      <h3 className="text-center font-medium text-2xl mb-10">
        Please Pay: ${price}
      </h3>
      <form onSubmit={handlePayment} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label className="block mb-1 font-bold">Card Number</label>
          <input
            type="number"
            placeholder="1234 5678 9012 3456"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">Expiry</label>
          <input
            type="text"
            placeholder="MM / YY"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">CVC</label>
          <input
            type="number"
            placeholder="123"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="btn-primary">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Checkout;
