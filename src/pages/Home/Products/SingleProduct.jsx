import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineFullscreen } from "react-icons/ai";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
  const { _id, name, image, price } = product || {};
  return (
    <div className="text-center group">
      <div className="relative">
        <Link>
          <img className="mb-4" src={image} alt="product" />
        </Link>
        <Link
          className="absolute top-2 right-2 ml-2 p-2 bg-white rounded-full hover:text-orange-600 tooltip tooltip-left hidden group-hover:block"
          data-tip="View Details"
        >
          <AiOutlineFullscreen size={20} />
        </Link>
        <button className="bg-white hover:text-orange-600 p-px sm:p-1 md:p-2 text-xs md:text-sm absolute bottom-3 left-1/2 transform -translate-x-1/2 font-medium hidden group-hover:block">
          <span className="flex items-center gap-1">
            <FaShoppingCart /> Add to Cart
          </span>
        </button>
      </div>
      <Link className="md:text-lg hover:text-orange-600">{name}</Link>
      <h3 className="md:text-lg">${price}</h3>
    </div>
  );
};

export default SingleProduct;
