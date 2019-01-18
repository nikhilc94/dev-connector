import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  onDeleteClick(e) {
    this.props.deleteExperience(e.target.value);
  }
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          {moment(exp.from).format("YYYY/MM/DD")} -{" "}
          {exp.to ? moment(exp.to).format("YYYY/MM/DD") : "Now"}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick}
            value={exp._id}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
            <tr />
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
