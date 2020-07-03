import { UPDATE_OFFSET } from "../actions";

const initialState = {
  offset: 0,
};

const offset = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OFFSET:
      return {
        ...state,
        offset: action.offset,
      };
    default:
      return state;
  }
};

export default offset;
