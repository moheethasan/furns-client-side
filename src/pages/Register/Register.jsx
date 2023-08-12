import { useContext, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import SocialLogin from "../../components/Shared/SocialLogin.jsx/SocialLogin";

const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, editProfile, logOut } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const img_hosting_token = import.meta.env.VITE_ImageUpload_apiKey;
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  // email password login
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data?.photo[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const imgURL = imgData.data.display_url;
          signUp(data?.email, data?.password)
            .then((result) => {
              console.log(result.user);
              editProfile(data?.name, imgURL)
                .then(() => {
                  const saveUser = {
                    name: data?.name,
                    email: data?.email,
                    image: imgURL,
                    role: "user",
                  };
                  axios
                    .post(`${import.meta.env.VITE_apiUrl}/users`, saveUser)
                    .then((data) => {
                      if (data.data.insertedId) {
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Registered successfully",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        reset();
                        logOut();
                        navigate("/login");
                      }
                    });
                })
                .catch((err) => {
                  setError(err.message);
                });
            })
            .catch((err) => {
              setError(err.message);
            });
        }
      });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto flex justify-center mt-16 md:mt-24">
      <div className="card w-11/12 md:w-4/5 max-w-lg mx-auto lg:mx-0 shadow-2xl bg-base-100 mt-5 lg:mt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body z-20">
          <h1 className="text-4xl text-center font-bold pt-5 pb-8">Register</h1>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter your name"
              required
              className="input input-bordered border-2"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold label-text">Email Address</span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email address"
              required
              className="input input-bordered border-2"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold label-text">Number</span>
            </label>
            <input
              type="number"
              {...register("number", {
                required: true,
                pattern: {
                  value: /^\d{11}$/,
                  message: "Provide 11 digit number",
                },
              })}
              placeholder="Enter your Phone number"
              required
              className="input input-bordered border-2 w-full"
            />
            {errors.number?.type === "required" && (
              <p className="label-text font-semibold title-text mt-3 text-red-500">
                Number is required
              </p>
            )}
            {errors.number?.type === "pattern" && (
              <p className="label-text font-semibold title-text mt-3 text-red-500">
                Provide 11 digit number
              </p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold label-text">Password</span>
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$%&*])/,
                })}
                placeholder="Enter your password"
                required
                className="input input-bordered border-2 w-full"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
                onClick={handleTogglePassword}
              >
                {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
              </div>
            </div>
            {errors.password?.type === "required" && (
              <p className="label-text font-semibold title-text mt-3 text-red-500">
                Password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="label-text font-semibold title-text mt-3 text-red-500">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="label-text font-semibold title-text mt-3 text-red-500">
                Use at least one uppercase and one special character
              </p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold label-text">Photo URL</span>
            </label>
            <input
              type="file"
              {...register("photo")}
              placeholder="Photo URL"
              required
              className="file-input file-input-bordered border-2"
            />
            <p className="label-text font-semibold title-text mt-3 text-red-500">
              {error}
            </p>
          </div>
          <div className="form-control mt-2">
            <input
              className="btn-primary mt-3 cursor-pointer"
              type="submit"
              value="Register"
            />
            <label className="label flex justify-center">
              <span className="label-text font-semibold">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-sm font-semibold label-text-alt link link-hover text-orange-600"
                >
                  Login
                </Link>
              </span>
            </label>
          </div>
          <SocialLogin></SocialLogin>
        </form>
      </div>
    </div>
  );
};

export default Register;
