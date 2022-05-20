import React from "react";
import { Card, CardBody, Badge, Input, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import { Search, SkipBack } from "react-feather";

const CustomHeader = (props) => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple color="primary" onClick={props.back}>
          {" "}
          <SkipBack size="15" className="mr-1" />
          Retour
        </Button.Ripple>
      </div>
      <div
        style={{ width: "40%" }}
        className="position-relative has-icon-left mb-1"
      >
        <Input
          placeholder="Chercher par ip ou action ou service"
          value={props.value}
          onChange={(e) => props.handleFilter(e)}
        />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  );
};

const Matrice = (props) => {
  const [data, setData] = React.useState(props.location.state.data.data);
  const [filteredData, setFilteredData] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [groupeByValue, setGroupeByValue] = React.useState(props.location.state.data.groupeByValue);
  const COLUMNS = [
    {
      name:
        groupeByValue === "Source"
          ? "Source user ip group"
          : groupeByValue === "Destination"
          ? "Destination user ip group"
          : "Destination service",
      selector: "source_client_group",
      sortable: true,
      minWidth: "150px",
      cell: (row) => <p className="text-bold-500 mb-0">{row.key[0]}</p>,
    },
    {
      name:
        groupeByValue === "Source"
          ? "Destination user ip group"
          : "Source user ip group",

      selector: "destination_client_group",
      sortable: true,
      minWidth: "150px",
      cell: (row) => <p className="text-bold-500 mb-0">{row.key[1]}</p>,
    },
    {
      name:
        groupeByValue === "Source"
          ? "Destination service"
          : groupeByValue === "Destination"
          ? "Destination service"
          : "Destination user ip group",

      selector: "Destination_Service",
      minWidth: "150px",
      cell: (row) => <p className="text-bold-500 mb-0">{row.key[2]}</p>,
    },
    {
      name: "Action",
      selector: "Action",
      minWidth: "150px",
      cell: (row) => (
        <Badge
          color={
            row.key[3] === "accept" ||
            row.key[3] === "successful" ||
            row.key[3] === "built"
              ? "success"
              : row.key[3] === "teardown"
              ? "warning"
              : "danger"
          }
          pill
        >
          {row.key[3]}
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
            row.doc_count < 20 &&
            (row.key[3] === "accept" || row.key[3] === "successful")
              ? "danger"
              : row.doc_count > 500 &&
                (row.key[3] === "deny" || row.key[3] === "failed")
              ? "warning"
              : "success"
          }
          pill
        >
          {row.doc_count}
        </Badge>
      ),
    },
  ];

  const handleFilter = (e) => {
    let value = e.target.value;
    let DATA = data;
    let filtered = filteredData;

    setValue(value);

    if (value.length) {
      filtered = DATA.filter((item) => {
        let startsWithCondition =
          item.key[0].toLowerCase().startsWith(value.toLowerCase()) ||
          item.key[1].toLowerCase().startsWith(value.toLowerCase()) ||
          item.key[2].toLowerCase().startsWith(value.toLowerCase()) ||
          item.key[3].toLowerCase().startsWith(value.toLowerCase());
        let includesCondition =
          item.key[0].toLowerCase().includes(value.toLowerCase()) ||
          item.key[1].toLowerCase().includes(value.toLowerCase()) ||
          item.key[2].toLowerCase().includes(value.toLowerCase()) ||
          item.key[3].toLowerCase().includes(value.toLowerCase());

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
            <CustomHeader
              value={value}
              handleFilter={handleFilter}
              back={() => {
                props.history.goBack();
              }}
            />
          }
        />
      </CardBody>
    </Card>
  );
};

export default Matrice;
