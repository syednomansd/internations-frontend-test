// Constant
import {
  SEARCH_USER,
  FETCH_GROUPS,
  MORE_USERS,
  FETCH_USERS,
  HANDLE_MODAL
} from './constants';

// Fetch all users
export const fetchUsers = (skip, limit) => async (dispatch, getState, api) => {
  const usersData = {
    skip,
    limit
  };
  const res = await api.post('/user/all', usersData)
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      return err.response;
    });

  dispatch({
    type: FETCH_USERS,
    payload: res.data
  });
};

// Fetch more users
export const moreUsers = (skip, limit) => async (dispatch, getState, api) => {
  const usersData = {
    skip,
    limit
  };
  const res = await api.post('/user/all', usersData)
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      return err.response;
    });

  dispatch({
    type: MORE_USERS,
    payload: res.data
  });
};

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

// open/close modal
export const handleModal = (value) => async (dispatch) => {
  dispatch({
    type: HANDLE_MODAL,
    payload: value
  });
};
