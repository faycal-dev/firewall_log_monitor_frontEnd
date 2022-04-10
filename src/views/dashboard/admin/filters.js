import React from "react";
import { Row, Col, Card, Button, CardBody, Input } from "reactstrap";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import DataTableCustom from "./dataTable";
import Select from "react-select";
import Axios from "axios";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"

const SeverityOptions = [
  {
    value: "emergencies",
    label: "emergencies",
    color: "#00B8D9",
    isFixed: true,
  },
  { value: "Alerts", label: "Alerts", color: "#0052CC", isFixed: true },
  { value: "critical", label: "critical", color: "#5243AA", isFixed: true },
  { value: "Errors", label: "Errors", color: "#FF5630", isFixed: false },
  { value: "Warning", label: "Warning", color: "#FF8B00", isFixed: false },
  {
    value: "Informational",
    label: "Informational",
    color: "#FFC400",
    isFixed: false,
  },
];

const Filters = () => {
  const [data, setData] = React.useState([]);
  const [severityFilter, setSeverityFilter] = React.useState([]);
  const [dateRange, setDateRange] = React.useState();
  const [ipAddr, setIpAddr] = React.useState("");
  const [type, setType] = React.useState("Severity");

  const handleChange = (newValue) => {
    setSeverityFilter(newValue);
  };

  const getDataBasedOnSeverity = async () => {
    let filter = severityFilter;
    if (filter.length != 0) {
      let query = filter[0].value;
      for (let index = 1; index < filter.length; index++) {
        query = query + "&" + filter[index].value;
      }
      const response = await Axios.get(
        `http://127.0.0.1:8000/dashboard/severity/${query}/`
      );
      setData(response.data.results);
    } else {
      const response = await Axios.get(
        `http://127.0.0.1:8000/dashboard/severity/`
      );
      setData(response.data.results);
    }
  };

  const getDataBasedOnIp = async () => {
    if (ipAddr != "") {
      const response = await Axios.get(
        `http://127.0.0.1:8000/dashboard/ip/${ipAddr}/`
      );
      setData(response.data.results);
    } else {
      const response = await Axios.get(
        `http://127.0.0.1:8000/dashboard/severity/`
      );
      setData(response.data.results);
    }
  };


  const getDataBasedOnDate = async () => {
    if (dateRange.length === 2) {
      const response = await Axios.get(
        `http://127.0.0.1:8000/dashboard/date/${dateRange[0].getTime()}to${dateRange[1].getTime()}/`
      );
      setData(response.data.results);
    } else {
      const response = await Axios.get(
        `http://127.0.0.1:8000/dashboard/severity/`
      );
      setData(response.data.results);
    }
  };

  React.useEffect(() => {
    getDataBasedOnSeverity();
  }, []);
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col md="4" className="d-flex  flex-column  align-items-center">
              <input
                type="radio"
                value={type}
                onChange={() => {
                  setType("Severity");
                }}
                checked={type === "Severity"}
              />
              <span>Filtre par severity</span>
            </Col>
            <Col md="4" className="d-flex  flex-column  align-items-center">
              <input
                type="radio"
                value={type}
                onChange={() => {
                  setType("Ip");
                }}
                checked={type === "Ip"}
              />
              <span>Filtre par IP</span>
            </Col>
            <Col md="4" className="d-flex  flex-column  align-items-center">
              <input
                type="radio"
                value={type}
                onChange={() => {
                  setType("Date range");
                }}
                checked={type === "Date range"}
              />
              <span>Filtre par date</span>
            </Col>
          </Row>
          <Row className="d-flex  flex-column  align-items-center">
            {type === "Severity" ? (
              <Col md="4" sm="12">
                <h5 className="text-bold-600 my-1">Severity</h5>
                <Select
                  value={severityFilter}
                  isMulti
                  name="colors"
                  options={SeverityOptions}
                  className="React"
                  classNamePrefix="select"
                  onChange={handleChange}
                />
                <div className="d-inline-block mt-2 mb-1">
                  <Button.Ripple
                    onClick={getDataBasedOnSeverity}
                    color="primary"
                  >
                    Rechercher
                  </Button.Ripple>
                </div>
              </Col>
            ) : type === "Ip" ? (
              <Col md="4" sm="12">
                <h5 className="text-bold-600 my-1">Ip Addr</h5>
                <Input
                  value={ipAddr}
                  className="React"
                  onChange={(e) => {
                    setIpAddr(e.target.value);
                  }}
                />
                <div className="d-inline-block mt-2 mb-1">
                  <Button.Ripple onClick={getDataBasedOnIp} color="primary">
                    Rechercher
                  </Button.Ripple>
                </div>
              </Col>
            ) : (
              <Col className="mb-3" md="6" sm="12">
                <h5 className="text-bold-500">Range</h5>
                <Flatpickr
                  value={dateRange}
                  className="form-control"
                  options={{ mode: "range",enableTime: true, }}
                  onChange={(date) => {
                    setDateRange(date);
                  }}
                />
                <div className="d-inline-block mt-2 mb-1">
                  <Button.Ripple onClick={getDataBasedOnDate} color="primary">
                    Rechercher
                  </Button.Ripple>
                </div>
              </Col>
            )}
          </Row>
        </CardBody>
      </Card>
      <Row className="match-height">
        <Col sm="12">
          <DataTableCustom data={data} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Filters;
