import { HIDE_ADD_USER_MODAL, SHOW_ADD_USER_MODAL } from "../actions";

const initialState = {
  modalProps: {
    open: false,
  },
  modalType: "",
};

const addUserModal = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ADD_USER_MODAL:
      return {
        ...state,
        modalProps: action.modalProps,
        modalType: action.modalType,
      };
    case HIDE_ADD_USER_MODAL:
      return initialState;

    default:
      return state;
  }
};

export default addUserModal;
