import React from "react";
import { Row, Col, Spinner} from "reactstrap";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import { w3cwebsocket } from "websocket";
import DataTableCustom from "./dataTable";

const AnalyticsDashboard = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    let client = new w3cwebsocket("ws://localhost:8000/ws/logs/");
    setLoading(false);
    client.onmessage = function (e) {
      const response = JSON.parse(e.data);
      setData(response);
    };

    client.onerror = function (e) {
      console.log("Connection Error");
    };

    return () => {
      client.close();
    };
  }, []);

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
        <Spinner type="grow" color="primary" size="lg"/>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Row className="match-height">
        <Col sm="12">
          <DataTableCustom data={data} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AnalyticsDashboard;
