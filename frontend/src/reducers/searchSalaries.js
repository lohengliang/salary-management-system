import { UPDATE_MAX_SALARY, UPDATE_MIN_SALARY } from "../actions";

const initialState = {
  minSalary: 0,
  maxSalary: 4000,
};

const searchSalaries = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MIN_SALARY:
      return {
        ...state,
        minSalary: action.minSalary,
      };
    case UPDATE_MAX_SALARY:
      return {
        ...state,
        maxSalary: action.maxSalary,
      };
    default:
      return state;
  }
};

export default searchSalaries;
