import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography, IconButton, Tooltip } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import plusIcon from "../assets/images/plusIcon.jpg";
import axios from "axios";
import { API_BASE_URL } from "./../../config";
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast, ToastContainer } from "react-toastify";


const validationSchema = Yup.object().shape({
  categoryImage: Yup.mixed().required("Image is required"),
});

const MediaUpload = () => {
  const [cateImage, setCateImage] = useState();
  const [images, setImages] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/media`);
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to fetch images.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, [images]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(`${API_BASE_URL}/media`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        setCateImage(null);
      }
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image.");
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(`${API_BASE_URL}/media/${imageId}`);
      setImages(images.filter((image) => image._id !== imageId));
      toast.success("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Error deleting image.");
    }
  };

  const handleCopyImageUrl = (url) => {
    navigator.clipboard.writeText(`${API_BASE_URL}${url}`);
    toast.info("Image URL copied to clipboard!");
  };

  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Upload Images
        </Typography>

        <Formik
          initialValues={{
            categoryImage: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (values.categoryImage) {
              handleImageUpload(values.categoryImage);
            }
          }}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form>
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
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

                <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
                  Upload
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>

      <Typography variant="h4" sx={{ mt: 4, fontWeight: "bold", mb: 4 }} gutterBottom>
        All Uploaded Images
      </Typography>

      <Grid container>
        {images.map((image) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2}
            key={image._id}
            onMouseEnter={() => setHoveredImage(image._id)}
            onMouseLeave={() => setHoveredImage(null)}
            sx={{ position: "relative" }}
          >
            <Box
              sx={{
                width: 200,
                height: 200,
                backgroundImage: `url(${API_BASE_URL}${image.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px",
                position: "relative",
              }}
            >
              {hoveredImage === image._id && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    <Tooltip title="Delete Image" arrow>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteImage(image._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy Image URL" arrow>
                      <IconButton
                        color="primary"
                        onClick={() => handleCopyImageUrl(image.imageUrl)}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default MediaUpload;
