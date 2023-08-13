import { FaShoppingCart } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";

const ProductDetail = () => {
  const product = useLoaderData();
  const { name, image, details, price, availability } = product || {};

  const { user } = useAuth();
  const navigate = useNavigate();

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
          navigate("/login", { state: { from: location } });
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
    <div className="container mx-auto px-4 mt-16 md:mt-24">
      <h3 className="text-center text-3xl md:text-4xl lg:text-5xl mb-2 font-bold">
        {name}
      </h3>
      <div className="md:flex justify-center items-center md:gap-6 lg:gap-10 mt-16 md:mt-24">
        <img className="w-full mb-8 md:mb-0" src={image} alt="product" />
        <div>
          <p className="text-sm">Availability: {availability} in Stock</p>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="text-xl font-medium mt-2">${price}</p>
          <p className="my-4">{details}</p>
          <button onClick={() => handleAddToCart()} className="btn-primary">
            <span className="flex items-center gap-1">
              <FaShoppingCart /> Add to Cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
