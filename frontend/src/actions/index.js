export const SELECT_FILE = "SELECT_FILE";
export const CLEAR_FILE = "CLEAR_FILE";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const CLEAR_USERS = "CLEAR_USERS";
export const UPDATE_MIN_SALARY = "UPDATE_MIN_SALARY";
export const UPDATE_MAX_SALARY = "UPDATE_MAX_SALARY";
export const UPDATE_NEW_USER_ID = "UPDATE_NEW_USER_ID";
export const UPDATE_NEW_USER_LOGIN = "UPDATE_NEW_USER_LOGIN";
export const UPDATE_NEW_USER_NAME = "UPDATE_NEW_USER_NAME";
export const UPDATE_NEW_USER_SALARY = "UPDATE_NEW_USER_SALARY";
export const SHOW_ADD_USER_MODAL = "SHOW_ADD_USER_MODAL";
export const HIDE_ADD_USER_MODAL = "HIDE_ADD_USER_MODAL";
export const SHOW_EDIT_USER_MODAL = "SHOW_EDIT_USER_MODAL";
export const HIDE_EDIT_USER_MODAL = "HIDE_EDIT_USER_MODAL";
export const UPDATE_EDIT_USER_ID = "UPDATE_EDIT_USER_ID";
export const UPDATE_EDIT_USER_LOGIN = "UPDATE_EDIT_USER_LOGIN";
export const UPDATE_EDIT_USER_NAME = "UPDATE_EDIT_USER_NAME";
export const UPDATE_EDIT_USER_SALARY = "UPDATE_EDIT_USER_SALARY";
export const UPDATE_OFFSET = "UPDATE_OFFSET";
export const UPDATE_SORT_CRITERIA = "UPDATE_SORT_CRITERIA";

// Get file that user selected to upload
export function selectFile(selectedFile) {
  return {
    type: SELECT_FILE,
    selectedFile,
  };
}

// Clear file that user selected to upload
export function clearFile() {
  return {
    type: CLEAR_FILE,
  };
}

// Update state with users received from backend
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

/* Fetch users */
export function fetchUsers(limit = 30) {
  return (dispatch, getState) => {
    const { minSalary, maxSalary } = getState().searchSalaries;
    const { offset } = getState().offset;
    const { sortCriteria } = getState().sortCriteria;
    return fetch(
      `http://localhost:4000/users?minsalary=${minSalary}&maxsalary=${maxSalary}&offset=${offset}&limit=${limit}&sort=${sortCriteria}`
    )
      .then((response) => response.json())
      .then((json) => dispatch(receiveUsers(json)));
  };
}

export function uploadFile(userFile) {
  return async (dispatch) => {
    if (typeof userFile.name == "string") {
      const formData = new FormData();
      formData.append("file", userFile);
      fetch("http://localhost:4000/users/upload", {
        method: "POST",
        body: formData,
      }).then((response) => {
        if (response.ok) {
          alert("Upload is successful.");
        } else {
          alert("Upload is unsuccessful.");
        }
        dispatch(clearFile());
        dispatch(fetchUsers());
      });
    }
  };
}

// Update user information
export function updateUser(offset = 0, limit = 30, sort = "+id") {
  return (dispatch, getState) => {
    const { id, login, name, salary } = getState().editUserInfo.editUser;
    const { minSalary, maxSalary } = getState().searchSalaries;
    return fetch(`http://localhost:4000/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        name,
        salary,
      }),
    }).then((response) => {
      return dispatch(fetchUsers());
    });
  };
}

// Delete user from database
export function deleteUser(
  userId,
  minSalary = 0,
  maxSalary = 4000,
  offset = 0,
  limit = 30,
  sort = "+id"
) {
  return (dispatch) => {
    fetch(`http://localhost:4000/users/${userId}`, {
      method: "DELETE",
    }).then((response) => {
      return dispatch(fetchUsers());
    });
  };
}

export function addUser(offset = 0, limit = 30, sort = "+id") {
  return (dispatch, getState) => {
    const { id, login, name, salary } = getState().newUserInfo.newUser;
    const { minSalary, maxSalary } = getState().searchSalaries;
    const { offset } = getState().offset;
    fetch(`http://localhost:4000/users/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        name,
        salary,
      }),
    }).then((response) => {
      return dispatch(fetchUsers());
    });
  };
}

export function updateMinSalary(minSalary) {
  return {
    type: UPDATE_MIN_SALARY,
    minSalary,
  };
}

export function updateMaxSalary(maxSalary) {
  return {
    type: UPDATE_MAX_SALARY,
    maxSalary,
  };
}

export function updateNewUserId(id) {
  return {
    type: UPDATE_NEW_USER_ID,
    id,
  };
}

export function updateNewUserLogin(login) {
  return {
    type: UPDATE_NEW_USER_LOGIN,
    login,
  };
}

export function updateNewUserName(name) {
  return {
    type: UPDATE_NEW_USER_NAME,
    name,
  };
}

export function updateNewUserSalary(salary) {
  return {
    type: UPDATE_NEW_USER_SALARY,
    salary,
  };
}

export function showAddUserModal(modalProps, modalType) {
  return {
    type: SHOW_ADD_USER_MODAL,
    modalProps,
    modalType,
  };
}

export function hideAddUserModal(modalProps, modalType) {
  return {
    type: HIDE_ADD_USER_MODAL,
    modalProps,
    modalType,
  };
}

export function showEditUserModal(modalProps, modalType) {
  return {
    type: SHOW_EDIT_USER_MODAL,
    modalProps,
    modalType,
  };
}

export function hideEditUserModal(modalProps, modalType) {
  return {
    type: HIDE_EDIT_USER_MODAL,
    modalProps,
    modalType,
  };
}

export function updateEditUserId(id) {
  return {
    type: UPDATE_EDIT_USER_ID,
    id,
  };
}

export function updateEditUserLogin(login) {
  return {
    type: UPDATE_EDIT_USER_LOGIN,
    login,
  };
}

export function updateEditUserName(name) {
  return {
    type: UPDATE_EDIT_USER_NAME,
    name,
  };
}

export function updateEditUserSalary(salary) {
  return {
    type: UPDATE_EDIT_USER_SALARY,
    salary,
  };
}

export function updateOffset(offset) {
  return {
    type: UPDATE_OFFSET,
    offset,
  };
}

export function updateSortCriteria(sortCriteria) {
  return {
    type: UPDATE_SORT_CRITERIA,
    sortCriteria,
  };
}
