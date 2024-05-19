import React from 'react';
import ReactApexChart from 'react-apexcharts'; // Assuming you have ReactApexChart installed

// Sample data and options for the chart




const HourlyGraph = ({  height = 350, weatherData }) => {
    const dat = [31, 40, 28, 51, 42, 109, 10]
    const temparr =[]
    const datesarr = []
    weatherData?.map((tem, ind)=>(
        temparr.push(tem?.temp),
        datesarr.push(new Date(tem?.datetime).toLocaleDateString("en-gb", {day:"2-digit", month:"short", year:"numeric"}))
    ))
    const series = [
        {
          name: 'weather',
          data: temparr
        }
      ];

      const getColor = (value) => {
        console.log(value)
        if (value < 20) {
          return '#2ECC71'; // Green
        } else if (value >= 20 && value < 30) {
          return '#F9A01B'; // Orange
        } else {
          return '#FF0000'; // Red
        }
      };

    const options = {
        chart: {
          height: 350,
          type: 'area'
        },
        labels: datesarr,
        grid: {
            show: false // This hides both horizontal and vertical major gridlines
          },
        dataLabels: {
          enabled: false
        },
        fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.5,
              gradientToColors: ["#2ECC71", "#F9A01B",'#FF0000'],
              stops: [0,20,30]
            }
          },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'string',
        },
        xaxis: {
            axisBorder: { // Configure X-axis border color
              color: 'transparent' // Replace with your desired color (e.g., '#333', '#ff0000')
            },
            labels: { // Configure X-axis labels color
              style: {
                colors: '#fff' // Replace with your desired color
              }
            }
          },
          yaxis: {
            axisBorder: { // Configure Y-axis border color
              color: 'transparent' // Replace with your desired color
            },
            labels: { // Configure Y-axis labels color
              style: {
                colors: '#fff' // Replace with your desired color
              }
            }
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      };
  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="area" height={height} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default HourlyGraph;