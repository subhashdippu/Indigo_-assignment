import React, { useState } from "react";
import { Select, InputNumber, DatePicker, Button, message } from "antd";
import Results from "../Results";

export const Search = () => {
  const { Option } = Select;
  const [carrier, setCarrier] = useState("");
  const [flightNumber, setFlightNumber] = useState(0);
  const [date, setDate] = useState("");
  const [confirmed, setConfirmed] = useState({});

  const onChange = (value) => {
    setCarrier(value);
  };

  const onChangeDate = (date, dateString) => {
    setDate(dateString);
  };

  const onSearchClick = () => {
    if (!carrier || !flightNumber || !date) {
      message.error("Carrier, flightNumber, and Date are required");
      return;
    }

    let formattedDate = date.replace(/-/g, "/");
    console.log(formattedDate);
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/${carrier}/${flightNumber}/dep/${formattedDate}`,
      {
        method: "GET",
        headers: {
          appId: "06a45e66",
          appKey: "291f513576814a1cdb36e0ef38213ba9",
        },
      }
    )
      .then((data) => data.json())
      .then((finalData) => {
        console.log(finalData);
        setConfirmed(finalData);
      });
  };

  const onFlightNumChange = (value) => {
    setFlightNumber(value);
  };

  return (
    <div style={{ paddingTop: 20 }}>
      <div style={style.box}>
        <div style={{ marginLeft: 10, fontSize: 20 }}>Check Flight Status</div>
        <div style={style.searchBox}>
          <div style={style.marginOfSearchBox}>
            <h3>Airline</h3>
            <Select
              showSearch
              style={{
                width: 200,
                marginBottom: 10,
              }}
              placeholder="Select Airline"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                option.children[1].props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {" "}
              <Option key="IN" value="IN">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: 15 }}>
                    <img
                      src="data:image/png;base64,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"
                      alt="India"
                      height="20px"
                      width="20px"
                    />
                  </div>
                  <div style={{ fontSize: 18 }}>India</div>
                </div>
              </Option>
              <Option key="UN" value="UN">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: 15 }}>
                    <img
                      src="https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/united-states-flag-icon.png"
                      alt="United States"
                      height="20px"
                      width="20px"
                    />
                  </div>
                  <div style={{ fontSize: 18 }}>United States</div>
                </div>
              </Option>
              <Option key="JP" value="JP">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: 15 }}>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAhFBMVEX///+8AC27ACm5ABe7ACa4ABG4AAu7ACi5ABq4ABW6ACLot7/35Oi5ABnHQVj03OH88/X77fHsxMvaipfAGDu6AB/pvMTipa+3AAjlrrjtyc7gn6rFMU69DDHNXXDUd4bCJkS3AADDL0rSbX724OXXgY7x0tjLUWbfmaXIR13PZnfVeYitDQC1AAADnElEQVR4nO3diVbiMBSAYbuELiwtCGWRTVRQ5/3fb8qgM2jCUKBJTur/PUFyz22aJunN3R0AAAAAAAAAAAAAAAAAANjrP2ezoj1tF7PsuW+7Mdb1Zw+r+SINhEiCIEiECNLFfPUw+6mRyWcvm1DEaeR7x/wojUW6eRnkthtoWl4sIzGKvFOikYiW7Z8Ulu0qEqF/MiAfCRMKf7W13VRDil4rPReQj7CkrV7bdnMNaK9FWCkgB6FYT203WbPBWlRLkaNkEeuB7WZr1Nk9nh5W/xOVya5ju+m6vE4ueWqOhY+vthuvRWeeXBmRvWTTwFSZJtcmyUeqiMaNtavWpWOrRDzZ7kSt8l58a0RKca9BE9vOMK0hJJ6XDhszqGThbUPJP2GY2e5MPbL45qHkL7/biC+grFtfSMqgxA3IlE7F773KQUmdH1PyRV1jyadw4frbZ17PG+dYOrfdqds81TEv+S52evI2bmkIiee1xrY7dr0s0BISzwvcffls6h5fP4Ub21271r2uNCkT5d52566T3bJeck7i5tPT0/Xk7IU92927RltoDInnCRc3Obx65/Tf+QvbHbzcWN8AexC4N0kZ6U2T/ceg7S5eSnuaOJgoQ91pUibK0HYnLzPQ86HzVcutPdOlzrnJp3Bpu5uX6JtIkzJRXDrjNdaxbCLrujTKvpl4dMqH5812R6sz9Og49fBM9U9ODgJ3Pnre61+YVkvfbXe1MgMTtgN3pm2diaGQeN7ElQ2wtqnhxKEB5X5kLCYjV9Zld2ZmJ3vhznZnK1qbGmLLQXZtu7PV5ObSpEwUNzbUjc1i9xyZyW71Lth/Jdw4t1To3Ov6Lilsd7cSY187e4EbJ4mnZhZPDhxZQjG0oHQQExNi0pyYMJ7IeO/ImJ/ImMfK+N6R8V2swPqJjHU2GeuxMtbtZezvKLAPKGO/WMa5AhnnTxQ4pyQbd43ExJHFkwPOPSpwPlbGOWoFztvLTPyX4cZS7JGaSzfI3Pt/h/+8VBb8Dyjhv1EF/i+W8R+6AvUKFKhrIaP+iQJ1chSop6RA3S0Z9dkUqOOnUGcJzIbUe6y5LmgzQkL9WCXqDCvkvTo2fBpVj/qujrrlfmtluxN1mwY31rdPnFuSPo97EFRuuC9j0sz7Mkr96+5ViR53Tm0MX4j7d1S4p0mleOM+L9n2l8+9b5K8eD93P6D/s+4H/IN7JNW4b/QU7qUFAAAAAAAAAAAAAAAAAED2G10zSKAP/WHzAAAAAElFTkSuQmCC"
                      alt="Japan"
                      height="20px"
                      width="20px"
                    />
                  </div>
                  <div style={{ fontSize: 18 }}>Japan</div>
                </div>
              </Option>
              <Option key="EK" value="EK">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: 15 }}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png"
                      alt="Emirates"
                      height="20px"
                      width="20px"
                    />
                  </div>
                  <div style={{ fontSize: 18 }}>Emirates</div>
                </div>
              </Option>
            </Select>
          </div>
          <div style={style.marginOfSearchBox}>
            <h3>Flight #</h3>
            <InputNumber defaultValue={3} onChange={onFlightNumChange} />
          </div>

          <div style={style.marginOfSearchBox}>
            <h3>Select Date</h3>
            <DatePicker onChange={onChangeDate} />
          </div>
        </div>
        <Button
          type="primary"
          icon={<i className="anticon anticon-search"></i>}
          onClick={onSearchClick}
          style={{ marginLeft: 10 }}
        >
          Search
        </Button>
      </div>
      {confirmed.flightStatuses && (
        <div>
          <div style={style.resultBox}>
            <h2>Search Results</h2>
            {confirmed.flightStatuses.length > 0 ? (
              <Results
                status={confirmed.flightStatuses[0].status}
                flightData={confirmed.flightStatuses[0]}
                airportData={
                  confirmed.appendix && confirmed.appendix.airports
                    ? confirmed.appendix.airports
                    : ""
                }
                airlineData={
                  confirmed.appendix && confirmed.appendix.airlines
                    ? confirmed.appendix.airlines[0]
                    : ""
                }
              />
            ) : (
              <p>No Flight Status Found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const style = {
  resultBox: {
    borderRadius: 10,
    boxShadow:
      "0px 1px 2px 1px rgba(0,0,0,0.4),0px 0px 1px 0px rgba(0,0,0,0.4)",
    backgroundColor: "white",
    padding: 20,
    margin: "auto",
    width: 600,
    marginTop: 10,
  },
  box: {
    borderRadius: 10,
    boxShadow:
      "0px 1px 2px 1px rgba(0,0,0,0.4),0px 0px 1px 0px rgba(0,0,0,0.4)",
    backgroundColor: "white",
    padding: 20,
    margin: "auto",
    width: 600,
  },
  searchBox: {
    display: "flex",
  },
  marginOfSearchBox: {
    margin: 10,
  },
};
