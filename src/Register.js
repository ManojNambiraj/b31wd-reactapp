import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await axios.post("https://b31wd-nodeapp.herokuapp.com/register", values);
      navigate("/login");
    },
  });

  return (
    <div className="container">
      <div className="row">
        <h1>User Registration</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-12">
            <label>Name</label>
            <input
              type={`text`}
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="form-control"
            />
          </div>
          <div className="col-lg-12">
            <label>Email</label>
            <input
              type={`Email`}
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
              value="Submit"
              className="btn btn-primary btn-sm mt-3"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
