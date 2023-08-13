import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineFullscreen } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";

const SingleProduct = ({ product }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { _id, name, image, details, availability, price } = product || {};

  const handleAddToCart = () => {
    if (!user) {
      return Swal.fire({
        title: "Oops!",
        text: "You have to be logged in to add the product.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
    const selectedProduct = {
      user_name: user?.displayName,
      user_email: user?.email,
      name,
      image,
      details,
      price,
      availability,
      payment_status: "bookmarked",
    };
    axios
      .post(`${import.meta.env.VITE_apiUrl}/purchases`, selectedProduct)
      .then((data) => {
        if (data.data.insertedId) {
          Swal.fire("Done!", `Product added in cart successfully`, "success");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Oops!", `Something went wrong.`, "error");
      });
  };

  return (
    <div className="text-center group">
      <div className="relative">
        <Link to={`/products/${_id}`}>
          <img className="mb-4" src={image} alt="product" />
        </Link>
        <Link
          to={`/products/${_id}`}
          className="absolute top-2 right-2 ml-2 p-2 bg-white rounded-full hover:text-orange-600 tooltip tooltip-left hidden group-hover:block"
          data-tip="View Details"
        >
          <AiOutlineFullscreen size={20} />
        </Link>
        <button
          onClick={() => handleAddToCart()}
          className="bg-white hover:text-orange-600 p-px sm:p-1 md:p-2 text-xs md:text-sm absolute bottom-3 left-1/2 transform -translate-x-1/2 font-medium hidden group-hover:block"
        >
          <span className="flex items-center gap-1">
            <FaShoppingCart /> Add to Cart
          </span>
        </button>
      </div>
      <Link
        to={`/products/${_id}`}
        className="md:text-lg hover:text-orange-600"
      >
        {name}
      </Link>
      <h3 className="md:text-lg">${price}</h3>
    </div>
  );
};

export default SingleProduct;
