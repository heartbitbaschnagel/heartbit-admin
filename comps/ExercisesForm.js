import React from "react";
import { Button, Col, Container, Form, FormControl, Row } from "react-bootstrap";
import ExercisesDownload from "../comps/ExercisesDownload";

class ExercisesForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  
  
  handleChange(event) {
    if (event.target.type == "checkbox") {
      this.handleCheckboxChange(event);
    } else { 
      let value;
      if (event.target.type == "date") {
        value = event.target.value == "" ? undefined :
          event.target.value + (event.target.id === "latestCollection" ? "T23:59:59Z" : "T00:00:00Z");
      } else {
        const valueAsInt = parseInt(event.target.value)
        value = valueAsInt ? (event.target.id === "oldest" ? valueAsInt + 1 : valueAsInt) : event.target.value;
      }
      value = value == "" ? undefined : value;
      this.setState({[event.target.name]: value});
    }
  }

  handleCheckboxChange(event) {
    const nameArr = event.target.name.split("-");
    const stateKey = nameArr[0];
    let stateValue = this.state[stateKey] ? this.state[stateKey] : [];
    const boxValue = nameArr[1];
    const checked = event.target.checked;
    const index = stateValue.indexOf(boxValue);
    if (checked && index === -1) {
      stateValue.push(boxValue);
    } else if (!checked && index !== -1) {
      stateValue.splice(index, 1);
      if (stateValue.length === 0) {
        stateValue = undefined;
      }
    }
    this.setState({[stateKey]: stateValue});
  }

  handleSubmit(event) {
    event.preventDefault();
    const searchTerms = {
      variables: {
        youngest: this.state?.youngest,
        oldest: this.state?.oldest,
        lightest: this.state?.lightest,
        heaviest: this.state?.heaviest,
        email: this.state?.email,
        groupId: this.state?.groupId,
        sex: this.state?.sex,
        gender: this.state?.gender,
        race: this.state?.race,
        smoking: this.state?.smoking,
        vaping: this.state?.vaping,
        earliestCollection: this.state?.earliestCollection,
        latestCollection: this.state?.latestCollection
      }
    };
    this.props.getExercises(searchTerms);
    this.setState({lastSearchTerms: searchTerms});
  }

  render() {
    return (
      <>
        <Container className="ef-container">
          <Form className="ef" onSubmit={this.handleSubmit}>
            <Row>
              <Col md={5}>
                <Row>
                  <Col>
                    <div className="ef-age-range-container">
                      <p className="ef-age-range-label">Age Range</p>
                      <Row>
                        <FormControl 
                          name="youngest" 
                          type="number" 
                          placeholder="youngest"
                          className="ef-age-range-young" 
                          onChange={this.handleChange}
                        />
                        <div className="ef-age-range-dash">-</div>
                        <FormControl 
                          name="oldest" 
                          id="oldest"
                          type="number" 
                          placeholder="oldest"
                          className="ef-age-range-old"  
                          onChange={this.handleChange}
                        />
                      </Row>
                    </div>
                    <div className="ef-email-container">
                      <p className="ef-email-label">Email</p>
                      <FormControl 
                          name="email" 
                          placeholder="john@example.com" 
                          className="ef-email"  
                          onChange={this.handleChange}
                        />
                    </div>
                  </Col>
                  <Col>
                    <div className="ef-weight-range-container">
                      <p className="ef-weight-range-label">Weight Range</p>
                      <Row>
                        <FormControl 
                          name="lightest" 
                          type="number" 
                          placeholder="lightest" 
                          className="ef-weight-range-light"  
                          onChange={this.handleChange}
                        />
                        <div className="ef-weight-range-dash">-</div>
                        <FormControl 
                          name="heaviest" 
                          type="number" 
                          placeholder="heaviest"
                          className="ef-weight-range-heavy"  
                          onChange={this.handleChange}
                        />
                      </Row>
                    </div>
                    <div className="ef-group-container">
                      <p className="ef-group-label">Group</p>
                      <FormControl 
                          name="groupId" 
                          placeholder="Future Feature" 
                          className="ef-group"  
                          onChange={this.handleChange}
                          disabled={true}
                        />
                    </div>
                  </Col>
                </Row>
                <div className="ef-collection-range-container">
                  <p className="ef-collection-range-label">Collection Date Range</p>
                  <Row>
                    <FormControl 
                      name="earliestCollection" 
                      type="date" 
                      className="ef-collection-range-earliest"  
                      onChange={this.handleChange}
                    />
                    <div className="ef-collection-range-dash">-</div>
                    <FormControl 
                      name="latestCollection" 
                      id="latestCollection"
                      type="date" 
                      className="ef-collection-range-latest"  
                      onChange={this.handleChange}
                    />
                  </Row>
                </div>
              </Col>
              <Col md={2}>
                <div className="ef-sex-container">
                  <div className="ef-sex-label">Sex</div>
                  <Form.Check 
                    name="sex-FEMALE" 
                    type="checkbox"
                    label="Female"
                    onChange={this.handleChange}
                  />
                  <Form.Check 
                    name="sex-MALE" 
                    type="checkbox"
                    label="Male"
                    onChange={this.handleChange}
                  />
                  <Form.Check 
                    name="sex-INTERSEX" 
                    type="checkbox"
                    label="Intersex"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="ef-gender-container">
                  <div className="ef-gender-label">Gender</div>
                  <Form.Check 
                    name="gender-FEMALE" 
                    type="checkbox"
                    label="Female"
                    onChange={this.handleChange}
                  />
                  <Form.Check 
                    name="gender-MALE" 
                    type="checkbox"
                    label="Male"
                    onChange={this.handleChange}
                  />
                  <Form.Check 
                    name="gender-TRANS_FEMALE" 
                    type="checkbox"
                    label="Trans Female"
                    onChange={this.handleChange}
                  />
                  <Form.Check 
                    name="gender-TRANS_MALE" 
                    type="checkbox"
                    label="Trans Male"
                    onChange={this.handleChange}
                  />
                  <Form.Check 
                    name="gender-GENDER_NON_CONFORMING" 
                    type="checkbox"
                    label="Non Conforming"
                    onChange={this.handleChange}
                  />
                  <Form.Check 
                    name="gender-OTHER" 
                    type="checkbox"
                    label="Other"
                    onChange={this.handleChange}
                  />
                </div>
              </Col>
              <Col md={2}>
                <div className="ef-tobacco-container">
                  <div className="ef-tobacco-label">Tobacco</div>
                  <Form.Check 
                    name="smoking-CURRENT" 
                    type="checkbox"
                    label="Current"
                    onChange={this.handleChange}
                  />
                  <Form.Check 
                    name="smoking-FORMER" 
                    type="checkbox"
                    label="Former"
                    onChange={this.handleChange}
                  />
                  <Form.Check 
                    name="smoking-NEVER" 
                    type="checkbox"
                    label="Never"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="ef-vape-container">
                  <div className="ef-vape-label">Vape</div>
                  <Form.Check 
                    name="vaping-CURRENT" 
                    type="checkbox"
                    label="Current"
                    onChange={this.handleChange}
                  />
                  <Form.Check 
                    name="vaping-FORMER" 
                    type="checkbox"
                    label="Former"
                    onChange={this.handleChange}
                  />
                  <Form.Check 
                    name="vaping-NEVER" 
                    type="checkbox"
                    label="Never"
                    onChange={this.handleChange}
                  />
                </div>
              </Col>
              <Col md={3}>
                <div className="ef-race-container">
                  <div className="ef-race-label">Race</div>
                  <Form.Check 
                    name="race-ASIAN" 
                    type="checkbox"
                    label="Asian"
                    onChange={this.handleChange}
                  />
                  <Form.Check 
                    name="race-BLACK" 
                    type="checkbox"
                    label="Black or African-American"
                    onChange={this.handleChange}
                  />
                  <Form.Check 
                    name="race-NATIVE_AMERICAN" 
                    type="checkbox"
                    label="Native American / Alaska Native"
                    onChange={this.handleChange}
                  />
                  <Form.Check 
                    name="race-PACIFIC_ISLANDER" 
                    type="checkbox"
                    label="Native Hawaiian / Pacific Islander"
                    onChange={this.handleChange}
                  />
                  <Form.Check 
                    name="race-WHITE" 
                    type="checkbox"
                    label="White"
                    onChange={this.handleChange}
                  />
                </div>
                <Button className="ef-submit" variant="info" type="submit" md={3}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <ExercisesDownload lastSearchTerms={this.state?.lastSearchTerms} geData={this.props.geData} />
      </>
    )
  }
}

export default ExercisesForm;