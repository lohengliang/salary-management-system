import {
  UPDATE_NEW_USER_ID,
  UPDATE_NEW_USER_LOGIN,
  UPDATE_NEW_USER_NAME,
  UPDATE_NEW_USER_SALARY,
} from "../actions";

const initialState = {
  newUser: { id: "", login: "", name: "", salary: 0 },
};

const newUserInfo = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_USER_ID:
      return {
        ...state,
        newUser: {
          id: action.id,
          login: state.newUser.login,
          name: state.newUser.name,
          salary: state.newUser.salary,
        },
      };
    case UPDATE_NEW_USER_LOGIN:
      return {
        ...state,
        newUser: {
          id: state.newUser.id,
          login: action.login,
          name: state.newUser.name,
          salary: state.newUser.salary,
        },
      };
    case UPDATE_NEW_USER_NAME:
      return {
        ...state,
        newUser: {
          id: state.newUser.id,
          login: state.newUser.login,
          name: action.name,
          salary: state.newUser.salary,
        },
      };
    case UPDATE_NEW_USER_SALARY:
      return {
        ...state,
        newUser: {
          id: state.newUser.id,
          login: state.newUser.login,
          name: state.newUser.name,
          salary: action.salary,
        },
      };
    default:
      return state;
  }
};

export default newUserInfo;
