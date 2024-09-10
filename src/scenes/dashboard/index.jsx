// src/pages/Dashboard.jsx
import { useState } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import StatBox from "../../components/StatBox";  // Existing StatBox component
import LineChart from "../../components/LineChart";  // Existing LineChart component
import BarChart from "../../components/BarChart";  // Existing BarChart component
import { tokens } from "../../theme";  // Adjust this path as per your structure
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditProductDialog from "../../components/EditProductDialog";



const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Sample product data
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", image: "path/to/image1.jpg" },
    { id: 2, name: "Product 2", image: "path/to/image2.jpg" },
  ]);

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setDialogOpen(true);
  };
  const handleSaveProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );
  };

  // Function to reset the selected product (to go back to product list)
  const resetSelection = () => setSelectedProduct(null);

  return (
    <Box m="20px">
      {/* If a product is selected, show the product details */}
      {selectedProduct ? (
        <Box>
          {/* Display the header of the product details */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" mb="20px">
              {selectedProduct.name} Details
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "20px", 
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Report
            </Button>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "20px", 
                marginRight:"0px",
              }}
            >
              <EmailIcon  sx={{ mr: "10px" }} />
              Mail Report
            </Button>
          </Box>
          {/* Display the charts, stat boxes, and other components */}
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
            {/* Stat Boxes */}
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="12,361"
                subtitle="Complaints Received"
                progress="0.75"
                increase="+14%"
                icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
              />
            </Box>

            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="431,225"
                subtitle="Sales Obtained"
                progress="0.50"
                increase="+21%"
                icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
              />
            </Box>

            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="32,441"
                subtitle="New Clients"
                progress="0.30"
                increase="+5%"
                icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
              />
            </Box>

            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="1,325,134"
                subtitle="Traffic Received"
                progress="0.80"
                increase="+43%"
                icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
              />
            </Box>

            {/* Charts Section */}
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Revenue Generated
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    $59,342.32
                  </Typography>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>

            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Sales Quantity
              </Typography>
              <Box height="250px" mt="-20px">
                <BarChart isDashboard={true} />
              </Box>
            </Box>
          </Box>

          <Button
          onClick={resetSelection}
          sx={{
            mt: "20px",
            backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "20px", 
              marginLeft: "0px"
          }}
          >
          <ArrowBackIcon sx={{ mr: "10px" }} />
          Back to Product List
          </Button>
        </Box>
      ) : (
        /* If no product is selected, show the product cards */
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="20px">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} onEdit={handleEditProduct} />
          ))}
        </Box>
      )}
      {/* Edit Product Dialog */}
      {editProduct && (
        <EditProductDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          product={editProduct}
          onSave={handleSaveProduct}
        />
      )}
    </Box>
  );
};

export default Dashboard;
