import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = formFields.map(({ label, name }, index) => {
    return (
      <div key={index}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  console.log(formValues);
  return (
    <div>
      <h5>Please review your form entries</h5>
      {reviewFields}
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        className="green right btn-flat"
        onClick={() => submitSurvey(formValues, history)}
      >
        Submit
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.SurveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
