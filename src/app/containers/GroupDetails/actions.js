// Constant
import {
  FETCH_GROUP,
  SEARCH_USER,
  FETCH_GROUP_USERS
} from './constants';

// Get group data with group id
export const fetchGroup = (id) => async (dispatch, getState, api) => {
  const res = await api.post('/group/byid/' + id, null)
    .then(function (res) {
        return res;
    })
    .catch(function (err) {
        return err.response;
    });

  dispatch({
    type: FETCH_GROUP,
    payload: res.data
  });
};

// Search User
export const searchUser = (term, groupid) => async (dispatch, getState, api) => {
  let data;

  if(groupid){
    data = {
      groupid
    }
  }else{
    data = {
      groupid: null
    }
  }

  const res = await api.post('/user/search/' + term, data)
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      return err.response;
    });

  dispatch({
    type: SEARCH_USER,
    payload: res.data
  });
};

// Get group users list with group id
export const fetchGroupUsers = (id) => async (dispatch, getState, api) => {
  const res = await api.post('/user/bygroup/' + id, null)
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      return err.response;
    });

  dispatch({
    type: FETCH_GROUP_USERS,
    payload: res.data
  });
};
