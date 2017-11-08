import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(({ label, name }, index) => (
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
        <form
          onSubmit={this.props.handleSubmit(values => {
            this.props.onSurveySubmit();
          })}
        >
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
  formFields.forEach(({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });
  return errors;
}

export default reduxForm({
  validate,
  form: "SurveyForm",
  destroyOnUnmount: false
})(SurveyForm);
