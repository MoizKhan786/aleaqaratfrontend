import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Axios from "axios";
import { API_URL } from "../service/api.service";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email ID is Required"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await Axios.post(API_URL + "login-user", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const data = response.data;
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          alert("Authentication failed");
        }
      } catch (error) {
        console.error("Error:", error);
        if (error.response.status === 401) {
          alert(error.response.data.error);
        }
      }
    },
  });
  return (
    <div className="flex flex-col mb-5 justify-center items-center h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email<span className="text-red-500"> *</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="border p-2 w-full"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-700">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password<span className="text-red-500"> *</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="border p-2 w-full"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-700">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </div>
          <h1
            onClick={() => {
              navigate("/signup");
            }}
            className="text-blue-400 text-xs cursor-pointer flex justify-center mt-6"
          >
            Create a new account
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Login;
