import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";
import Pagination from "../components/Pagination";
import UsersList from "../components/UsersList";
import SearchBar from "./SearchBar";
import UploadFile from "./UploadFile";

class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUsers());
  }
  render() {
    var language = window.navigator.userLanguage || window.navigator.language;
    const { users, selectedFile } = this.props;
    return (
      <div style={{ margin: 20 }}>
        <UploadFile selectedFile={selectedFile} />
        <SearchBar />
        <UsersList users={users} />
        <Pagination
          totalRecords={this.props.count}
          pageLimit={30 || 5}
          initialPage={1}
          pagesToShow={5}
        />
        <div style={{ textAlign: "center" }}>
          <span>Current language: {language}</span>
        </div>
      </div>
    );
  }
}

AsyncApp.propTypes = {
  users: PropTypes.array.isRequired,
  selectedFile: PropTypes.any.isRequired,
  count: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const users = state.users.users;
  const count = state.users.count;
  const selectedFile = state.selectedFile.selectedFile;
  return { users, count, selectedFile };
}

export default connect(mapStateToProps)(AsyncApp);
