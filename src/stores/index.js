import { combineReducers } from 'redux';
import users from './Users';
import userupdates from './UserUpdates';
import groups from './Groups';
import group from './Group';
import groupupdates from './GroupUpdates';
import usermodal from './UserModal';

export default combineReducers({
    users,
    userupdates,
    groups,
    group,
    groupupdates,
    usermodal
});
