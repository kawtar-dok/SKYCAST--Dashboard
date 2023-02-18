// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import axios from "axios";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import favicon from "assets/images/favicon.png";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import { useState,useEffect } from "react";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [img, setimg] = useState("");
  const [cityName, setcityName] = useState("");
  const [humidity, sethumidity] = useState("");
  const [pressure, setpressure] = useState("");
  const [description, setdescription] = useState("");
  const [temp, settemp] = useState("");
  const [mintemp, setmintemp] = useState("");
  const [maxtemp, setmaxtemp] = useState("");

  const todayWeather = async () => {
    try {
      const response = await axios.get("http://localhost:8080/last-weather");
      const data = response.data;
      console.log(data);
      setcityName(data.cityName);
      settemp(data.currentTemp);
      setpressure(data.pressure);
      sethumidity(data.humidity);
      setdescription(data.description);
      setimg(data.iconImage);
      setmaxtemp(data.maxTemp);
      setmintemp(data.minTemp)
      console.log(img)

    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    todayWeather();
  }, [])
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} >
        <SoftBox mb={3} >
          <Grid container spacing={4}  >
            <Grid item xs={12} sm={6} xl={6}>
              <MiniStatisticsCard
                title={{ text: "today's Min Temperature" }}
                count={mintemp}
                percentage={{ color: "info", text: "°C" }}
                icon={{ color: "light", component: favicon }}
              />
            </Grid>
          
            <Grid item xs={12} sm={6} xl={6}>
              <MiniStatisticsCard
                title={{ text: "today's Max temperature" }}
                count={humidity}
                percentage={{ color: "info", text: "°C" }}
                icon={{color: "light", component: favicon  }}
              
              />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox pt={2} px={0}>
          <SoftTypography variant="h4" fontWeight="medium">
            Today
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={3} pt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <DefaultProjectCard
                image={img}
                temp={temp}
                cityName={cityName}
                humidity={humidity}
                description={description}
                pressure={pressure}
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
