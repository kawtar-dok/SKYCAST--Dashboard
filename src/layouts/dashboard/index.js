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
  const [graphData,setGraphData] = useState([])
  const getLastThree = async () => {
    const response = await axios.get("http://localhost:8080");
    const data = response.data;
    const finalData= [data[data.length-3],data[data.length-2],data[data.length-1]];
    let gradientLineChartData = {
      labels: [  finalData[0].dateTime.split(' ')[1], finalData[1].dateTime.split(' ')[1], finalData[2].dateTime.split(' ')[1]],
      datasets: [
        {
          label: "Temp",
          color: "info",
          data: [  finalData[0].currentTemp, finalData[1].currentTemp, finalData[2].currentTemp],
        },
        {
          label: "humidity",
          color: "dark",
          data: [  finalData[0].humidity, finalData[1].humidity, finalData[2].humidity],
        },{
          label: "pressure",
          color: "dark",
          data: [  finalData[0].pressure, finalData[1].pressure, finalData[2].pressure],
        },
      ],
    };
    console.log(gradientLineChartData);
    setGraphData(gradientLineChartData);

  }
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
    getLastThree();
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

        <SoftBox pt={0} px={0}>
          <SoftTypography variant="h4" fontWeight="medium">
            Today
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={3} pt={1}>
          <Grid container spacing={4}>
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
            <Grid item xs={12} lg={7.5}>
              <GradientLineChart
                title="Real Time Change"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                    °C{" "}
                     
                    </SoftTypography>
                  </SoftBox>
                }
                height="17.5rem"
                chart={graphData}
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
