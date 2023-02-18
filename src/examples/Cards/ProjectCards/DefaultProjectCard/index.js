// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftAvatar from "components/SoftAvatar";

function DefaultProjectCard({ image, cityName, title, description, action, humidity, temp,pressure }) {
 
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <SoftBox display="flex" justifyContent="space-between" alignItems="center">
        <SoftBox mb={0} px={3}>
          <SoftTypography
            variant="h5"
            fontWeight="bold"
            textTransform="capitalize"
            color="secondary"
            textGradient
          >
           Currently in  {cityName}
          </SoftTypography>
        </SoftBox>

        <SoftBox display="flex" py={1} px={2}>
          <SoftTypography fontWeight="bold" textTransform="capitalize" variant="h1" textGradient
          color="warning">
            {temp}°C
          </SoftTypography>
        </SoftBox>
      </SoftBox>

      <SoftBox position="relative" justifyContent="center"
          alignItems="center" 
          display="grid">
        <img
          src={image}
          component="img"
          width="140%"
          sx={{
            maxWidth: "150%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </SoftBox>
      <SoftBox pt={3} px={1}  
       justifyContent="center"
          alignItems="center" 
          display="grid"
          >
        <SoftBox mb={3} display="flex">
          <SoftTypography variant="h6" fontWeight="bold" textTransform="capitalize" color="text">
            Description :
          </SoftTypography>

          <SoftTypography px={1} variant="h6" fontWeight="regular" color="text">
            {description}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={3} display="flex">
          <SoftTypography variant="h6" fontWeight="bold" color="text">
            Humidity :
          </SoftTypography>

          <SoftTypography px={1} variant="h6" fontWeight="regular" color="text">
            {humidity}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={3} display="flex">
          <SoftTypography variant="h6" fontWeight="bold" color="text">
            Pressure :
          </SoftTypography>

          <SoftTypography px={1} variant="h6" fontWeight="regular" color="text">
            {pressure}
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  temp: PropTypes.string.isRequired,
  humidity: PropTypes.string.isRequired,
  pressure: PropTypes.string.isRequired,
  cityName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProjectCard;
