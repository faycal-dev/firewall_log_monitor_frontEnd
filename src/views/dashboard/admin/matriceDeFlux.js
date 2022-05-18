import React from "react";
import {
  Spinner,
  Card,
  CardBody,
  Badge,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
} from "reactstrap";
import { Search, Settings,Download } from "react-feather";
import Select from "react-select";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import Axios from "axios";
import DataTable from "react-data-table-component";

const GroupByOptions = [
  {
    value: "Source",
    label: "Source user ip group",
    color: "#00B8D9",
    isFixed: true,
  },
  {
    value: "Destination",
    label: "Destination user ip group",
    color: "#0052CC",
    isFixed: true,
  },
  {
    value: "Destination_service",
    label: "Destination service",
    color: "#5243AA",
    isFixed: true,
  },
];

const CustomHeader = (props) => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
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
      <div className="add-new">
        <Button.Ripple color="primary" onClick={props.toggleModal}>
          {" "}
          <Settings size="15" className="mr-1" />
          Configuration
        </Button.Ripple>
        <Button.Ripple
          className="ml-1"
          color="primary"
          onClick={props.toggleModal}
        >
          {" "}
          <Download size="15" className="mr-1" />
          Sauvegarder
        </Button.Ripple>
      </div>
    </div>
  );
};

const MatriceDeFlux = () => {
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [groupeByValue, setGroupeByValue] = React.useState("Source");
  const [detailedIpDest, setDetailedIpDest] = React.useState(true);
  const [detailedIpSrc, setDetailedIpSrc] = React.useState(false);

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

  const getMatrice = async () => {
    setModal(false);
    setLoading(true);
    try {
      // const response = await Axios.get(
      //   `http://127.0.0.1:8000/dashboard/MatriceDeFlux/?GroupBy=${groupeByValue}&DetailedDest=${
      //     !detailedIpDest ? "yes" : "no"
      //   }&DetailedSrc=${!detailedIpSrc ? "yes" : "no"}`
      // );

      const response = await Axios.post(
        "http://192.168.59.52:9200/logs2/_search",
        {
          size: 0,
          aggs: {
            agg: {
              multi_terms: {
                terms: [
                  {
                    field:
                      groupeByValue === "Source"
                        ? "Source.keyword"
                        : groupeByValue === "Destination"
                        ? "Destination.keyword"
                        : "Destination_Service.keyword",
                  },
                  {
                    field:
                      groupeByValue === "Source"
                        ? "Destination.keyword"
                        : "Source.keyword",
                  },
                  {
                    field:
                      groupeByValue === "Source"
                        ? "Destination_Service.keyword"
                        : groupeByValue === "Destination"
                        ? "Destination_Service.keyword"
                        : "Destination.keyword",
                  },
                  {
                    field: "Action.keyword",
                  },
                ],
                size: 10000,
              },
            },
          },
        }
      );
      const parsedResponse = response.data.aggregations.agg.buckets;
      setData(parsedResponse);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
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
          Chargement de 100K logs cela peut prendre quelques secondes
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

  const handleChange = (newValue) => {
    if (newValue !== null) {
      setGroupeByValue(newValue.value);
    } else {
      setGroupeByValue("Source");
    }
  };

  const toggleModal = () => {
    setModal((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <Modal
        isOpen={modal}
        toggle={toggleModal}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={toggleModal}>Configuration</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="email">Groupe by:</Label>
            <Select
              value={groupeByValue}
              name="groupBy"
              options={GroupByOptions}
              className="React"
              classNamePrefix="select"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              className="ml-25"
              type="radio"
              value={detailedIpDest}
              onChange={() => {}}
              onClick={() => {
                setDetailedIpDest((prevState) => !prevState);
              }}
              checked={detailedIpDest}
            />
            <Label className="ml-2">Address destination detaillée ?</Label>
          </FormGroup>
          <FormGroup>
            <Input
              className="ml-25"
              type="radio"
              value={detailedIpSrc}
              onChange={() => {}}
              onClick={() => {
                setDetailedIpSrc((prevState) => !prevState);
              }}
              checked={detailedIpSrc}
            />
            <Label className="ml-2">Address source detaillée ?</Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={getMatrice}>
            Ok
          </Button>{" "}
        </ModalFooter>
      </Modal>
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
                toggleModal={toggleModal}
              />
            }
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default MatriceDeFlux;
