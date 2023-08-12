import { FaPaperPlane } from "react-icons/fa";
import logo from "../../../assets/icon.png";
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiMail, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-slate-300 mt-20 pt-20 pb-10 px-4 relative">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-black z-20 relative">
        <div className="col-span-1">
          <Link to="/">
            <img className="w-28 md:w-32 lg:w-40" src={logo} alt="logo" />
          </Link>
          <p className="mt-4">
            Discover premium furniture that combines style and functionality at
            Furns. Explore limitless possibilities and elevate your home&#39;s
            elegance.
          </p>
        </div>
        <div className="col-span-1">
          <h3 className="text-xl font-bold mb-5">Helpful Links</h3>
          <p className="mb-4 hover:text-orange-600">
            <Link to="#">Browse Products</Link>
          </p>
          <p className="mb-4 hover:text-orange-600">
            <Link to="#">Shipping & Delivery</Link>
          </p>
          <p className="mb-4 hover:text-orange-600">
            <Link to="#">Returns & Exchanges</Link>
          </p>
        </div>
        <div className="col-span-1">
          <h3 className="text-xl font-bold mb-5">Quick Links</h3>
          <p className="mb-4 hover:text-orange-600">
            <Link to="#">Home Furniture</Link>
          </p>
          <p className="mb-4 hover:text-orange-600">
            <Link to="#">Office Furniture</Link>
          </p>
          <p className="mb-4 hover:text-orange-600">
            <Link to="#">Hospital Furniture</Link>
          </p>
        </div>
        <div className="col-span-1">
          <h3 className="text-xl font-bold mb-5">Contact Us</h3>
          <div className="flex items-center gap-3">
            <Link to="#">
              <p className="p-2 rounded-md bg-white hover:bg-orange-600 text-black hover:text-white">
                <FiFacebook className="text-lg" />
              </p>
            </Link>
            <Link to="#">
              <p className="p-2 rounded-md bg-white hover:bg-orange-600 text-black hover:text-white">
                <FiTwitter className="text-lg" />
              </p>
            </Link>
            <Link to="#">
              <p className="p-2 rounded-md bg-white hover:bg-orange-600 text-black hover:text-white">
                <FiInstagram className="text-lg" />
              </p>
            </Link>
            <Link to="#">
              <p className="p-2 rounded-md bg-white hover:bg-orange-600 text-black hover:text-white">
                <FiMail className="text-lg" />
              </p>
            </Link>
          </div>
          <p className="my-4">
            For latest updates subscribe to our newsletter.
          </p>
          <form className="flex">
            <input
              className="border-black rounded-l-xl w-full md:w-3/4 px-4 bg-white"
              type="email"
              placeholder="Email Address"
            />
            <button
              type="submit"
              className="transition duration-200 px-3 md:px-5 py-3 md:py-4 text-white bg-orange-500 hover:bg-orange-600 rounded-r-xl"
            >
              <FaPaperPlane className="text-xl" />
            </button>
          </form>
        </div>
      </div>
      <p className="text-center pt-16 text-black">
        <small>
          &copy; {new Date().getFullYear()} Furns. All rights reserved.
        </small>
      </p>
    </footer>
  );
};

export default Footer;
