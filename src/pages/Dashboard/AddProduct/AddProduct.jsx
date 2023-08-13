import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();

  const img_hosting_token = import.meta.env.VITE_ImageUpload_apiKey;
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    data.price = parseFloat(data.price);

    const formData = new FormData();
    formData.append("image", data?.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const imgURL = imgData.data.display_url;
          data.image = imgURL;
          axios
            .post(`${import.meta.env.VITE_apiUrl}/products`, data)
            .then((data) => {
              if (data.data.acknowledged) {
                Swal.fire("Done!", `Product added successfully`, "success");
                reset();
                navigate("/dashboard/allProducts");
              }
            });
        }
      });
  };
  return (
    <>
      <div className="container mx-auto px-2 mt-16 md:mt-24">
        <h3 className="text-center text-3xl md:text-4xl lg:text-5xl mb-2 font-bold">
          Add Product
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow-2xl bg-base-100 p-14 rounded-lg lg:w-4/5 2xl:w-3/5 mx-auto"
        >
          <div className="w-full form-control">
            <label className="label">
              <span className="font-semibold label-text">Product Name</span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Product name"
              required
              className="input input-bordered border-2"
            />
          </div>
          <div className="w-full form-control">
            <label className="label">
              <span className="font-semibold label-text">Product Image</span>
            </label>
            <input
              type="file"
              {...register("image")}
              required
              className="file-input file-input-bordered border-2"
            />
          </div>
          <div className="w-full form-control">
            <label className="label">
              <span className="font-semibold label-text">Price</span>
            </label>
            <input
              {...register("price")}
              type="text"
              pattern="^\d+(\.\d{1,2})?$"
              placeholder="0.00"
              required
              className="input input-bordered border-2"
            />
          </div>
          <div className="w-full form-control">
            <label className="label">
              <span className="font-semibold label-text">
                Product Available
              </span>
            </label>
            <input
              {...register("availability")}
              type="text"
              pattern="^\d+$"
              placeholder="0"
              required
              className="input input-bordered border-2"
            />
          </div>
          <div className="w-full form-control">
            <label className="label">
              <span className="font-semibold label-text">Details</span>
            </label>
            <textarea
              {...register("details")}
              type="text"
              rows={3}
              placeholder="Details"
              required
              className="resize-none rounded-xl border-gray-300 border-2 px-4 py-2"
            />
          </div>
          <input
            className="btn-primary btn-block mt-6 cursor-pointer"
            type="submit"
            value="Add Product"
          />
        </form>
      </div>
    </>
  );
};

export default AddProduct;
