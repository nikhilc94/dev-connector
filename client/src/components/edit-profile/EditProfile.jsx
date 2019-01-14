import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/isEmpty";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubUsername: "",
      bio: "",
      twitter: "",
      facebook: "",
      youtube: "",
      linkedin: "",
      instagram: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      profile.social = !isEmpty(profile.social) ? profile.social : {};

      this.setState({
        handle: profile.handle,
        company: !isEmpty(profile.company) ? profile.company : "",
        website: !isEmpty(profile.website) ? profile.website : "",
        location: !isEmpty(profile.location) ? profile.location : "",
        status: profile.status,
        skills: profile.skills.join(","),
        githubUsername: !isEmpty(profile.githubUsername)
          ? profile.githubUsername
          : "",
        bio: !isEmpty(profile.bio) ? profile.bio : "",
        twitter: !isEmpty(profile.social.twitter) ? profile.social.twitter : "",
        facebook: !isEmpty(profile.social.facebook)
          ? profile.social.facebook
          : "",
        youtube: !isEmpty(profile.social.youtube) ? profile.social.youtube : "",
        linkedin: !isEmpty(profile.social.linkedin)
          ? profile.social.linkedin
          : "",
        instagram: !isEmpty(profile.social.instagram)
          ? profile.social.instagram
          : ""
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createProfile(
      {
        handle: this.state.handle,
        company: this.state.company,
        website: this.state.website,
        location: this.state.location,
        status: this.state.status,
        skills: this.state.skills,
        githubUsername: this.state.githubUsername,
        bio: this.state.bio,
        twitter: this.state.twitter,
        facebook: this.state.facebook,
        youtube: this.state.youtube,
        linkedin: this.state.linkedin,
        instagram: this.state.instagram
      },
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="LinkedIn profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL."
                />

                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={[
                    { label: "* Select Professional Status", value: 0 },
                    { label: "Developer", value: "Developer" },
                    { label: "Junior Developer", value: "Junior Developer" },
                    { label: "Senior Developer", value: "Senior Developer" },
                    { label: "Manager", value: "Manager" },
                    {
                      label: "Student or Learning",
                      value: "Student or Learning"
                    },
                    {
                      label: "Instructor or Teacher",
                      value: "Instructor or Teacher"
                    },
                    { label: "Intern", value: "Intern" },
                    { label: "Other", value: "Other" }
                  ]}
                  info="Give us an idea of where you are at in your career"
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or your company one"
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Kolkata, West Bengal)"
                />

                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                                    HTML,CSS,JavaScript,Node.js)"
                />

                <TextFieldGroup
                  placeholder="GitHub username"
                  name="githubUsername"
                  value={this.state.githubUsername}
                  onChange={this.onChange}
                  error={errors.githubUsername}
                  info="If you want your latest repos and a GitHub link, include your username"
                />

                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = ({ profile, errors }) => ({ profile, errors });

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
