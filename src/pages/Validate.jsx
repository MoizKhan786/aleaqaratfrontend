import { useFormik } from "formik";
import * as Yup from "yup";

const Validate = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      authenticationCode: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is Required"),
      authenticationCode: Yup.string().required("Auth Code is Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="flex flex-col mb-5 justify-center items-center h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Validation</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <form onSubmit={formik.handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username<span className="text-red-500"> *</span>
            </label>
            <input
              type="username"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="border p-2 w-full"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-700">{formik.errors.username}</div>
            ) : null}
          </div>

          {/* Auth Code */}
          <div className="mb-4">
            <label
              htmlFor="authenticationCode"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Authentication Code<span className="text-red-500"> *</span>
            </label>
            <input
              type="password"
              id="authenticationCode"
              name="authenticationCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.authenticationCode}
              className="border p-2 w-full"
            />
            {formik.touched.authenticationCode &&
            formik.errors.authenticationCode ? (
              <div className="text-red-700">
                {formik.errors.authenticationCode}
              </div>
            ) : null}
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Validate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Validate;
