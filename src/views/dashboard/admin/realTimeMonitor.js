import React from "react";
import {
  Row,
  Col,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
} from "reactstrap";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import { w3cwebsocket } from "websocket";
import DataTableCustom from "./dataTable";
import Axios from "axios";
import { Truck } from "react-feather";

const AnalyticsDashboard = () => {
  const [data, setData] = React.useState([]);
  const [anomaly, setAnomaly] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    let client = new w3cwebsocket("ws://localhost:8000/ws/logs/");
    setLoading(false);
    client.onmessage = function (e) {
      const response = JSON.parse(e.data);
      if (response?.Anomaly) {
        setModal(true);
        setAnomaly(response.data);
      } else {
        setData(response);
      }
    };

    client.onerror = function (e) {
      console.log(e);
    };

    return () => {
      client.close();
    };
  }, []);

  const toggleModal = () => {
    setModal((prevState) => !prevState);
  };
  // const verify_anomaly = async () => {
  //   const response = await Axios.post(
  //     "http://127.0.0.1:8000/dashboard/verify_anomaly/",
  //     data
  //   );
  //   if (response.data.Anomaly === true) {
  //     setModal(true);
  //     setAnomaly(response.data);
  //   }
  // };

  const check = () => {
    setChecked((prevState) => !prevState);
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
  console.log(checked);

  return (
    <React.Fragment>
      {checked && (
        <Modal
          isOpen={modal}
          toggle={toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={toggleModal}>
            Possible flux anormale:
          </ModalHeader>
          <ModalBody>
            <li>Temps de reception: {anomaly.Receive_Time}</li>
            <li>Source IP: {anomaly.Source}</li>
            <li>Destination IP: {anomaly.Destination}</li>
            <li>Protocole: {anomaly.proto}</li>
            <li>Port: {anomaly.port}</li>
            <li>Severity: {anomaly.Severity}</li>
            <li>Evénement: {anomaly.Event_Name}</li>
            <li>Machine: {anomaly.Device}</li>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleModal}>
              Ok
            </Button>{" "}
          </ModalFooter>
        </Modal>
      )}

        <Row md="4" className="d-flex  flex-column  align-items-center">
            <input
              type="radio"
              value={checked}
              onChange={check}
              checked={checked}
            />
            <span>Activer SMART WATCH</span>
        </Row>
      <Row className="match-height">
        <Col sm="12">
          <DataTableCustom data={data} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AnalyticsDashboard;
