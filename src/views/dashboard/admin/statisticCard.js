import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import Chart from "react-apexcharts";
import { Circle, ChevronDown } from "react-feather";

class PersoCard extends React.Component {
  state = {
    options: {
      colors: this.props.colors,
      fill: {
        type: "gradient",
        gradient: {
          //   enabled: true,
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: this.props.gradientToColors,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      plotOptions: {
        radialBar: {
          size: 150,
          hollow: {
            size: "20%",
          },
          track: {
            strokeWidth: "100%",
            margin: 15,
          },
          dataLabels: {
            name: {
              fontSize: "18px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",

              formatter: () => {
                return 100000;
              },
            },
          },
        },
      },
      labels: this.props.labels,
    },
    series: this.props.series,
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{this.props.title}</CardTitle>
          {/* <UncontrolledDropdown>
            <DropdownToggle tag="small" className="text-bold-500 cursor-pointer">
              Last 7 days <ChevronDown size={10} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Last 28 days</DropdownItem>
              <DropdownItem>Last Month</DropdownItem>
              <DropdownItem>Last Year</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </CardHeader>
        <CardBody>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="radialBar"
            height={350}
            className="mb-3"
          />
          {this.props.labels.map((item, index) => {
              console.log(item)
            return (
              <div className="chart-info d-flex justify-content-between mb-1">
                <div className="series-info d-flex align-items-center">
                  <Circle
                    strokeWidth={5}
                    size="12"
                    className={this.props.colorsName[index]}
                  />
                  <span className="text-bold-600 ml-50">{item}</span>
                </div>
                <div className="series-result">
                  <span className="align-middle">
                    {(this.props.series[index] * 100000) / 100}
                  </span>
                </div>
              </div>
            );
          })}
        </CardBody>
      </Card>
    );
  }
}
export default PersoCard;
