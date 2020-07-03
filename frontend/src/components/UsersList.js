import PropTypes from "prop-types";
import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchUsers, updateSortCriteria } from "../actions";
import EditUserForm from "./EditUserForm";
import NewUserForm from "./NewUserForm";
import User from "./User";

class UsersList extends Component {
  updateSortCriteria(newCriteria) {
    if (newCriteria === "id") {
      if (this.props.sortCriteria.sortCriteria === "+id") {
        this.props.dispatch(updateSortCriteria("-id"));
      } else if (this.props.sortCriteria.sortCriteria === "-id") {
        this.props.dispatch(updateSortCriteria("+id"));
      } else {
        this.props.dispatch(updateSortCriteria("+id"));
      }
    } else if (newCriteria === "login") {
      if (this.props.sortCriteria.sortCriteria === "+login") {
        this.props.dispatch(updateSortCriteria("-login"));
      } else if (this.props.sortCriteria.sortCriteria === "-login") {
        this.props.dispatch(updateSortCriteria("+login"));
      } else {
        this.props.dispatch(updateSortCriteria("+login"));
      }
    } else if (newCriteria === "name") {
      if (this.props.sortCriteria.sortCriteria === "+name") {
        this.props.dispatch(updateSortCriteria("-name"));
      } else if (this.props.sortCriteria.sortCriteria === "-name") {
        this.props.dispatch(updateSortCriteria("+name"));
      } else {
        this.props.dispatch(updateSortCriteria("+name"));
      }
    } else if (newCriteria === "salary") {
      if (this.props.sortCriteria.sortCriteria === "+salary") {
        this.props.dispatch(updateSortCriteria("-salary"));
      } else if (this.props.sortCriteria.sortCriteria === "-salary") {
        this.props.dispatch(updateSortCriteria("+salary"));
      } else {
        this.props.dispatch(updateSortCriteria("+salary"));
      }
    }
    this.props.dispatch(fetchUsers());
  }

  render() {
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th
                onClick={(e) => {
                  e.preventDefault();
                  this.updateSortCriteria("id");
                }}
              >
                Id
              </th>
              <th
                onClick={(e) => {
                  e.preventDefault();
                  this.updateSortCriteria("login");
                  var language =
                    window.navigator.userLanguage || window.navigator.language;
                  console.log(language);
                }}
              >
                Login
              </th>
              <th
                onClick={(e) => {
                  e.preventDefault();
                  this.updateSortCriteria("name");
                }}
              >
                Name
              </th>
              <th
                onClick={(e) => {
                  e.preventDefault();
                  this.updateSortCriteria("salary");
                }}
              >
                Salary
              </th>
              <th width="30%">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((user, i) => (
              <User id="userId" key={i} user={user} that={this} />
            ))}
          </tbody>
        </Table>
        <NewUserForm />
        <EditUserForm />
      </div>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  sortCriteria: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
function mapStateToProps(state, ownProps) {
  const users = state.users.users;
  const sortCriteria = state.sortCriteria;
  return { users, sortCriteria };
}

export default connect(mapStateToProps)(UsersList);
