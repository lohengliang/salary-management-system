import { CLEAR_USERS, RECEIVE_USERS } from "../actions";

// List of users that the UI needs to render
const initialState = {
  count: 0,
  users: [],
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        count: action.users.users.count,
        users: action.users.users.rows,
      };
    case CLEAR_USERS:
      return {
        ...state,
        count: 0,
        users: [],
      };
    default:
      return state;
  }
};

export default users;
