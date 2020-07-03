import {
  UPDATE_EDIT_USER_ID,
  UPDATE_EDIT_USER_LOGIN,
  UPDATE_EDIT_USER_NAME,
  UPDATE_EDIT_USER_SALARY,
} from "../actions";

const initialState = {
  editUser: { id: "", login: "", name: "", salary: 0 },
};

const editUserInfo = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EDIT_USER_ID:
      return {
        ...state,
        editUser: {
          id: action.id,
          login: state.editUser.login,
          name: state.editUser.name,
          salary: state.editUser.salary,
        },
      };
    case UPDATE_EDIT_USER_LOGIN:
      return {
        ...state,
        editUser: {
          id: state.editUser.id,
          login: action.login,
          name: state.editUser.name,
          salary: state.editUser.salary,
        },
      };
    case UPDATE_EDIT_USER_NAME:
      return {
        ...state,
        editUser: {
          id: state.editUser.id,
          login: state.editUser.login,
          name: action.name,
          salary: state.editUser.salary,
        },
      };
    case UPDATE_EDIT_USER_SALARY:
      return {
        ...state,
        editUser: {
          id: state.editUser.id,
          login: state.editUser.login,
          name: state.editUser.name,
          salary: action.salary,
        },
      };
    default:
      return state;
  }
};

export default editUserInfo;
