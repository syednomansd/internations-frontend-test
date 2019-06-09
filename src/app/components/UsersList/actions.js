// Constant
import {
  HANDLE_MODAL
} from './constants';

// open/close modal
export const handleModal = (value) => async (dispatch) => {
  dispatch({
    type: HANDLE_MODAL,
    payload: value
  });
};
