import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
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
import Select from "react-select";
import { FormFloating } from "react-bootstrap";

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
const Test = () => {
  const updatedCountries = COUNTRIES_LIST.map((country) => ({
    label: country.name,
    value: country.name,
  }));
  return (
    <div>
      <h1>Friend List</h1>
      <Formik
        // initialValues={{ friends: ["jared", "ian", "brent"] }}
        initialValues={{ travels: [] }}
        onSubmit={(values) =>
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500)
        }
        render={({ values }) => (
          <Form>
            <FieldArray
              name="travels"
              render={(arrayHelpers) => (
                <div>
                  {values.travels && values.travels.length > 0 ? (
                    values.travels.map((friend, index) => (
                      <div key={index}>
                        <FormGroup>
                          <Label for="nationality">Nationality</Label>
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
                        <Button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </Button>
                        <Button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                        >
                          +
                        </Button>
                      </div>
                    ))
                  ) : (
                    <Button type="button" onClick={() => arrayHelpers.push("")}>
                      {/* show this when user has removed all friends from the list */}
                      Add a friend
                    </Button>
                  )}
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      />
    </div>
  );
};
export default Test;
