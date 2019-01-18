import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  onDeleteClick(e) {
    this.props.deleteEducation(e.target.value);
  }
  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          {moment(edu.from).format("YYYY/MM/DD")} -{" "}
          {edu.to ? moment(edu.to).format("YYYY/MM/DD") : "Now"}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick}
            value={edu._id}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th />
            <tr />
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
