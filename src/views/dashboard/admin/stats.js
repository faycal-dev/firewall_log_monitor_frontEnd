import React from "react";
import { Row, Col, Spinner, Badge } from "reactstrap";
import PersoCard from "./statisticCard";
import BarCharts from "./batChart";
import { getData } from "../../../redux/actions/data-list";
import Axios from "axios";

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
  const [Actions, setActions] = React.useState({});
  const [destination, setDestination] = React.useState({});
  const [source, setSource] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await Axios.get(
        "http://127.0.0.1:8000/dashboard/stats/"
      );
      let RoundedActions = {};
      const ResponseActions = JSON.parse(response.data.Actions);
      Object.entries(ResponseActions).forEach((item) => {
        RoundedActions[item[0]] = (item[1] * 100) / 100000;
      });

      setActions(RoundedActions);
      setSource(JSON.parse(response.data.source));
      setDestination(JSON.parse(response.data.destination));
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
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

  return (
    <React.Fragment>
      <Row>
        <Col lg="4" sm="12">
          <PersoCard
            colorsName={["primary", "warning", "danger", "success"]}
            colors={[$primary, $warning, $danger, $success]}
            gradientToColors={[
              $primary_light,
              $warning_light,
              $danger_light,
              $success,
            ]}
            labels={Object.keys(Actions)}
            series={Object.values(Actions)}
            title="Actions"
          />
        </Col>
        <Col lg="8" sm="12">
          <BarCharts
            labels={Object.keys(source)}
            data={Object.values(source)}
            title1="Les groupes d'utilisateurs les plus actif"
            title2="les derniers 100 000 logs"
          />

          <BarCharts
            labels={Object.keys(destination)}
            data={Object.values(destination)}
            title1="Les destinations les plus solliciter"
            title2="les derniers 100 000 logs"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Stats;
