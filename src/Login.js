import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        let login = await axios.post(
          "https://b31wd-nodeapp.herokuapp.com/login",
          values
        );
        window.localStorage.setItem("app_token", login.data.token);
        navigate("/users");
      } catch (error) {
        alert("Your Email / Password is incorrect");
      }
    },
  });

  return (
    <div className="container">
      <div className="row">
        <h1>User Login</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-12">
            <label>Email</label>
            <input
              type={`text`}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="form-control"
            />
          </div>
          <div className="col-lg-12">
            <label>Password</label>
            <input
              type={`password`}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="form-control"
            />
          </div>
          <div className="col-lg-12">
            <input
              type={`submit`}
              value="Login"
              className="btn btn-primary btn-sm mt-3"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
