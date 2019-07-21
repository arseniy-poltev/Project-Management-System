import { workspaceConstants } from '../_constants';

export function workspaces(state = {}, action) {
    switch (action.type) {
        case workspaceConstants.GETALL_REQUEST:
            return {loading: true};
        case workspaceConstants.GETALL_SUCCESS:
            return { workspace_items: action.workspaces };
        case workspaceConstants.GETALL_FAILURE:
            return { error: action.error };
        default:
            return state;
    }
}