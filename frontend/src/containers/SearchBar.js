import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Col, Form, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import {
  fetchUsers,
  showAddUserModal,
  updateMaxSalary,
  updateMinSalary,
  updateOffset,
} from "../actions";

class SearchBar extends Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Row>
            <h1 className="mr-auto">Salary Management System</h1>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Text className="text-muted ml-1 mb-1">
                  Min Salary
                </Form.Text>
                <FormControl
                  type="text"
                  placeholder={this.props.minSalary}
                  onChange={(e) => {
                    e.preventDefault();
                    this.props.dispatch(
                      updateMinSalary(parseFloat(e.target.value))
                    );
                  }}
                  className=" mr-sm-2"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Text className="text-muted ml-1 mb-1">
                  Max Salary
                </Form.Text>
                <FormControl
                  type="text"
                  placeholder={this.props.maxSalary}
                  onChange={(e) => {
                    e.preventDefault();
                    this.props.dispatch(
                      updateMaxSalary(parseFloat(e.target.value))
                    );
                  }}
                  className=" mr-sm-2"
                />
              </Form.Group>
              <Form.Group>
                <Form.Text className="text-muted ml-1 mb-1">&nbsp;</Form.Text>
                <Button
                  className="ml-2"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.dispatch(updateOffset(0));
                    this.props.dispatch(fetchUsers());
                  }}
                >
                  Search
                </Button>
              </Form.Group>
              <Form.Group>
                <Form.Text className="text-muted ml-1 mb-1">&nbsp;</Form.Text>
                <Button
                  className="ml-2"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.dispatch(
                      showAddUserModal(
                        {
                          open: true,
                          title: "Add New User",
                          closeModal: this.closeModal,
                        },
                        "Add New User"
                      )
                    );
                  }}
                >
                  Add User
                </Button>
              </Form.Group>
            </Form.Row>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  minSalary: PropTypes.number.isRequired,
  maxSalary: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};
function mapStateToProps(state, ownProps) {
  const minSalary = state.searchSalaries.minSalary;
  const maxSalary = state.searchSalaries.maxSalary;
  return { minSalary, maxSalary };
}

export default connect(mapStateToProps)(SearchBar);
