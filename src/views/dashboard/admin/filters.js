import React from "react";
import { Row, Col, Card, Button, CardBody, CardFooterooter } from "reactstrap";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import DataTableCustom from "./dataTable";
import Select from "react-select";
import Axios from "axios";
import { getData } from "../../../redux/actions/data-list";

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
  const [dateRange, setDateRange] = React.useState(null);
  const [ipAddr, setIpAddr] = React.useState(null);

  const handleChange = (newValue) => {
    setSeverityFilter(newValue);
  };

  const getData = async (filter) => {
    if (filter) {
      const response = await Axios.get(
        `http://127.0.0.1:8000/dashboard/severity/${filter[0].value}/`
      );
      setData(response.data.results)
    } else {
        const response = await Axios.get(
            `http://127.0.0.1:8000/dashboard/severity/`
          );
          setData(response.data.results)  
    }
  };

    React.useEffect(() => {
      getData(null)
    }, []);

  return (
    <React.Fragment>
      <Card>
        <CardBody>
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
          </Col>
        </CardBody>
        <div className="d-inline-block ml-3 mb-1">
          <Button.Ripple
            onClick={() => getData(severityFilter)}
            color="primary"
          >
            Rechercher
          </Button.Ripple>
        </div>
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
