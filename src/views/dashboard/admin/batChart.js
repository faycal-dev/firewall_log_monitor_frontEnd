import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { Bar } from "react-chartjs-2";

const $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $label_color = "#1E1E1E",
  $info = "#00cfe8",
  $purple = "#df87f2",
  grid_line_color = "#dae1e7";
const themeColors = [
  $primary,
  $success,
  $danger,
  $warning,
  $label_color,
  $info,
  $purple,
];

class BarCharts extends React.Component {
  state = {
    data: {
      labels: this.props.labels,
      datasets: [
        {
          label: "Nombre de logs",
          data: this.props.data,
          backgroundColor: themeColors,
          borderColor: "transparent",
        },
      ],
    },
    options: {
      elements: {
        rectangle: {
          borderWidth: 2,
          borderSkipped: "left",
        },
      },
      responsive: true,
      responsiveAnimationDuration: 500,

      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              color: grid_line_color,
            },
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              color: grid_line_color,
            },
            scaleLabel: {
              display: true,
            },
            ticks: {
              stepSize: 1000,
            },
          },
        ],
      },
      maintainAspectRatio: false,
      title: {
        display: true,
        text: this.props.title2,
      },
      legend: { display: false },
    },
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{this.props.title1}</CardTitle>
        </CardHeader>
        <CardBody>
          <Bar
            data={this.state.data}
            options={this.state.options}
            height={350}
          />
        </CardBody>
      </Card>
    );
  }
}
export default BarCharts;
