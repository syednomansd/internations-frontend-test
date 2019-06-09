// Constant
import {
  UPDATE_GROUP
} from './constants';

// Edit group action
export const updateGroup = (title, id) => async (dispatch, getState, api) => {
  const data = {
    title
  }
  const res = await api.put('/group/' + id, data)
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      return err.response;
    });

  dispatch({
    type: UPDATE_GROUP,
    payload: res.data
  });
};
