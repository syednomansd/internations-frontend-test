import { ADD_USER, UPDATE_USER } from '../app/components/UserModal/constants';

export default (state = null, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.payload;
    case UPDATE_USER:
      return action.payload;
    default:
      return state;
  }
};
