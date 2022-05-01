import React from "react";
import { Row, Col, Spinner} from "reactstrap";
import "../../../assets/scss/pages/dashboard-analytics.scss";

const Stats = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    
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
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Stats;
