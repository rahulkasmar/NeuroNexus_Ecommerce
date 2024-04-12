import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import { IconButton, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useNavigate } from "react-router-dom";



const ShoppingList = ({pro}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const [counta, setCounta] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");
  
  const {
    palette: { neutral },
  } = useTheme();
  
  const Card=({pro,width})=>{
    return (
      <Box width={width}>
        <Box
          position="relative"
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          <img
            alt={pro.name}
            width="300px"
            height="300px"
            src={pro.image}
            // onClick={() => navigate(`/item/${pro.id}`)}
            style={{ cursor: "pointer" }}
          />
          <Box
            display={isHovered ? "block" : "none"}
            position="absolute"
            bottom="10%"
            left="0"
            width="100%"
            padding="0 5%"
          >
            <Box display="flex" justifyContent="space-between">
              <Box
                display="flex"
                alignItems="center"
                backgroundColor={shades.neutral[100]}
                borderRadius="3px"
              >
                <IconButton onClick={() => setCounta(Math.max(counta - 1, 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography color={shades.primary[300]}>{counta}</Typography>
                <IconButton onClick={() => setCounta(counta + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button sx={{ backgroundColor: shades.primary[300], color: "white" }} >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Box>
  
        <Box mt="3px" display='flex' justifyContent='space-between'> 
          <Typography variant="subtitle2" color={neutral.dark}>
            {pro?.category
              ?.replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </Typography>
          <Typography fontWeight="bold">${pro.price}</Typography>
        </Box>
      </Box>
    );
  };
  
  const handleChange = (event, newValue) => {
    setValue(newValue);

  };



  async function getItems() {
    const items = await fetch(
      "https://ecomerce-48vr.onrender.com/api/items?populate=image",
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []); 



  const topRatedItems = items?.filter(
     (item) => item.attributes.category === "topRated"
  );
  const newArrivalsItems = items?.filter(
     (item) =>item.attributes.category === "newArrivals"
  );
  const bestSellersItems = items?.filter(
     (item) =>item.attributes.category === "bestSellers"
  );


  return (
    <Box width="85%" margin="60px auto ">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        { value==='all' && 
          pro?.map((product) => (
            <Card pro={product} key={product.id}  />

            ))}

        {value === "all" &&
          items?.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}

        {value === "newArrivals" &&
          newArrivalsItems?.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "bestSellers" &&
          bestSellersItems?.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems?.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      
      
      </Box>
    </Box>
  );
};

export default ShoppingList;