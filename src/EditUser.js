import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const params = useParams();
  const navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    onSubmit: async (values) => {
      await axios.put(
        `https://b31wd-nodeapp.herokuapp.com/${params.id}`,
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

  let userDatas = async () => {
    let userData = await axios.get(
      `https://b31wd-nodeapp.herokuapp.com/user/${params.id}`,
      {
        headers: {
          Authorization: localStorage.getItem("app_token"),
        },
      }
    );
    console.log(userData.data);
    delete userData.data._id;
    formik.setValues(userData.data);
  };

  useEffect(() => {
    userDatas();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h3>Edit User</h3>
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

export default EditUser;
