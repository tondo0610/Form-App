import React, { useState } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  Col,
} from "reactstrap";
import { DatePicker } from "reactstrap-date-picker";
import COUNTRIES_LIST from "./countries.json";
import VIETNAM_PROVINCE_DISTRICT from "./vietnam-province-district.json";
import styles from "./styles.module.css";
import { Formik, useFormik, Field, Form, FieldArray } from "formik";
import Select from "react-select";
import { FormFloating } from "react-bootstrap";

const Declaration = () => {
  const updatedCountries = COUNTRIES_LIST.map((country) => ({
    label: country.name,
    value: country.name,
  }));
  const objects = [
    { value: "Expert", label: "Expert" },
    { value: "Vietnamese", label: "Vietnamese" },
    { value: "International Student", label: "International Student" },
    { value: "Other", label: "Other" },
  ];
  const genders = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  return (
    <Formik
      initialValues={{
        name: "",
        object: "",
        date: "",
        gender: "",
        nationality: "",
        ID: "",
        travels: [
          {
            departure: "",
            departure_date: "",
          },
        ],
        symptoms: [],
        vaccines: "",
      }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(props) => (
        <Container>
          <div>
            <div className={styles.header}>
              <h1>MEDICAL DECLARATION FORM FOR FOREIGN ENTRY</h1>
            </div>
            <h4>Personal information:</h4>
            <form onSubmit={props.handleSubmit}>
              <FormGroup>
                <Label htmlFor="email">Full name</Label>
                <Input
                  id="email"
                  name="name"
                  placeholder="Full name..."
                  onChange={props.handleChange}
                  type="name"
                  value={props.values.name}
                />
              </FormGroup>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <Label htmlFor="object">Object</Label>
                    <Select
                      placeholder="-----Choose"
                      onChange={(value) => {
                        props.setValues({
                          name: props.values.name,
                          object: value.value,
                          date: props.values.date,
                          gender: props.values.gender,
                          nationality: props.values.nationality,
                          ID: props.values.ID,
                          symptoms: props.values.symptoms,
                          vaccines: props.values.vaccines,
                        });
                      }}
                      options={objects}
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <FormGroup>
                    <Label for="birthday">Birthday:</Label>
                    <Input
                      onChange={props.handleChange}
                      value={props.values.date}
                      name="date"
                      id="date"
                      type="date"
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <FormGroup>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      placeholder="-----Choose"
                      onChange={(value) => {
                        props.setValues({
                          name: props.values.name,
                          object: props.values.object,
                          date: props.values.date,
                          gender: value.value,
                          nationality: props.values.nationality,
                          ID: props.values.ID,
                          symptoms: props.values.symptoms,
                          vaccines: props.values.vaccines,
                        });
                      }}
                      options={genders}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <Label for="nationality">Nationality</Label>
                    <Select
                      placeholder="-----Choose"
                      onChange={(value) => {
                        props.setValues({
                          name: props.values.name,
                          object: props.values.object,
                          date: props.values.date,
                          gender: props.values.gender,
                          nationality: value.value,
                          ID: props.values.ID,
                          symptoms: props.values.symptoms,
                          vaccines: props.values.vaccines,
                        });
                      }}
                      options={updatedCountries}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Label for="ID">Nation ID or Passport ID</Label>
                    <Input
                      value={props.values.ID}
                      onChange={props.handleChange}
                      id="ID"
                      name="ID"
                      placeholder="Nation ID or Passport ID..."
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <h4>Travel:</h4>
              <h6>Do you travel in the last 14 days ?</h6>

              <FieldArray
                name="travels"
                render={(arrayHelpers) => (
                  <div>
                    {props.values.travels && props.values.travels.length > 0 ? (
                      props.values.travels.map((travel, index) => (
                        <div key={index}>
                          <FormGroup>
                            <Row>
                              <Col>
                                {" "}
                                <FormGroup>
                                  <Label for="departure">Departure</Label>
                                  <Field
                                    className={"form-control"}
                                    name={`travels.${index}.departure`}
                                    as="select"
                                  >
                                    <option>-----Choose</option>
                                    {COUNTRIES_LIST.map((country, index) => {
                                      return (
                                        <option
                                          value={country.name}
                                          key={index}
                                        >
                                          {country.name}
                                        </option>
                                      );
                                    })}
                                  </Field>
                                </FormGroup>
                              </Col>
                              <Col>
                                {" "}
                                <FormGroup>
                                  <Label for="birthday">Departure Date:</Label>
                                  <Input
                                    name={`travels.${index}.departure_date`}
                                    type="date"
                                  ></Input>
                                </FormGroup>
                              </Col>
                            </Row>

                            <Button
                              color="warning"
                              className={styles.mr}
                              type="button"
                              onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                            >
                              Add more
                            </Button>
                            <Button
                              color="danger"
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                              Delete
                            </Button>
                          </FormGroup>
                        </div>
                      ))
                    ) : (
                      <Button
                        type="button"
                        color="warning"
                        onClick={() => arrayHelpers.push("")}
                      >
                        {/* show this when user has removed all friends from the list */}
                        Add more
                      </Button>
                    )}
                  </div>
                )}
              />

              <h4>Contact:</h4>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <Label for="province">Province</Label>
                    <Input
                      value={props.values.province}
                      onChange={props.handleChange}
                      id="province"
                      name="province"
                      type="select"
                    >
                      <option>-----Choose</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Label for="district">District</Label>
                    <Input
                      value={props.values.district}
                      onChange={props.handleChange}
                      id="district"
                      name="district"
                      type="select"
                    >
                      <option>-----Choose</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <Label for="address">Address</Label>
                    <Input
                      value={props.values.address}
                      onChange={props.handleChange}
                      id="address"
                      name="address"
                      placeholder="Address..."
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      value={props.values.email}
                      onChange={props.handleChange}
                      id="email"
                      name="email"
                      placeholder="Email..."
                      type="email"
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <FormGroup>
                    <Label for="mobile">Mobile</Label>
                    <Input
                      value={props.values.mobile}
                      onChange={props.handleChange}
                      id="mobile"
                      name="mobile"
                      placeholder="Mobile..."
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <h4>Symptoms:</h4>
              <FormGroup>
                <Row>
                  <Col lg="6">
                    <Label>Do you have any following symptoms?:</Label>
                  </Col>

                  <Col lg="6">
                    <Input
                      onChange={props.handleChange}
                      name="symptoms"
                      type="checkbox"
                      value="Fiber"
                    />
                    <Label className={styles.mr} check>
                      &#160; Fiber
                    </Label>
                    <Input
                      onChange={props.handleChange}
                      name="symptoms"
                      type="checkbox"
                      value="Fever"
                    />
                    <Label className={styles.mr} check>
                      &#160;Fever
                    </Label>
                    <Input
                      onChange={props.handleChange}
                      name="symptoms"
                      type="checkbox"
                      value="Sore throat"
                    />
                    <Label className={styles.mr} check>
                      &#160;Sore throat
                    </Label>
                    <Input
                      onChange={props.handleChange}
                      id="symptoms"
                      type="checkbox"
                      value="Difficulty of breathing"
                    />
                    <Label className={styles.mr} check>
                      &#160;Difficulty of breathing
                    </Label>
                  </Col>
                </Row>
              </FormGroup>

              <FormGroup tag="fieldset">
                <h4>Vaccines:</h4>
                <Row>
                  <Col lg="6">
                    <Label>Which one would you like to vaccinate ?:</Label>
                  </Col>
                  <Col lg="6">
                    <FormGroup check>
                      <Input
                        onChange={props.handleChange}
                        name="vaccines"
                        type="radio"
                      />
                      <Label check>None</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        onChange={props.handleChange}
                        name="vaccines"
                        type="radio"
                        value="Astra Zenecca"
                        checked={props.values.vaccines === "Astra Zenecca"}
                      />
                      <Label check>Astra Zenecca</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        onChange={props.handleChange}
                        name="vaccines"
                        type="radio"
                        value="Pfizer"
                        checked={props.values.vaccines === "Pfizer"}
                      />
                      <Label check>Pfizer</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        onChange={props.handleChange}
                        name="vaccines"
                        type="radio"
                        value="Moderna"
                        checked={props.values.vaccines === "Moderna"}
                      />
                      <Label check>Moderna</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        onChange={props.handleChange}
                        name="vaccines"
                        type="radio"
                        value="Sinopharm"
                        checked={props.values.vaccines === "Sinopharm"}
                      />
                      <Label check>Sinopharm</Label>
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>

              <Button type="submit" className={styles.mr} color="success">
                Submit
              </Button>
              <Button className={styles.mr} color="danger">
                Cancel
              </Button>
              <Button className={styles.mr}>Reset</Button>
            </form>
          </div>
        </Container>
      )}
    </Formik>
  );
};

export default Declaration;
