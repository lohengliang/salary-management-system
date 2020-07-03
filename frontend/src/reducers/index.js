import { combineReducers } from "redux";
import addUserModal from "./addUserModal";
import editUserInfo from "./editUserInfo";
import editUserModal from "./editUserModal";
import newUserInfo from "./newUserInfo";
import offset from "./offset";
import searchSalaries from "./searchSalaries";
import selectedFile from "./selectedFile";
import sortCriteria from "./sortCriteria";
import users from "./users";

export default combineReducers({
  users,
  selectedFile,
  searchSalaries,
  newUserInfo,
  addUserModal,
  editUserModal,
  editUserInfo,
  offset,
  sortCriteria,
});
