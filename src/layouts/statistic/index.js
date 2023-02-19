// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import axios from "axios";
import moment from "moment";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

import { useEffect, useState } from "react";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";

function Formation() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  //yyyy-MM-ddThh:mm
  const [dateDepart, setDateDepart] = useState("2023-01-01T23:11");
  const [dateFin, setDateFin] = useState("2023-12-01T23:11");
  const [graphData, setGraphData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const getData = async () => {
    const response = await axios.get("http://localhost:4431");
    let data = response.data;
    data = data.filter((a) => {
      return a.dateTime != null;
    });

    const startDate = moment(dateDepart, "YYYY-MM-DDTHH:mm").toDate();
    const endDate = moment(dateFin, "YYYY-MM-DDTHH:mm").toDate();
    console.log(startDate.getTime());
    data = data.filter((a) => {
      //18-02-2023 20:40:00
      const date = moment(a.dateTime, "DD-MM-YYYY HH:mm:ss").toDate();
      return date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime();
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
      <SoftBox py={6}>
        <SoftBox mb={-1}>
          <Grid item xs={12} lg={6}>
            <SoftBox mb={3}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} xl={6}>
                  <Input
                    value={dateDepart}
                    type="datetime-local"
                    onChange={(e) => setDateDepart(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={6}>
                  <Input
                    value={dateFin}
                    type="datetime-local"
                    onChange={(e) => setDateFin(e.target.value)}
                  />
                </Grid>
              </Grid>
            </SoftBox>

            <GradientLineChart
              title="Sales Overview"
              description={
                <SoftBox display="flex" alignItems="center">
                  <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                    <Icon className="font-bold">arrow_upward</Icon>
                  </SoftBox>
                  <SoftTypography variant="button" color="text" fontWeight="medium">
                    °C
                  </SoftTypography>
                  <SoftBox px={120}>
                    <Button onClick={exportDataToCSV}>export</Button>
                  </SoftBox>
                </SoftBox>
              }
              height="20.25rem"
              chart={graphData}
            />
          </Grid>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Formation;
