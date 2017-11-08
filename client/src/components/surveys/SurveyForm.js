import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";

const FIELDS = [
  {
    label: "Survey Title",
    name: "title",
    noValueError: "Please enter a value"
  },
  {
    label: "Email Subject",
    name: "subject",
    noValueError: "Please enter a value"
  },
  {
    label: "Email Body",
    name: "body",
    noValueError: "Please enter a value"
  },
  {
    label: "Recipients",
    name: "recipients",
    noValueError: "Please enter a value"
  }
];

class SurveyForm extends Component {
  renderFields() {
    return FIELDS.map(({ label, name }, index) => (
      <Field
        type="input"
        key={index}
        component={SurveyField}
        name={name}
        label={label}
      />
    ));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => {this.props.onSurveySubmit()})}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Submit
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || "");
  FIELDS.forEach(({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });
  return errors;
}

export default reduxForm({ validate, form: "SurveyForm" })(SurveyForm);
