import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import plusIcon from "../assets/images/plusIcon.jpg";
import axios from "axios";
import JoditEditor from "jodit-react";
import { API_BASE_URL } from "./../../config";

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  images: Yup.array().of(Yup.mixed().required("Slider images is required")),
  productImage: Yup.mixed().required("Product image is required"),
  prices: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
      quantity: Yup.string().required("Quantity is required"),
      price: Yup.number().required("Price is required"),
      discount: Yup.number().required("Discount is required"),
    })
  ),
  checkboxes: Yup.object().test(
    "at-least-one-checked",
    "At least one option must be selected",
    (values) => Object.values(values).includes(true)
  ),
});

const ProductForm = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [proImage, setProductImage] = useState();
  const [categories, setCategories] = useState([]);
  const editor = useRef(null);
  const placeholder = "Start typing...";
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
    }),
    []
  );
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const uploadProduct = async (values) => {
    console.log("values...................", values);
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("category", values.category);
    formData.append("description", values.description);
    formData.append("mainImage", values.productImage);
    values.images.forEach((image) => {
      formData.append("sliderImages", image);
    });
    formData.append("prices", JSON.stringify(values.prices));
    formData.append("checkboxes", JSON.stringify(values.checkboxes));

    try {
      const response = await axios.post(
        `${API_BASE_URL}/products`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        productName: "",
        category: "",
        productImage: [],
        images: [],
        description: "",
        prices: [{ name: "", quantity: "", price: "", discount: "" }],
        checkboxes: {
          phoneNumber: false,
          email: false,
          playerId: false,
          messageBox: false,
        },
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        uploadProduct(values);
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="mt-4">
          <div className="row">
            <div className="col-lg-12">
              <Box
                display="inline-block"
                flexDirection="column"
                alignItems="center"
              >
                <h3>Product Image</h3>
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  hidden
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("productImage", file);

                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setProductImage(reader.result);
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
                      backgroundImage: `url(${proImage || plusIcon})`,
                    }}
                  />
                </label>
                {touched.productImage && errors.productImage && (
                  <Typography color="error">{errors.productImage}</Typography>
                )}
              </Box>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Product Name</label>
              <Field
                as={TextField}
                name="productName"
                fullWidth
                error={touched.productName && !!errors.productName}
                helperText={touched.productName && errors.productName}
              />
            </div>
            <div className="col-md-6">
              <label>Category</label>
              <Field
                as={Select}
                name="category"
                fullWidth
                displayEmpty
                error={touched.category && !!errors.category}
              >
                <MenuItem value="" disabled>
                  Select Category
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.categoryName}>
                    {cat.categoryName}
                  </MenuItem>
                ))}
              </Field>
              {touched.category && errors.category && (
                <Typography color="error">{errors.category}</Typography>
              )}
            </div>
          </div>

          <h5 className="mt-4">Add Slider Images</h5> 
          <FieldArray name="images">
            {({ push, remove }) => (
              <div className="row">
                {values.images.map((_, index) => (
                  <div key={index} className="col-md-2 mb-3">
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        id={`image-upload-${index}`}
                        hidden
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          const updatedImages = [...values.images];
                          updatedImages[index] = file;
                          setFieldValue("images", updatedImages);

                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const updatedPreviews = [...imagePreviews];
                              updatedPreviews[index] = reader.result;
                              setImagePreviews(updatedPreviews);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <label htmlFor={`image-upload-${index}`}>
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
                            backgroundImage: `url(${
                              imagePreviews[index] || plusIcon
                            })`,
                          }}
                        />
                      </label>
                      {index > 0 && (
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => {
                            const updatedImages = values.images.filter(
                              (_, i) => i !== index
                            );
                            setFieldValue("images", updatedImages);

                            const updatedPreviews = imagePreviews.filter(
                              (_, i) => i !== index
                            );
                            setImagePreviews(updatedPreviews);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      )}
                      {touched.images && errors.images?.[index] && (
                        <Typography color="error">
                          {errors.images[index]}
                        </Typography>
                      )}
                    </Box>
                  </div>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-2"
                  onClick={() => push(null)}
                >
                  <AddIcon /> Add More Image
                </Button>
              </div>
            )}
          </FieldArray>

          <FieldArray name="prices">
            {({ push, remove }) => (
              <div>
                <h5 className="mt-4">Pricing</h5>
                {values.prices.map((_, index) => (
                  <div key={index} className="row mt-2">
                    <div className="col-md-3">
                      <Field
                        as={TextField}
                        name={`prices.${index}.name`}
                        label="Name"
                        fullWidth
                        error={
                          touched.prices?.[index]?.name &&
                          !!errors.prices?.[index]?.name
                        }
                        helperText={
                          touched.prices?.[index]?.name &&
                          errors.prices?.[index]?.name
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <Field
                        as={TextField}
                        name={`prices.${index}.quantity`}
                        label="Quantity"
                        fullWidth
                        error={
                          touched.prices?.[index]?.quantity &&
                          !!errors.prices?.[index]?.quantity
                        }
                        helperText={
                          touched.prices?.[index]?.quantity &&
                          errors.prices?.[index]?.quantity
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <Field
                        as={TextField}
                        name={`prices.${index}.price`}
                        label="Price"
                        fullWidth
                        error={
                          touched.prices?.[index]?.price &&
                          !!errors.prices?.[index]?.price
                        }
                        helperText={
                          touched.prices?.[index]?.price &&
                          errors.prices?.[index]?.price
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <Field
                        as={TextField}
                        name={`prices.${index}.discount`}
                        label="Discount"
                        fullWidth
                        error={
                          touched.prices?.[index]?.discount &&
                          !!errors.prices?.[index]?.discount
                        }
                        helperText={
                          touched.prices?.[index]?.discount &&
                          errors.prices?.[index]?.discount
                        }
                      />
                    </div>
                    {index > 0 && (
                      <div className="col-md-2 mt-2 d-flex align-items-center">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => remove(index)}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-4"
                  onClick={() =>
                    push({ name: "", quantity: "", price: "", discount: "" })
                  }
                >
                  <AddIcon /> Add More Price
                </Button>
              </div>
            )}
          </FieldArray>

          <div className="mt-4">
            <h5 className="mt-4">Discription</h5>
            <JoditEditor
              ref={editor}
              value={values.description}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setFieldValue("description", newContent)}
            />
            {touched.description && errors.description && (
              <Typography color="error">{errors.description}</Typography>
            )}
          </div>
          <div className="row mt-5">
            <h5>Must Require</h5>
            {Object.keys(values.checkboxes).map((key) => (
              <div className="col-md-3">
                <div key={key}>
                  <label>
                    <Field
                      type="checkbox"
                      name={`checkboxes.${key}`}
                      checked={values.checkboxes[key]}
                      onChange={(e) =>
                        setFieldValue(`checkboxes.${key}`, e.target.checked)
                      }
                      style={{ marginRight: "5px" }}
                    />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {touched.checkboxes && errors.checkboxes && (
            <Typography color="error">{errors.checkboxes}</Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="success"
            className="mt-4"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
