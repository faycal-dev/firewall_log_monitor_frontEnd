import React from "react";
import { Card, CardBody, Badge } from "reactstrap";
import DataTable from "react-data-table-component";

// const CustomHeader = (props) => {
//   return (
//     <div className="d-flex flex-wrap justify-content-between">
//       <div className="add-new">
//         <Button.Ripple color="primary">Add New</Button.Ripple>
//       </div>
//       <div className="position-relative has-icon-left mb-1">
//         <Input value={props.value} onChange={(e) => props.handleFilter(e)} />
//         <div className="form-control-position">
//           <Search size="15" />
//         </div>
//       </div>
//     </div>
//   );
// };

class DataTableCustom extends React.Component {
  state = {
    columns: [
      {
        name: "Receive Time",
        selector: "Receive_Time",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            {/* <div className="user-info text-truncate ml-xl-50 ml-0"> */}
            <span
              title={row.Receive_Time}
              className="d-block text-bold-500 text-truncate mb-0"
            >
              {row.Receive_Time}
            </span>
            {/* </div> */}
          </div>
        ),
      },
      {
        name: "Event ID",
        selector: "Event ID",
        sortable: true,
        cell: (row) => <p className="text-bold-500  mb-0">{row.Event_ID}</p>,
      },
      {
        name: "Event Type ID",
        selector: "Event Type ID",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500  mb-0">{row.Event_Type_ID}</p>
        ),
      },
      {
        name: "Severity",
        selector: "Severity",
        cell: (row) => (
          <Badge
            color={
              row.Severity === "emergencies"
                ? "danger"
                : row.Severity === "Alerts"
                ? "danger"
                : row.Severity === "critical"
                ? "light-danger"
                : row.Severity === "Errors"
                ? "light-danger"
                : row.Severity === "Warning"
                ? "warning"
                : "primary"
            }
            pill
          >
            {row.Severity}
          </Badge>
        ),
      },
      {
        name: "Event Name",
        selector: "Event_Name",
        sortable: true,
        cell: (row) => <p className="text-bold-500 mb-0">{row.Event_Name}</p>,
      },
      {
        name: "Device",
        selector: "Device",
        sortable: true,
        cell: (row) => <p className="text-bold-500 mb-0">{row.Device}</p>,
      },
      {
        name: "Source",
        selector: "Source",
        sortable: true,
        cell: (row) => <p className="text-bold-500 mb-0">{row.Source}</p>,
      },
      {
        name: "Source Service",
        selector: "Source_Service",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 mb-0">{row.Source_Service}</p>
        ),
      },
      {
        name: "Destination",
        selector: "Destination",
        sortable: true,
        cell: (row) => <p className="text-bold-500 mb-0">{row.Destination}</p>,
      },
      {
        name: "Destination Service",
        selector: "Destination_Service",
        sortable: true,
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
    ],
    //  [
    //   {
    //     Receive_Time: "3/22/22 1:44:59 PM",
    //     Severity: "Informational",
    //     Event_Type_ID: "302014",
    //     Event_Name: "Teardown TCP",
    //     Device: "SH-AVL-AEB-ASA-01",
    //     Source: "10.39.128.9",
    //     Source_Service: "tcp/61075",
    //     Destination: "Proxy01",
    //     Destination_Service: "tcp/8990",
    //     Action: "teardown",
    //     Description:
    //       "Teardown tcp connection 3038932686 for Lan-Wan:10.39.128.9/61075 to SH-AEB-LAN:10.114.66.19/8990 duration 0:01:00 bytes 8953 TCP FINs",
    //     Event_ID: 391946475587,
    //   },
    //   {
    //     Receive_Time: "3/22/22 1:44:59 PM",
    //     Severity: "Warning",
    //     Event_Type_ID: "106023",
    //     Event_Name: "Denied IP packet",
    //     Device: "SH-AVL-AEB-ASA-01",
    //     Source: "10.175.50.171",
    //     Source_Service: "udp/53302",
    //     Destination: "10.114.106.11",
    //     Destination_Service: "udp/389",
    //     Action: "deny",
    //     Description:
    //       'Deny udp src Lan-Wan:10.175.50.171/53302 dst SH-AEB-LAN:10.114.106.11/389 by access-group "WAN" [0xde05d64f, 0x0]',
    //     Event_ID: 391946475487,
    //   },
    // ],
  };

  render() {
    let { columns } = this.state;
    return (
      <Card>
        <CardBody className="rdt_Wrapper">
          <DataTable
            className="dataTable-custom"
            data={this.props.data}
            columns={columns}
            noHeader
            pagination
            paginationPerPage={50}
            onRowClicked={(e)=>{this.props.RowClicked(e)}}
            highlightOnHover
          />
        </CardBody>
      </Card>
    );
  }
}

export default DataTableCustom;
