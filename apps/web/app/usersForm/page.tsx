
"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { addlogedInUser } from "../redux/loginUsersSlice";
import { useRouter } from "next/navigation";
import './userLogin.css'


// ... (imports and other code)

const LoginForm = () => {

  const route = useRouter();
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.usersData.users);
  const loginsData = useSelector((state) => state.loginsData.logedInUsers);
  const lastUsersPass = usersData.length > 0 ? usersData[usersData.length - 1].password : null;
  const lastLoggedInPass = loginsData.length > 0 ? loginsData[loginsData.length - 1].loginPassword : null;

  // console.log("DATA", usersData, loginsData);
  // console.log("LAST", lastUsersPass, lastLoggedInPass);
  const [userImage, setUserImageLocal] = useState(null);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    // Add a new property for user image
    userImage: null, // Change from a string to a File object
  });

  const [loginData, setLoginData] = useState({
    loginEmail: '',
    loginPassword: '',
  });

  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (isSignUp) {
      setUserData((prevData) => ({
        ...prevData,
        [name]: type === 'file' ? files[0] : value, // Handle file input
      }));
    } else {
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Handle signup data
      if (userData.password !== userData.confirmPassword) {
        alert("Password and Confirm Password do not match.");
        return;
      }

      // Check if the email is already registered
      const isEmailRegistered = usersData.some((user) => user.email === userData.email);

      if (isEmailRegistered) {
        alert("Email already registered. Please choose a different email.");
        return;
      }

      const uploadedImageDataUrl = await simulateImageUpload(userData.userImage);
      setUserImageLocal(uploadedImageDataUrl);

      console.log('User Signup Data:', userData);
      dispatch(addUser({ ...userData, userImage: uploadedImageDataUrl }));
      setIsSignUp(false);
      // You can dispatch an action or perform further processing with the signup data
    } else {
      // Handle login data
      console.log('User Login Data:', loginData);

      // Check if the provided email and password match any of the signed-up users
      const isValidLogin = usersData.some(
        (user) => user.email === loginData.loginEmail && user.password === loginData.loginPassword
      );

      if (isValidLogin) {
        dispatch(addlogedInUser(loginData));
        console.log('Login successful');
        route.push("/dashBoard");
        
      } else {
        alert("Incorrect email or password. Please try again.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center userLogComp">
      <form className="row g-3 mt-4 p-4 rounded" style={{ backgroundColor: 'rgb(218 191 239)' }} onSubmit={handleSubmit}>
        {isSignUp ? (
          // Render sign-up specific fields
          <div>
            <h4 className=" text-danger text-center">User SignUp Form</h4>
            <div className="col-12">
              <label className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            {/* New input field for user image */}
            <div className="col-12">
              <label htmlFor="userImage" className="form-label">
                User Image (Attach Photo)
              </label>
              <input
                type="file"
                className="form-control"
                id="userImage"
                name="userImage"
                accept="image/*" // Allow only image files
                onChange={handleInputChange}
              />
            </div>
          </div>
        ) : (
          // Render sign-in specific fields
          <>
            <h4 className=" text-danger text-center">User Login Form</h4>
            <div className="col-12">
              <label htmlFor="loginEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                name="loginEmail"
                value={loginData.loginEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="loginPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                name="loginPassword"
                value={loginData.loginPassword}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        <div className="col-12">
          <button type="submit" className="btn btn-primary mt-4 w-100">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </div>

        {/* Button to toggle between sign-up and sign-in */}
        <div className="col-12 mt-2">
          <button type="button" className="btn btn-link" onClick={toggleForm}>
            {isSignUp
              ? "Already have an account? Sign In"
              : "Need an account? Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

const simulateImageUpload = async (imageFile) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(imageFile);
  });
};
