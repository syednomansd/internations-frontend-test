import { ADD_GROUP } from '../app/containers/Groups/constants';
import { UPDATE_GROUP } from '../app/components/GroupsList/constants';

export default (state = null, action) => {
  switch (action.type) {
    case ADD_GROUP:
      return action.payload;
    case UPDATE_GROUP:
      return action.payload;
    default:
      return state;
  }
};
