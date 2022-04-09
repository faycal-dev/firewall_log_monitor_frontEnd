import React from "react";
import { Row, Col } from "reactstrap";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import { w3cwebsocket } from "websocket";
import DataTableCustom from "./dataTable";

const AnalyticsDashboard = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    let client = new w3cwebsocket("ws://localhost:8000/ws/logs/");
    client.onmessage = function (e) {
      const response = JSON.parse(e.data);
      setData(response);
    };

    client.onerror = function (e) {
      console.log("Connection Error");
    };

    return () => {
      client.close()
    };
  }, []);

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
