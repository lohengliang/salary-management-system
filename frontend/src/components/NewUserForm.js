import PropTypes from "prop-types";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import {
  addUser,
  hideAddUserModal,
  updateNewUserId,
  updateNewUserLogin,
  updateNewUserName,
  updateNewUserSalary,
} from "../actions";

class NewUserForm extends React.Component {
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
              hideAddUserModal(this.props.modalProps, this.props.modalType)
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
                value={this.props.newUserInfo.id}
                onChange={(e) =>
                  this.props.dispatch(updateNewUserId(e.target.value))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id="userLoginLabel">User Login</Form.Label>
              <Form.Control
                placeholder=""
                value={this.props.newUserInfo.login}
                onChange={(e) =>
                  this.props.dispatch(updateNewUserLogin(e.target.value))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id="userNameLabel">User Name</Form.Label>
              <Form.Control
                placeholder=""
                value={this.props.newUserInfo.name}
                onChange={(e) =>
                  this.props.dispatch(updateNewUserName(e.target.value))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id="userSalaryLabel">Salary</Form.Label>
              <Form.Control
                placeholder=""
                value={this.props.newUserInfo.salary}
                onChange={(e) =>
                  this.props.dispatch(updateNewUserSalary(e.target.value))
                }
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                this.props.dispatch(addUser());
                this.props.dispatch(
                  hideAddUserModal(this.props.modalProps, this.props.modalType)
                );
              }}
            >
              Add New User
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

NewUserForm.propTypes = {
  modalProps: PropTypes.object.isRequired,
  modalType: PropTypes.any.isRequired,
  newUserInfo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
function mapStateToProps(state, ownProps) {
  const modalProps = state.addUserModal.modalProps;
  const modalType = state.addUserModal.modalType;
  const newUserInfo = state.newUserInfo.newUser;
  return { modalProps, modalType, newUserInfo };
}

export default connect(mapStateToProps)(NewUserForm);
