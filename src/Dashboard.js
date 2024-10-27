import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { UserData } from "./Data";
import "chart.js/auto";
import covidLogo from "./CovidLogo.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  const [covidData, setCovidData] = useState(UserData);
  const [country, setCountry] = useState("All");

  useEffect(() => {
    const filteredData = UserData.filter(
      (option) => option.country.toLowerCase() == country?.toLowerCase()
    );
    const data = filteredData?.length == 1 ? filteredData : UserData;
    setCovidData(data);
  }, [country]);

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.country),
    datasets: [
      {
        label: "Totalcases",
        data: UserData.map((data) => data.totalCases),

        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const globalConfirmedCases = UserData.reduce(
    (previousValue, currentValue, index) =>
      previousValue + currentValue.confirmedRecoveredDeaths?.[0],
    0
  );

  const globalRecoveredCases = UserData.reduce(
    (previousValue, currentValue, index) =>
      previousValue + currentValue?.confirmedRecoveredDeaths?.[1],
    0
  );
  const globalDeathCases = UserData.reduce(
    (previousValue, currentValue, index) =>
      previousValue + currentValue?.confirmedRecoveredDeaths?.[2],
    0
  );

  const pieData = {
    labels: ["Confirmed", "Recovered", "Deaths"],
    datasets: [
      {
        label: "Total Cases",
        data:
          covidData?.length == 1
            ? covidData?.[0]?.confirmedRecoveredDeaths
            : [globalConfirmedCases, globalRecoveredCases, globalDeathCases],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const confirmedCasesData = {
    labels: ["2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Totalcases",
        data:
          covidData?.length == 1
            ? covidData?.[0]?.confirmedPerYear
            : [40650, 55040, 16560, 2130],

        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  const deathsCasesData = {
    labels: ["2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Totalcases",
        data:
          covidData?.length == 1
            ? covidData?.[0]?.deathsPerYear
            : [9100, 14500, 14500, 2300],

        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <div
        style={{
          padding: "20px 50px",
          backgroundColor: "#d3d3d361",
          position: "fixed",
          height: "100%",
          width: "200px",
        }}
      >
        <img src={covidLogo} alt="React Image" />
      </div>
      <div style={{ marginLeft: "200px" }}>
        <div>
          <div>
            <div>
              <h1>Covid Dashboard </h1>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                margin: "30px",
              }}
            >
              {" "}
              <FormControl style={{ width: "200px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select Country
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country}
                  label="Select Country"
                  onChange={(event) => {
                    setCountry(event.target.value);
                  }}
                  defaultValue={country}
                >
                  <MenuItem key={"All"} value={"All"}>
                    All
                  </MenuItem>

                  {UserData.map((option, i) => (
                    <MenuItem key={option.id} value={option.country}>
                      {option.country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginLeft: "120px",
                }}
              >
                <div>
                  <Card
                    sx={{ minWidth: 250 }}
                    style={{ backgroundColor: "#d3d3d361" }}
                  >
                    <CardContent>
                      <Typography variant="h4" component="div">
                        {covidData?.length == 1
                          ? covidData?.[0]?.confirmedRecoveredDeaths?.[0]
                          : globalConfirmedCases}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Confirmed
                      </Typography>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card
                    sx={{ minWidth: 250 }}
                    style={{ backgroundColor: "#d3d3d361" }}
                  >
                    <CardContent>
                      <Typography variant="h4" component="div">
                        {covidData?.length == 1
                          ? covidData?.[0]?.confirmedRecoveredDeaths?.[2]
                          : globalDeathCases}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Deaths
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card
                    sx={{ minWidth: 250 }}
                    style={{ backgroundColor: "#d3d3d361" }}
                  >
                    <CardContent>
                      <Typography variant="h4" component="div">
                        {covidData?.length == 1
                          ? covidData?.[0]?.confirmedRecoveredDeaths?.[1]
                          : globalRecoveredCases}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Recovered
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
                
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: "40px",
                  }}
                >
                  <div
                    style={{
                      height: "300px",
                      width: "300px",
                      margin: "25px",
                    }}
                  >
                    {" "}
                    <Pie data={pieData} />
                    <h4>
                      {" "}
                      {covidData.length == 1
                        ? covidData?.[0]?.country
                        : "All countries"}
                    </h4>
                  </div>

                  <div>
                    {" "}
                    <h4>Total active cases per year</h4>
                    <div
                      style={{
                        height: "300px",
                        width: "500px",
                        marginLeft: "140px",
                      }}
                    >
                      {" "}
                      <Line
                        data={confirmedCasesData}
                        options={{
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  height: "400px",
                  width: "500px",
                  marginLeft: "120px",
                }}
              >
                <h4>Global Total cases</h4>
                <Bar
                  data={userData}
                  options={{
                    // indexAxis: "y",
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
              <div
                style={{
                  height: "300px",
                  width: "500px",
                  marginLeft: "90px",
                }}
              >
                <h4>Total death cases per year</h4>
                <Line
                  data={deathsCasesData}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
