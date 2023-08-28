import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { signUpSchema } from "../../utils/validation";
import { changeStatus, registerUser } from "../../features/UserSlice";
import AuthInput from "./AuthInput";
import Picture from "./Picture";

//variables
const cloudName = process.env.REACT_APP_CLOUD_NAME;
const cloudSecret = process.env.REACT_APP_CLOUD_SECRET;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.user);

  const [picture, setPicture] = useState("");
  const [readablePicture, setReadablePicture] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  const onSubmit = async (data) => {
    let imageURL = "";
    // upload image to cloudinary and then register user
    if (picture) {
      dispatch(changeStatus("loading"));
      const imageData = await uploadImage();
      imageURL = imageData?.secure_url;
    }

    let response = await dispatch(registerUser({ ...data, picture: imageURL }));

    // status is not updating properly
    if (response.payload.user) {
      navigate("/");
    }
  };

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("upload_preset", cloudSecret);
    formData.append("file", picture);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return data;
  };

  const handlePictureChange = (picture, readablePicture) => {
    setPicture(picture);
    setReadablePicture(readablePicture);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome!</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        {/* Form */}
        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            name="name"
            type="text"
            placeholder="Name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status(Optional)"
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          {/* Picture */}
          <Picture
            readablePicture={readablePicture}
            onPictureChange={handlePictureChange}
          />
          {/* if we have an error */}
          {error && (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          )}
          {/* Submit button */}
          <button
            type="submit"
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            {status === "loading" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Sign up"
            )}
          </button>
          {/* Sign in link */}
          <p className="flex flex-col justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Have an account ?</span>
            <Link
              to="/login"
              className="hover:underline transition ease-in duration-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
