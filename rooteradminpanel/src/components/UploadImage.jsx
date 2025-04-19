import React from 'react'
import plusIcon from "../assets/images/plusIcon.jpg";
import { Box } from '@mui/material';

const UploadImage = () => {
  return (
    <Box display="inline-block" flexDirection="column" alignItems="center">
    <h2>Product Image</h2>
    <input
      type="file"
      accept="image/*"
      id="image-upload"
      hidden
      onChange={(event) => {
        const file = event.currentTarget.files[0];
        setFieldValue("image", file);

        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setImagePreview(reader.result);
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
          backgroundImage: `url(${imagePreview || plusIcon})`,
        }}
      />
    </label>
    {touched.image && errors.image && (
      <Typography color="error">{errors.image}</Typography>
    )}
  </Box>
  )
}

export default UploadImage