import { CLEAR_FILE, SELECT_FILE } from "../actions";

// selectedFile is the file that the user selected to upload
const initialState = {
  selectedFile: [],
};

const selectedFile = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_FILE:
      return {
        ...state,
        selectedFile: action.selectedFile,
      };
    case CLEAR_FILE:
      return {
        selectedFile: [],
      };
    default:
      return state;
  }
};

export default selectedFile;
