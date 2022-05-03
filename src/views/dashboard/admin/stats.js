import React from "react";
import { Row, Col, Spinner } from "reactstrap";
import PersoCard from "./statisticCard";

let $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $info = "#00cfe8",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $info_light = "#1edec5",
  $stroke_color = "#b9c3cd",
  $label_color = "#e7eef7",
  $purple = "#df87f2",
  $white = "#fff";

const Stats = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {}, []);

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
      <Row>
        <Col lg="4" sm="12">
          <PersoCard
            colorsName={["primary", "warning", "success", "danger"]}
            colors={[$primary, $warning, $success, $danger]}
            gradientToColors={[
              $primary_light,
              $warning_light,
              $success,
              $danger_light,
            ]}
            labels={["built", "teardown", "accept", "deny"]}
            series={[45, 45, 20, 10]}
            title="Actions"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Stats;
