import { workspaceService } from '../_services';
import { workspaceConstants } from '../_constants';

export const workspaceActions = {
    getAll,
}

function getAll () {
    workspaceService.getAll();
    
    return dispatch => {
        dispatch(request());

        workspaceService.getAll()
            .then(
                workspaces => {
                    dispatch(success(workspaces))
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: workspaceConstants.GETALL_REQUEST } }
    function success(workspaces) { return { type: workspaceConstants.GETALL_SUCCESS, workspaces } }
    function failure(error) { return { type: workspaceConstants.GETALL_FAILURE, error } }
}