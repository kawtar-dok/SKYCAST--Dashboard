// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import axios from "axios";
import moment from "moment";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import { useEffect, useState } from "react";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

function Formation() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  //yyyy-MM-ddThh:mm
  const [dateDepart, setDateDepart] = useState("2023-01-01T23:11");
  const [dateFin, setDateFin] = useState("2023-12-01T23:11");
  const [graphData, setGraphData] = useState([]);
  const [csvData,setCsvData] = useState([]);
  const getData = async () => {
    const response = await axios.get("http://localhost:8080");
    let data = response.data;
    data = data.filter((a) => {
      return a.dateTime != null;
    });

    const startDate = moment(dateDepart, 'YYYY-MM-DDTHH:mm').toDate();
    const endDate = moment(dateFin, 'YYYY-MM-DDTHH:mm').toDate();
    console.log(startDate.getTime());
    data = data.filter((a) => { 
      //18-02-2023 20:40:00
      const date = moment(a.dateTime,'DD-MM-YYYY HH:mm:ss').toDate();
      return date.getTime()>=startDate.getTime() && date.getTime()<=endDate.getTime();
    });
    setCsvData(data);
    
    
    
    
    

    // create an array of unique dateTimes to use as labels
    let uniqueDates = [...new Set(data.map((a) => a.dateTime))];
    // set up graph data with labels and data for each metric
    let gradientLineChartData = {
      labels: uniqueDates,
      datasets: [
        {
          label: "Temp",
          color: "info",
          data: data.map((a) => a.currentTemp),
        },
        {
          label: "humidity",
          color: "dark",
          data: data.map((a) => a.humidity),
        },
        {
          label: "pressure",
          color: "dark",
          data: data.map((a) => a.pressure),
        },
      ],
    };

    setGraphData(gradientLineChartData);
  };
  const exportDataToCSV = () => {
    // Define the CSV header with the labels
    const csvLabels = Object.keys(csvData[0]).join(",");
    let csvContent = csvLabels + "\n";
  
    // Iterate over each data object and add it to the CSV content
    csvData.forEach((dataObj) => {
      const values = Object.values(dataObj);
      const csvRow = values.join(",");
      csvContent += csvRow + "\n";
    });
  
    // Create a link to download the CSV file
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF
  
    link.click(); // This will download the data file named "my_data.csv".
  };
  

  useEffect(() => {
    getData();
  }, [dateDepart, dateFin]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's money" }}
                count="$53,000"
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's users" }}
                count="2,300"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "new clients" }}
                count="+3,462"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "sales" }}
                count="$103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid item xs={12} lg={7}>
            <input
              value={dateDepart}
              type="datetime-local"
              onChange={(e) => setDateDepart(e.target.value)}
            />
            <input
              value={dateFin}
              type="datetime-local"
              onChange={(e) => setDateFin(e.target.value)}
            />
            <button onClick={exportDataToCSV}>export</button>

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
              chart={graphData}
            />
          </Grid>
        </SoftBox>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Formation;
