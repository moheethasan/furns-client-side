import { useLoaderData } from "react-router-dom";

const CustomerDetails = () => {
  const customer = useLoaderData();
  const { name, email, image, phone } = customer || {};
  return (
    <div className="container mx-auto px-4 mt-16 md:mt-24">
      <div className="flex items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          {image ? (
            <figure className="px-10 pt-10">
              <img src={image} alt="image" className="rounded-xl w-52 h-52" />
            </figure>
          ) : (
            <figure className="px-10 pt-10">
              <img
                src="https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg"
                alt="image"
                className="rounded-xl w-52 h-52"
              />
            </figure>
          )}
          <div className="card-body items-center text-center">
            <h2 className="card-title">{name}</h2>
            <p className="font-medium">Email: {email}</p>
            {phone && <p className="font-medium">Phone: {phone}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
