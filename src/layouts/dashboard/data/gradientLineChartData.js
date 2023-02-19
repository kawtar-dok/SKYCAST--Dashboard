const gradientLineChartData = {
  labels: [  "17:55", "18:00", "18:05"],
  datasets: [
    {
      label: "Temp",
      color: "info",
      data: [0,5,10,15,20,25,30,35,40,45],
    },
    {
      label: "humidity",
      color: "dark",
      data: [ 340, 230, 400],
    },{
      label: "pressure",
      color: "dark",
      data: [30,240, 300],
    },
  ],
};

export default gradientLineChartData;
