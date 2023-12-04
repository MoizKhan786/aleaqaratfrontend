import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Axios from "axios";
import { API_URL } from "../service/api.service";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is Required"),
      lastName: Yup.string().required("Last Name is Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email ID is Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await Axios.post(API_URL + "register-user", values, {
          headers: { "Content-Type": "application/json" },
        });

        const data = response.data;

        if (response.status === 200) {
          console.log("User registered successfully:", data);
          alert("User has been successfully added!!");
          navigate("/login");
        } else {
          alert("Registration failed");
        }
      } catch (error) {
        alert(error.response.data.error);
      }
    },
  });

  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <h1 className="font-bold text-xl mb-5">SIGN UP</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <form onSubmit={formik.handleSubmit} className="max-w-md w-full">
          {/* First Name */}
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className="border p-2 w-full"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-700">{formik.errors.firstName}</div>
            ) : null}
          </div>
          {/* Last Name */}
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Last Name<span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className="border p-2 w-full"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-700">{formik.errors.lastName}</div>
            ) : null}
          </div>

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

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password<span className="text-red-500"> *</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="border p-2 w-full"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-700">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <h1
            onClick={() => {
              navigate("/login");
            }}
            className="text-blue-400 text-xs cursor-pointer flex justify-center mt-6"
          >
            Already Have an account?
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Register;
