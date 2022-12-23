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
  const formik = useFormik({
    initialValues: {
      name: "",
      object: "",
      date: "",
      gender: "",
      nationality: "",
      ID: "",
      travels: [],
      symptoms: [],
      vaccines: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
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
    <Container>
      <div>
        <div className={styles.header}>
          <h1>MEDICAL DECLARATION FORM FOR FOREIGN ENTRY</h1>
        </div>
        <h4>Personal information:</h4>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Full name</Label>
            <Input
              id="email"
              name="name"
              placeholder="Full name..."
              onChange={formik.handleChange}
              type="name"
              value={formik.values.name}
            />
          </FormGroup>
          <Row>
            <Col lg="6">
              <FormGroup>
                <Label htmlFor="object">Object</Label>
                <Select
                  placeholder="-----Choose"
                  onChange={(value) => {
                    formik.setValues({
                      name: formik.values.name,
                      object: value.value,
                      date: formik.values.date,
                      gender: formik.values.gender,
                      nationality: formik.values.nationality,
                      ID: formik.values.ID,
                      symptoms: formik.values.symptoms,
                      vaccines: formik.values.vaccines,
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
                  onChange={formik.handleChange}
                  value={formik.values.date}
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
                    formik.setValues({
                      name: formik.values.name,
                      object: formik.values.object,
                      date: formik.values.date,
                      gender: value.value,
                      nationality: formik.values.nationality,
                      ID: formik.values.ID,
                      symptoms: formik.values.symptoms,
                      vaccines: formik.values.vaccines,
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
                    formik.setValues({
                      name: formik.values.name,
                      object: formik.values.object,
                      date: formik.values.date,
                      gender: formik.values.gender,
                      nationality: value.value,
                      ID: formik.values.ID,
                      symptoms: formik.values.symptoms,
                      vaccines: formik.values.vaccines,
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
                  value={formik.values.ID}
                  onChange={formik.handleChange}
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
                {formik.values.travels && formik.values.travels.length > 0 ? (
                  formik.values.travels.map((travel, index) => (
                    <div key={index}>
                      <FormGroup>
                        <Label for="departure">Departure</Label>
                        <Field name={`travels.${index}`} as="select">
                          <option>-----Choose</option>
                          {COUNTRIES_LIST.map((country, index) => {
                            return (
                              <option value={country.name} key={index}>
                                {country.name}
                              </option>
                            );
                          })}
                        </Field>
                      </FormGroup>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : (
                  <button type="button" onClick={() => arrayHelpers.push("")}>
                    {/* show this when user has removed all friends from the list */}
                    Add more
                  </button>
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
                  value={formik.values.province}
                  onChange={formik.handleChange}
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
                  value={formik.values.district}
                  onChange={formik.handleChange}
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
                  value={formik.values.address}
                  onChange={formik.handleChange}
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
                  value={formik.values.email}
                  onChange={formik.handleChange}
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
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
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
                  onChange={formik.handleChange}
                  name="symptoms"
                  type="checkbox"
                  value="Fiber"
                />
                <Label className={styles.ml} check>
                  &#160; Fiber
                </Label>
                <Input
                  onChange={formik.handleChange}
                  name="symptoms"
                  type="checkbox"
                  value="Fever"
                />
                <Label className={styles.ml} check>
                  &#160;Fever
                </Label>
                <Input
                  onChange={formik.handleChange}
                  name="symptoms"
                  type="checkbox"
                  value="Sore throat"
                />
                <Label className={styles.ml} check>
                  &#160;Sore throat
                </Label>
                <Input
                  onChange={formik.handleChange}
                  id="symptoms"
                  type="checkbox"
                  value="Difficulty of breathing"
                />
                <Label className={styles.ml} check>
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
                    onChange={formik.handleChange}
                    name="vaccines"
                    type="radio"
                  />
                  <Label check>None</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    onChange={formik.handleChange}
                    name="vaccines"
                    type="radio"
                    value="Astra Zenecca"
                    checked={formik.values.vaccines === "Astra Zenecca"}
                  />
                  <Label check>Astra Zenecca</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    onChange={formik.handleChange}
                    name="vaccines"
                    type="radio"
                    value="Pfizer"
                    checked={formik.values.vaccines === "Pfizer"}
                  />
                  <Label check>Pfizer</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    onChange={formik.handleChange}
                    name="vaccines"
                    type="radio"
                    value="Moderna"
                    checked={formik.values.vaccines === "Moderna"}
                  />
                  <Label check>Moderna</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    onChange={formik.handleChange}
                    name="vaccines"
                    type="radio"
                    value="Sinopharm"
                    checked={formik.values.vaccines === "Sinopharm"}
                  />
                  <Label check>Sinopharm</Label>
                </FormGroup>
              </Col>
            </Row>
          </FormGroup>

          <Button type="submit" className={styles.ml} color="success">
            Submit
          </Button>
          <Button className={styles.ml} color="danger">
            Cancel
          </Button>
          <Button className={styles.ml}>Reset</Button>
        </form>
      </div>
    </Container>
  );
};

export default Declaration;
