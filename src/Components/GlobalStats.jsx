import React from "react";
import axios from "axios";
import { Heading, Table, Hr, Button, DatePicker } from "@dnb/eufemia";
import { P } from "@dnb/eufemia/elements";

const PersonRow = (props) => {
  return (
    <tr className="dnb-table__tr dnb-table__tr--even">
      <td className="dnb-table__td">{props.data.grade}</td>
      <td className="dnb-table__td">{props.data.count}</td>
      <td className="dnb-table__td">{props.data.avgGradeScore}</td>
    </tr>
  );
};
//totalCount: 0
class GlobalStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalCount: null,
      percentile: null,
      grade: null,
      responseTimes: [],
      stats: [],
      error: false,
      errorCode: null,
      errorMessage: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(start_date, end_date) {
    axios
      .get("http://localhost:8080/globalStats", {
        params: { fromDate: start_date, toDate: end_date },
      })
      .then((response) =>
        this.setState({
          totalCount: response.data.totalCount,
          percentile: response.data.percentile,
          grade: response.data.grade,
          responseTimes: response.data.responseTimes,
          stats: response.data.stats,
          error: false,
        })
      )
      .catch((error) => {
        this.setState({
          totalCount: 0,
          error: true,
          errorCode: error.response.data.code,
          errorMessage: error.response.data.message,
        });
      });
  }

  componentDidMount() {
    axios.get("http://localhost:8080/globalStats").then((response) =>
      this.setState({
        totalCount: response.data.totalCount,
        percentile: response.data.percentile,
        grade: response.data.grade,
        responseTimes: response.data.responseTimes,
        stats: response.data.stats,
      })
    );
  }

  render() {
    const {
      totalCount,
      percentile,
      grade,
      stats,
      responseTimes,
      error,
      errorCode,
      errorMessage,
    } = this.state;

    let rows = stats?.map((person) => {
      return <PersonRow key={person.grade} data={person} />;
    });

    return (
      <>
        <div class="dnb-core-style dnb-spacing dnb-section dnb-section--spacing">
          <Heading> Global Statistics</Heading>
          {error && (
            <P style={{ color: "red" }}>
              {errorCode}: {errorMessage}
            </P>
          )}
          <DatePicker
            label="DatePicker:"
            start_date="2022-01-30"
            end_date="2022-02-28"
            range={true}
            show_input={true}
            on_change={({ start_date, end_date }) => {
              console.log("on_change", start_date, end_date);
            }}
            on_submit={({ start_date, end_date }) => {
              this.handleClick(start_date, end_date);
            }}
            on_cancel={({ start_date, end_date }) => {
              console.log("on_cancel", start_date, end_date);
            }}
          />
          {totalCount === 0 && (
            <div class="dnb-core-style dnb-spacing dnb-section dnb-section--spacing">
              <Heading>No Stats Available</Heading>
            </div>
          )}{" "}
          {totalCount !== 0 && (
            <>
              <Table className="dnb-table">
                <tbody>
                  <tr className="dnb-table__tr">
                    <td className="dnb-table__td">Total Number of Responses</td>
                    <td className="dnb-table__td">{totalCount}</td>
                  </tr>
                  <tr className="dnb-table__tr">
                    <td className="dnb-table__td">Average Score</td>
                    <td className="dnb-table__td">{percentile}</td>
                  </tr>
                  <tr className="dnb-table__tr">
                    <td className="dnb-table__td">Grade</td>
                    <td className="dnb-table__td">{grade}</td>
                  </tr>
                </tbody>
              </Table>
              <Hr fullscreen />
              <Table className="dnb-table">
                <thead>
                  <tr className="dnb-table__tr">
                    <th className="dnb-table__th">maximum time</th>
                    <th className="dnb-table__th">minimum time</th>
                    <th className="dnb-table__th">average time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="dnb-table__tr">
                    <td className="dnb-table__td">{responseTimes.maxTime}</td>
                    <td className="dnb-table__td">{responseTimes.minTime}</td>
                    <td className="dnb-table__td">{responseTimes.avgTime}</td>
                  </tr>
                </tbody>
              </Table>
              <Hr fullscreen />
              <Table className="dnb-table">
                <thead>
                  <tr className="dnb-table__tr">
                    <th
                      scope="col"
                      className="dnb-table__th dnb-table--sortable dnb-table--reversed"
                    >
                      <Button
                        variant="tertiary"
                        icon="arrow-down"
                        text="Grade"
                        title="Grade"
                        wrap="true"
                      />
                    </th>
                    <th className="dnb-table__th dnb-table--sortable dnb-table--active">
                      <Button
                        variant="tertiary"
                        icon="arrow-down"
                        text="Total Responses"
                        title="Total Responses"
                        wrap="true"
                      />
                    </th>
                    <th className="dnb-table__th dnb-table--sortable dnb-table--active">
                      <Button
                        variant="tertiary"
                        icon="arrow-down"
                        text="Average Percentile"
                        title="Average Percentile"
                        wrap="true"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </>
          )}
        </div>
      </>
    );
  }
}

export { GlobalStats };
