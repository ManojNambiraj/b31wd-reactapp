import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

function UserCreate() {
  const navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    onSubmit: async (values) => {
      await axios.post(
        "https://b31wd-nodeapp.herokuapp.com/create-user",
        values,
        {
          headers: {
            Authorization: localStorage.getItem("app_token"),
          },
        }
      );
      navigate("/");
    },
  });

  return (
    <div className="container">
      <div className="row">
        <h3>Create User</h3>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="form-control"
            />
          </div>
          <div className="col-lg-6">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="form-control"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-lg-6">
            <input type="submit" className="btn btn-primary btn-sm" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserCreate;
