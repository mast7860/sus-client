import React from "react";
import axios from "axios";
import {
  Heading,
  FormSet,
  FormRow,
  Radio,
  Button,
  InfoCard,
  Section,
} from "@dnb/eufemia/components";

import { P } from "@dnb/eufemia/elements";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // api response
      sessionId: null,
      startDateTime: null,

      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
      answer5: null,
      answer6: null,
      answer7: null,
      answer8: null,
      answer9: null,
      answer10: null,

      grade: null,
      percentile: null,

      userSubmitted: false,
      error: false,
      errorCode: null,
      errorMessage: null,
    };

    this.SubmitForm = this.SubmitForm.bind(this);
  }

  SubmitForm(data, sessionId) {
    axios
      .post("http://localhost:8080/save", data, {
        headers: {
          sessionId: sessionId,
        },
      })
      .then((response) =>
        this.setState({
          grade: response.data.grade,
          percentile: response.data.percentile,
          userSubmitted: true,
          error: false,
        })
      )
      .catch((error) => {
        this.setState({
          error: true,
          errorCode: error.response.data.code,
          errorMessage: error.response.data.message,
        });
      });
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/token")
      .then((response) =>
        this.setState({
          sessionId: response.data.sessionId,
          startDateTime: response.data.startDateTime,
        })
      )
      .catch((error) => {
        this.setState({
          error: true,
          errorCode: error.response.data.code,
          errorMessage: error.response.data.message,
        });
      });
  }

  render() {
    const {
      startDateTime,
      grade,
      percentile,
      userSubmitted,
      error,
      errorCode,
      errorMessage,
    } = this.state;

    return (
      <>
        <Heading> System Usability Scale</Heading>

        {error && (
          <P style={{ color: "red" }}>
            {errorCode}: {errorMessage}
          </P>
        )}
        {userSubmitted && (
          <div class="dnb-core-style dnb-spacing dnb-section dnb-section--spacing">
            <Heading>Thanks for submission</Heading>
            <Heading>Grade: {grade}</Heading>
            <Heading>Percentile: {percentile}</Heading>
          </div>
        )}

        {!userSubmitted && (
          <>
            <Section spacing="large">
              <div class="dnb-core-style dnb-spacing dnb-section dnb-section--spacing">
                <InfoCard text="Instructions: For each of the following statements, select the answer which best describes your reaction " />
              </div>
              <div>
                <div>startDateTime: {startDateTime}</div>
              </div>
              <FormSet indent="true" style={{ textAlign: "center" }}>
                <FormRow no_label></FormRow>
                <FormRow
                  section_style="default"
                  top="large x-small"
                  section_spacing
                  label="I think that I would like to use this system frequently."
                >
                  <Radio.Group
                    value="one"
                    style={{ textAlign: "center" }}
                    on_change={({ value }) => {
                      this.setState({ answer1: value });
                    }}
                  >
                    <Radio label="Completely Unsatisfied" value="1" />
                    <Radio label="Unsatisfied" value="2" />
                    <Radio label="Nuetral" value="3" />
                    <Radio label="Satisfied" value="4" />
                    <Radio label="Completely Satisfied" value="5" />
                  </Radio.Group>
                </FormRow>
                <FormRow
                  section_style="default"
                  top="large x-small"
                  section_spacing
                  label="I found the system unnecessarily complex."
                >
                  <Radio.Group
                    value="two"
                    on_change={({ value }) => {
                      this.setState({ answer2: value });
                    }}
                  >
                    <Radio label="Completely Unsatisfied" value="1" />
                    <Radio label="Unsatisfied" value="2" />
                    <Radio label="Nuetral" value="3" />
                    <Radio label="Satisfied" value="4" />
                    <Radio label="Completely Satisfied" value="5" />
                  </Radio.Group>
                </FormRow>
                <FormRow
                  section_style="default"
                  top="large x-small"
                  section_spacing
                  label="I thought the system was easy to use."
                >
                  <Radio.Group
                    value="three"
                    on_change={({ value }) => {
                      this.setState({ answer3: value });
                    }}
                  >
                    <Radio label="Completely Unsatisfied" value="1" />
                    <Radio label="Unsatisfied" value="2" />
                    <Radio label="Nuetral" value="3" />
                    <Radio label="Satisfied" value="4" />
                    <Radio label="Completely Satisfied" value="5" />
                  </Radio.Group>
                </FormRow>
                <FormRow
                  section_style="default"
                  top="large x-small"
                  section_spacing
                  label="I think that I would need the support of a technical person to be able to use this system."
                >
                  <Radio.Group
                    value="four"
                    on_change={({ value }) => {
                      this.setState({ answer4: value });
                    }}
                  >
                    <Radio label="Completely Unsatisfied" value="1" />
                    <Radio label="Unsatisfied" value="2" />
                    <Radio label="Nuetral" value="3" />
                    <Radio label="Satisfied" value="4" />
                    <Radio label="Completely Satisfied" value="5" />
                  </Radio.Group>
                </FormRow>
                <FormRow
                  section_style="default"
                  top="large x-small"
                  section_spacing
                  label="I found the various functions in this system were well integrated."
                >
                  <Radio.Group
                    value="five"
                    on_change={({ value }) => {
                      this.setState({ answer5: value });
                    }}
                  >
                    <Radio label="Completely Unsatisfied" value="1" />
                    <Radio label="Unsatisfied" value="2" />
                    <Radio label="Nuetral" value="3" />
                    <Radio label="Satisfied" value="4" />
                    <Radio label="Completely Satisfied" value="5" />
                  </Radio.Group>
                </FormRow>
                <FormRow
                  section_style="default"
                  top="large x-small"
                  section_spacing
                  label="I thought there was too much inconsistency in this system."
                >
                  <Radio.Group
                    value="six"
                    on_change={({ value }) => {
                      this.setState({ answer6: value });
                    }}
                  >
                    <Radio label="Completely Unsatisfied" value="1" />
                    <Radio label="Unsatisfied" value="2" />
                    <Radio label="Nuetral" value="3" />
                    <Radio label="Satisfied" value="4" />
                    <Radio label="Completely Satisfied" value="5" />
                  </Radio.Group>
                </FormRow>
                <FormRow
                  section_style="default"
                  top="large x-small"
                  section_spacing
                  label="I would imagine that most people would learn to use this system very quickly."
                >
                  <Radio.Group
                    value="seven"
                    on_change={({ value }) => {
                      this.setState({ answer7: value });
                    }}
                  >
                    <Radio label="Completely Unsatisfied" value="1" />
                    <Radio label="Unsatisfied" value="2" />
                    <Radio label="Nuetral" value="3" />
                    <Radio label="Satisfied" value="4" />
                    <Radio label="Completely Satisfied" value="5" />
                  </Radio.Group>
                </FormRow>
                <FormRow
                  section_style="default"
                  top="large x-small"
                  section_spacing
                  label="I found the system very cumbersome to use."
                >
                  <Radio.Group
                    value="eight"
                    on_change={({ value }) => {
                      this.setState({ answer8: value });
                    }}
                  >
                    <Radio label="Completely Unsatisfied" value="1" />
                    <Radio label="Unsatisfied" value="2" />
                    <Radio label="Nuetral" value="3" />
                    <Radio label="Satisfied" value="4" />
                    <Radio label="Completely Satisfied" value="5" />
                  </Radio.Group>
                </FormRow>
                <FormRow
                  section_style="default"
                  top="large x-small"
                  section_spacing
                  label="I felt very confident using the system."
                >
                  <Radio.Group
                    value="nine"
                    on_change={({ value }) => {
                      this.setState({ answer9: value });
                    }}
                  >
                    <Radio label="Completely Unsatisfied" value="1" />
                    <Radio label="Unsatisfied" value="2" />
                    <Radio label="Nuetral" value="3" />
                    <Radio label="Satisfied" value="4" />
                    <Radio label="Completely Satisfied" value="5" />
                  </Radio.Group>
                </FormRow>
                <FormRow
                  section_style="default"
                  top="large x-small"
                  section_spacing
                  label="I needed to learn a lot of things before I could get going with this system."
                >
                  <Radio.Group
                    value="ten"
                    on_change={({ value }) => {
                      this.setState({ answer10: value });
                    }}
                  >
                    <Radio label="Completely Unsatisfied" value="1" />
                    <Radio label="Unsatisfied" value="2" />
                    <Radio label="Nuetral" value="3" />
                    <Radio label="Satisfied" value="4" />
                    <Radio label="Completely Satisfied" value="5" />
                  </Radio.Group>
                </FormRow>
                <FormRow section_style="default" top="large x-small">
                  <Button
                    text="Compute"
                    on_click={() => {
                      const sessionId = this.state.sessionId;

                      const data = {
                        usabilityResponses: [
                          {
                            questionNumber: 1,
                            score: this.state.answer1,
                          },
                          {
                            questionNumber: 2,
                            score: this.state.answer2,
                          },
                          {
                            questionNumber: 3,
                            score: this.state.answer3,
                          },
                          {
                            questionNumber: 4,
                            score: this.state.answer4,
                          },
                          {
                            questionNumber: 5,
                            score: this.state.answer5,
                          },
                          {
                            questionNumber: 6,
                            score: this.state.answer6,
                          },
                          {
                            questionNumber: 7,
                            score: this.state.answer7,
                          },
                          {
                            questionNumber: 8,
                            score: this.state.answer8,
                          },
                          {
                            questionNumber: 9,
                            score: this.state.answer9,
                          },
                          {
                            questionNumber: 10,
                            score: this.state.answer10,
                          },
                        ],
                      };
                      this.SubmitForm(data, sessionId);
                    }}
                    size="large"
                    left
                  />
                </FormRow>
              </FormSet>
            </Section>
          </>
        )}
      </>
    );
  }
}

export { Home };
