import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Box} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const EditProductDialog = ({ open, onClose, product, onSave }) => {
  const [name, setName] = useState(product.name);
  const [image, setImage] = useState(product.image);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    onSave({ ...product, name, image });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Product Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box mt="10px">
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="product-image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="product-image-upload">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          {image && (
            <img
              src={image}
              alt="Product Preview"
              style={{ width: "100%", height: "150px", objectFit: "cover", marginTop: "10px" }}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
