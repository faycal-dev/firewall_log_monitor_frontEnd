import React from "react";
import { CardBody, Card, Spinner } from "reactstrap";
import Axios from "axios";
import DataTable from "react-data-table-component";
import { Eye } from "react-feather";

const History = (props) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const COLUMNS = [
    {
      name: "Date",
      selector: "Date",
      sortable: true,
      minWidth: "150px",
      cell: (row) => (
        <p className="text-bold-500 mb-0">
          {new Date(row.date).toLocaleString()}
        </p>
      ),
    },
    {
      name: "Titre",
      selector: "Titre",
      sortable: true,
      minWidth: "150px",
      cell: (row) => <p className="text-bold-500 mb-0">{row.title}</p>,
    },
    {
      name: "Actions",
      selector: "Actions",
      sortable: false,
      minWidth: "150px",
      cell: (row) => (
        <Eye
          size="20"
          onClick={() => {
            props.history.push("/Detail", {data : row});
          }}
        />
      ),
    },
  ];

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(
        "http://127.0.0.1:8000/dashboard/get_saved_logs/"
      );
      setData(response.data.results);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner type="grow" color="primary" size="lg" />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody className="rdt_Wrapper">
          <DataTable
            className="dataTable-custom"
            data={data.reverse()}
            columns={COLUMNS}
            noHeader
            pagination
            paginationPerPage={10}
            onRowClicked={(e) => {
              props.history.push("/Detail", { data: e });
            }}
            highlightOnHover
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default History;
