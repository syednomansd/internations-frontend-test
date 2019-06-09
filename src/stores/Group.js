import { FETCH_GROUP } from '../app/containers/GroupDetails/constants';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_GROUP:
      return action.payload;
    default:
      return state;
  }
};
