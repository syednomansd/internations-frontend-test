// Constant
import {
  FETCH_GROUPS,
  SEARCH_GROUP,
  ADD_GROUP
} from './constants';

// Fetch all groups
export const fetchGroups = () => async (dispatch, getState, api) => {
  const res = await api.post('/group/all', null)
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      return err.response;
    });

  dispatch({
    type: FETCH_GROUPS,
    payload: res.data
  });
};

// Search Group
export const searchGroup = (term) => async (dispatch, getState, api) => {
  const res = await api.post('/group/search/' + term, null)
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      return err.response;
    });

  dispatch({
    type: SEARCH_GROUP,
    payload: res.data
  });
};

// Add new group
export const addGroup = (data) => async (dispatch, getState, api) => {
  const res = await api.post('/group/add', data)
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      return err.response;
    });

  dispatch({
    type: ADD_GROUP,
    payload: res.data
  });
};
