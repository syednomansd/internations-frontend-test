// Constant
import {
  HANDLE_MODAL,
  UPDATE_USER,
  ADD_USER
} from './constants';

// open/close modal
export const handleModal = (value) => async (dispatch) => {
  dispatch({
    type: HANDLE_MODAL,
    payload: value
  });
};

// Edit user action
export const updateUser = (id, ...data) => async (dispatch, getState, api) => {
  const res = await api.put('/user/' + id, data[0])
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      return err.response;
    });

  dispatch({
    type: UPDATE_USER,
    payload: res.data
  });
};

// Add new user action
export const addUser = (data) => async (dispatch, getState, api) => {
    const res = await api.post('/user/add', data)
      .then(function (res) {
        return res;
      })
      .catch(function (err) {
        return err.response;
      });

    dispatch({
      type: ADD_USER,
      payload: res.data
    });
};
