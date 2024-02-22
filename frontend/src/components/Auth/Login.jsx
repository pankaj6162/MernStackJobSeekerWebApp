// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  // State variables to manage form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Context for authorization
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sending login data to the backend API
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // Display success message upon successful login
      toast.success(data.message);
      // Clearing form inputs after successful login
      setEmail("");
      setPassword("");
      setRole("");
      // Updating authorization state
      setIsAuthorized(true);
    } catch (error) {
      // Handling errors that occur during login
      if (error.response && error.response.data && error.response.data.message) {
        // If error message is available in the response data, display it
        toast.error(error.response.data.message);
      } else {
        // If no specific error message is available, display a generic error message
        toast.error("An error occurred while processing your request.");
      }
    }
  };

  // Redirect to home page if user is already authorized
  if(isAuthorized){
    return <Navigate to={'/'}/>
  }

  // JSX rendering for the login form
  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/jobpk.png" alt="logo" />
            <h3>Login to your account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="zk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <Link to={"/register"}>Register Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/login.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;
