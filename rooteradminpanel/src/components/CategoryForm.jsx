import { Box, Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios"; 
import plusIcon from "../assets/images/plusIcon.jpg";
import { API_BASE_URL } from "./../../config";

const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required("Category name is required"),
  categoryImage: Yup.mixed().required("Category image is required"),
});

const CategoryForm = () => {
  const [cateImage, setCateImage] = useState();

  const uploadCategory = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("categoryName", values.categoryName);
      formData.append("mainImage", values.categoryImage);

      const response = await axios.post(`${API_BASE_URL}/categories`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Success:", response.data);
      alert("Category saved successfully!");
      resetForm();
      setCateImage(null);
    } catch (error) {
      console.error("Error uploading category:", error.response?.data || error.message);
      alert("Failed to save category");
    }
  };

  return (
    <Formik
      initialValues={{
        categoryName: "",
        categoryImage: "",
      }}
      validationSchema={validationSchema}
      onSubmit={uploadCategory}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="mt-4">
          <div className="row">
            <div className="col-lg-12">
              <Box display="inline-block" flexDirection="column" alignItems="center">
                <h5>Category Image</h5>
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  hidden
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("categoryImage", file);

                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setCateImage(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label htmlFor="image-upload">
                  <Box
                    sx={{
                      width: 173,
                      height: 173,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                      cursor: "pointer",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: `url(${cateImage || plusIcon})`,
                    }}
                  />
                </label>
                {touched.categoryImage && errors.categoryImage && (
                  <Typography color="error">{errors.categoryImage}</Typography>
                )}
              </Box>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h5>Category Name</h5>
              <Field
                as={TextField}
                name="categoryName"
                fullWidth
                error={touched.categoryName && !!errors.categoryName}
                helperText={touched.categoryName && errors.categoryName}
              />
            </div>
          </div>
          <Button type="submit" variant="contained" color="success" className="mt-2">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;
