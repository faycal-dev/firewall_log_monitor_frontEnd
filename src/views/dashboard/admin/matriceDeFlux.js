import React from "react";
import { Spinner, Card, CardBody, Badge, Button, Input } from "reactstrap";
import { Search } from "react-feather";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import Axios from "axios";
import DataTable from "react-data-table-component";

const COLUMNS = [
  {
    name: "Source user ip group",
    selector: "source_client_group",
    sortable: true,
    minWidth: "150px",
    cell: (row) => (
      <p className="text-bold-500 mb-0">{row.source_client_group}</p>
    ),
  },
  {
    name: "Destination user ip group",
    selector: "destination_client_group",
    sortable: true,
    minWidth: "150px",
    cell: (row) => (
      <p className="text-bold-500 mb-0">{row.destination_client_group}</p>
    ),
  },
  {
    name: "Destination service",
    selector: "Destination_Service",
    minWidth: "150px",
    cell: (row) => (
      <p className="text-bold-500 mb-0">{row.Destination_Service}</p>
    ),
  },
  {
    name: "Action",
    selector: "Action",
    minWidth: "150px",
    cell: (row) => (
      <Badge
        color={
          row.Action === "accept" ||
          row.Action === "successful" ||
          row.Action === "built"
            ? "success"
            : row.Action === "teardown"
            ? "warning"
            : "danger"
        }
        pill
      >
        {row.Action}
      </Badge>
    ),
  },
  {
    name: "Number of hits",
    selector: "Number_of_hits",
    sortable: true,
    // minWidth: "150px",
    cell: (row) => (
      <Badge
        color={
          row.len < 20 &&
          (row.Action === "accept" || row.Action === "successful")
            ? "danger"
            : row.len > 500 &&
              (row.Action === "deny" || row.Action === "failed")
            ? "warning"
            : "success"
        }
        pill
      >
        {row.len}
      </Badge>
    ),
  },
];

const CustomHeader = (props) => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      {/* <div className="add-new">
        <Button.Ripple color="primary">Add New</Button.Ripple>
      </div> */}
      <div style={{width:"40%"}} className="position-relative has-icon-left mb-1">
        <Input placeholder="Chercher par ip ou action ou service" value={props.value} onChange={(e) => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  );
};

const MatriceDeFlux = () => {
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const getMatrice = async () => {
    setLoading(true);
    const response = await Axios.get(
      "http://127.0.0.1:8000/dashboard/MatriceDeFlux/aaa"
    );
    const parsedResponse = JSON.parse(response.data);
    setData(parsedResponse);
    setLoading(false);
  };

  React.useEffect(() => {
    getMatrice();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner type="grow" color="primary" size="lg" />
        <Badge style={{ marginTop: 30, padding: 10 }} color="primary" pill>
          Téléchargement de 100K logs cela peut prendre quelque secondes
        </Badge>
      </div>
    );
  }

  const handleFilter = (e) => {
    let value = e.target.value;
    let DATA = data;
    let filtered = filteredData;

    setValue(value);

    if (value.length) {
        filtered = DATA.filter((item) => {
        let startsWithCondition =
          item.source_client_group
            .toLowerCase()
            .startsWith(value.toLowerCase()) ||
          item.destination_client_group
            .toLowerCase()
            .startsWith(value.toLowerCase()) ||
          item.Action.toLowerCase().startsWith(value.toLowerCase()) ||
          item.Destination_Service.toLowerCase().startsWith(
            value.toLowerCase()
          );
        let includesCondition =
          item.source_client_group
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          item.destination_client_group
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          item.Action.toLowerCase().includes(value.toLowerCase()) ||
          item.Destination_Service.toLowerCase().includes(value.toLowerCase());

        if (startsWithCondition) {
          return startsWithCondition;
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition;
        } else return null;
      });
      setFilteredData(filtered);
    }
  };

  return (
    <React.Fragment>
      <Card>
        <CardBody className="rdt_Wrapper">
          <DataTable
            className="dataTable-custom"
            data={value.length ? filteredData : data}
            columns={COLUMNS}
            noHeader
            pagination
            subHeader
            paginationPerPage={50}
            subHeaderComponent={
              <CustomHeader value={value} handleFilter={handleFilter} />
            }
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default MatriceDeFlux;
