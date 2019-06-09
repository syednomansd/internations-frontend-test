import { HANDLE_MODAL } from '../app/components/UserModal/constants';

export default (state = null, action) => {
  switch (action.type) {
    case HANDLE_MODAL:
      return action.payload;
    default:
      return state;
  }
};
