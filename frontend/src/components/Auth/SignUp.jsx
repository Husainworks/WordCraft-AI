import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { Input } from "../Inputs/Input";
import { authImg } from "../../utils/imagedata";
import { ProfilePhotoSelector } from "../Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminAccessToken, setAdminAccessToken] = useState("");
  const [error, setError] = useState(null);

  const { updateUser, setOpenAuthForm } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!name) {
      setError("Please enter full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // SignUp API call
    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        password,
        profileImageUrl,
        adminAccessToken,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        if (role === "admin") {
          setOpenAuthForm(false);
          navigate("/admin/dashboard");
        } else {
          setOpenAuthForm(false);
          navigate("/");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="flex items-center h-auto">
        <div className="w-[90vw] md:w-[43vw] p-7 flex flex-col justify-center">
          <h3 className="text-3xl font-semibold text-black">
            Create an Account
          </h3>
          <p className="text-sm text-slate-700 mt-[5px] mb-6">
            Join us today by entering your details below
          </p>

          <form onSubmit={handleSignUp}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                value={name}
                onChange={({ target }) => setName(target.value)}
                label="Full Name"
                placeholder={`John Doe`}
                type={`text`}
              />

              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email"
                placeholder={`john@example.com`}
                type={`text`}
              />

              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder={`Min 8 characters`}
                type={`password`}
              />

              <Input
                value={adminAccessToken}
                onChange={({ target }) => setAdminAccessToken(target.value)}
                label="Admin Invite Token"
                placeholder={`6 Digit Code`}
                type={`number`}
              />
            </div>

            {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">
              SIGN UP
            </button>

            <p className="text-sm text-slate-800 mt-3">
              Already have an account?{" "}
              <button
                type="button"
                className="font-medium text-primary underline cursor-pointer"
                onClick={() => {
                  setCurrentPage("login");
                }}
              >
                Login
              </button>
            </p>
          </form>
        </div>

        <div className="hidden md:block">
          <img src={authImg} alt="SignUp" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
