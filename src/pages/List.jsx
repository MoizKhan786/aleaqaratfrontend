import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../components/Navbar";
import Axios from "axios";
import { API_URL } from "../service/api.service";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  location: Yup.string().required("Location is required"),
  image: Yup.mixed().required("Image is required"),
  type: Yup.string().required("Type is required"),
});

const List = () => {
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    description: "",
    price: "",
    location: "",
    image: null,
    type: "",
  };

  const handleSubmit = async (values) => {
    try {
      const fileReader = new FileReader();

      fileReader.onload = async (event) => {
        try {
          const base64String = event.target.result;

          const imageObject = {
            data: base64String,
            name: values.image.name,
            mimeType: values.image.type,
          };

          console.log("Image object:", imageObject);
          const requestBody = {
            propertyData: {
              title: values.title,
              description: values.description,
              price: values.price,
              location: values.location,
              type: values.type,
            },
            imageFile: imageObject,
          };

          const response = await Axios.post(
            API_URL + "create-property",
            requestBody,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem("token"),
              },
            }
          );

          if (response.status === 200) {
            console.log("Property listed successfully");
            alert("Property listed successfully");
            navigate("/");
          } else {
            console.error("Failed to list property");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fileReader.readAsDataURL(values.image);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="max-w-md mx-auto bg-white p-8 mt-10 rounded shadow-md">
            <div className="flex justify-center">
              <h1 className="text-lg font-bold">List your property</h1>
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-bold mb-2">
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-bold mb-2"
              >
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-bold mb-2">
                Price
              </label>
              <Field
                type="number"
                id="price"
                name="price"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-bold mb-2"
              >
                Location
              </label>
              <Field
                type="text"
                id="location"
                name="location"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-bold mb-2">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={(event) =>
                  setFieldValue("image", event.currentTarget.files[0])
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-bold mb-2">
                Type
              </label>
              <Field
                as="select"
                id="type"
                name="type"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Type</option>
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
              </Field>
              <ErrorMessage
                name="type"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default List;
