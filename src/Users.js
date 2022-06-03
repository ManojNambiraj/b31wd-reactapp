import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    let userList = await axios.get("http://localhost:3000/users", {
      headers: {
        Authorization: localStorage.getItem("app_token"),
      },
    });
    setUsers(userList.data);
  };

  let handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/delete/${id}`, {
      headers: {
        Authorization: localStorage.getItem("app_token"),
      },
    });
    getData();
  };

  return (
    <div className="container">
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-12">
            <h3>User</h3>
            <Link to="/create" className="btn btn-primary btn-sm">
              Create User
            </Link>
          </div>

          <div className="col-lg-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Link
                          to={`/edituser/${user._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
