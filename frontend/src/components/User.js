import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  deleteUser,
  showEditUserModal,
  updateEditUserId,
  updateEditUserLogin,
  updateEditUserName,
  updateEditUserSalary,
} from "../actions";

class User extends Component {
  render() {
    const { id, login, name, salary } = this.props.user;
    return (
      <tr>
        <td>{id}</td>
        <td>{login}</td>
        <td>{name}</td>
        <td>{salary}</td>
        <td>
          <Button
            size="sm"
            style={{ margin: "10px" }}
            onClick={(e) => {
              e.preventDefault();
              this.props.dispatch(deleteUser(id));
            }}
          >
            Delete User
          </Button>
          <Button
            size="sm"
            style={{ margin: "10px" }}
            onClick={(e) => {
              e.preventDefault();
              this.props.dispatch(updateEditUserId(id));
              this.props.dispatch(updateEditUserLogin(login));
              this.props.dispatch(updateEditUserName(name));
              this.props.dispatch(updateEditUserSalary(salary));
              this.props.dispatch(
                showEditUserModal(
                  {
                    open: true,
                    title: "Edit User Information",
                    closeModal: this.closeModal,
                  },
                  "Edit User Information"
                )
              );
              this.props.dispatch(
                showEditUserModal(
                  {
                    open: true,
                    title: "Edit User Information",
                    closeModal: this.closeModal,
                  },
                  "Edit User Information"
                )
              );
            }}
          >
            Edit User Information
          </Button>
        </td>
      </tr>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(User);
