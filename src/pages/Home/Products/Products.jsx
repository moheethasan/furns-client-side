import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SingleProduct from "./SingleProduct";
import Loader from "../../../components/Shared/Loader/Loader";

const Products = () => {
  const { data: products = [], isLoading } = useQuery(
    ["products"],
    async () => {
      const res = await axios.get(`${import.meta.env.VITE_apiUrl}/products`);
      return res.data;
    }
  );

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="container mx-auto px-4 mt-8 md:mt-10 lg:mt-14 xl:mt-10">
      <h3 className="text-center text-3xl md:text-4xl lg:text-5xl mb-2 font-bold">
        Our Products
      </h3>
      <p className="text-center md:text-lg xl:text-xl w-full lg:w-4/5 mx-auto mt-4">
        Explore our diverse range, from bedroom essentials to living room charms
        and dining delights, each piece designed to elevate your living
        experience.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 xl:gap-10 mt-12 md:mt-16">
        {products?.map((product) => (
          <SingleProduct
            key={product._id}
            product={product}
            isLoading={isLoading}
          ></SingleProduct>
        ))}
      </div>
    </div>
  );
};

export default Products;
