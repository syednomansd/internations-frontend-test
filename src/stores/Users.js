import { FETCH_USERS, MORE_USERS, SEARCH_USER } from '../app/containers/Users/constants';
import { FETCH_GROUP_USERS } from '../app/containers/GroupDetails/constants';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload.data;
    case MORE_USERS:
      return state.concat(action.payload.data);
    case SEARCH_USER:
      return action.payload.data;
    case FETCH_GROUP_USERS:
      return action.payload.data;
    default:
      return state;
  }
};
