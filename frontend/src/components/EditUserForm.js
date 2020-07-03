import PropTypes from "prop-types";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import {
  hideEditUserModal,
  updateEditUserLogin,
  updateEditUserName,
  updateEditUserSalary,
  updateUser,
} from "../actions";

class EditUserForm extends React.Component {
  render() {
    if (!this.props.modalProps.open) {
      return null;
    }

    return (
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "30%",
          backgroundColor: "rgba(0,0,0,0.3)",
          padding: "2px",
        }}
      >
        <Button
          style={{
            float: "right",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgba(0,0,0,0)",
            color: "rgba(0,0,0,0.3)",
          }}
          onClick={(e) => {
            e.preventDefault();
            this.props.dispatch(
              hideEditUserModal(this.props.modalProps, this.props.modalType)
            );
          }}
        >
          x
        </Button>
        <div
          style={{
            backgroundColor: "#fff",
            maxWidth: 500,
            minHeight: 300,
            margin: "0 auto",
            padding: 30,
          }}
        >
          <Form>
            <Form.Group style={{ paddingTop: 10 }}>
              <Form.Label id="userIdLabel">User Id</Form.Label>
              <Form.Control
                placeholder=""
                value={this.props.editUserInfo.id}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id="userLoginLabel">User Login</Form.Label>
              <Form.Control
                placeholder=""
                value={this.props.editUserInfo.login}
                onChange={(e) =>
                  this.props.dispatch(updateEditUserLogin(e.target.value))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id="userNameLabel">User Name</Form.Label>
              <Form.Control
                placeholder=""
                value={this.props.editUserInfo.name}
                onChange={(e) =>
                  this.props.dispatch(updateEditUserName(e.target.value))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id="userSalaryLabel">Salary</Form.Label>
              <Form.Control
                placeholder=""
                value={this.props.editUserInfo.salary}
                onChange={(e) =>
                  this.props.dispatch(updateEditUserSalary(e.target.value))
                }
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                this.props.dispatch(updateUser());
                this.props.dispatch(
                  hideEditUserModal(this.props.modalProps, this.props.modalType)
                );
              }}
            >
              Edit User Information
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

EditUserForm.propTypes = {
  modalProps: PropTypes.object.isRequired,
  modalType: PropTypes.any.isRequired,
  editUserInfo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
function mapStateToProps(state, ownProps) {
  const modalProps = state.editUserModal.modalProps;
  const modalType = state.editUserModal.modalType;
  const editUserInfo = state.editUserInfo.editUser;
  return { modalProps, modalType, editUserInfo };
}

export default connect(mapStateToProps)(EditUserForm);
