import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './alert.actions';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete,
    add_user,
    get,
    handle_image,
    update_user
};

function handle_image(file) {
    return { type: userConstants.HANDLE_IMAGE, file }
}

function update_user(user, id) {
    return dispatch => {
        userService.update_user(user, id)
            .then(
                res=> {
                    if (res.status === 200) {
                        dispatch(success());
                        dispatch(alertActions.success('Developer Updated successfully'));
                    }
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            )
    }
    // function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_USER_FAILURE, error } }
}
function login(user) {
    return dispatch => {
        dispatch(request({ user }));

        userService.login(user.email, user.password)
            .then(
                res => {
                    if (res.status === 200) {
                        dispatch(success(user));
                        history.push('/admin/dashboard');
                        dispatch(alertActions.success(res.message));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Login Failed!"));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function get(id) {
    return dispatch => {
        dispatch(request());

        userService.getById(id)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETONE_REQUEST } }
    function success(user) { return { type: userConstants.GETONE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETONE_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                res => {
                    if (res.status === 200) {
                        dispatch(success());
                        // history.push('/auth/login');
                        dispatch(alertActions.success('Registration successful'));
                    }
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function add_user(user) {
    return dispatch => {
        userService.add_user(user)
            .then(
                res=> {
                    if (res.status === 201) {
                        dispatch(success());
                        dispatch(alertActions.success('Developer Created successfully'));
                    }
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            )
    }
    // function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.ADD_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.ADD_USER_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => {
                    if(user.status === 200) {
                        dispatch(success(id));
                        dispatch(alertActions.success('Record Deleted successfully'));
                    }
                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}