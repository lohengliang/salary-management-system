import { HIDE_EDIT_USER_MODAL, SHOW_EDIT_USER_MODAL } from "../actions";

const initialState = {
  modalProps: {
    open: false,
  },
  modalType: "",
};

const editUserModal = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_EDIT_USER_MODAL:
      return {
        ...state,
        modalProps: action.modalProps,
        modalType: action.modalType,
      };
    case HIDE_EDIT_USER_MODAL:
      return initialState;

    default:
      return state;
  }
};

export default editUserModal;
