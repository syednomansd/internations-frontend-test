import { FETCH_GROUPS } from '../app/containers/Users/constants';
import { SEARCH_GROUP } from '../app/containers/Groups/constants';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_GROUPS:
      return action.payload.data;
    case SEARCH_GROUP:
      return action.payload.data;
    default:
      return state;
  }
};
