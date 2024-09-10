import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProductCard = ({ product, onSelect, onEdit }) => {
  return (
    <Box
      sx={{
        cursor: "pointer",
        width: "300px",
        height: "300px",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        transition: "0.3s",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      onClick={() => onSelect(product)}
    >
      {/* Display product image */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "70%",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      {/* Display product name */}
      <Typography 
        variant="h6" 
        fontWeight="bold" 
        mt="10px" 
        textAlign="center"
        sx={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {product.name}
      </Typography>
      {/* Edit Button */}
      <IconButton 
        sx={{ marginTop: "10px" }}
        onClick={(e) => {
          e.stopPropagation();
          onEdit(product);
        }}
      >
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default ProductCard;
