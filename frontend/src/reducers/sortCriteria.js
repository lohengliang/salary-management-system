import { UPDATE_SORT_CRITERIA } from "../actions";

const initialState = {
  sortCriteria: "+id",
};

const sortCriteria = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SORT_CRITERIA:
      return {
        ...state,
        sortCriteria: action.sortCriteria,
      };
    default:
      return state;
  }
};

export default sortCriteria;
