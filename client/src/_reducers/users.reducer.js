import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.ADD_USER_SUCCESS:
      return {
        post_user: true
      };
    case userConstants.ADD_USER_FAILURE:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        user_items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        user_items: state.user_items.map(user =>
          user._id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        user_items: state.user_items.filter(user => user._id !== action.id),
        delete_user: true
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        user_items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };

    case userConstants.GETONE_REQUEST:
      return {
      }
    case userConstants.GETONE_SUCCESS:
      return {
        user_item: action.user
      }
    case userConstants.GETONE_FAILURE:
      return {}

    case userConstants.HANDLE_IMAGE:
      return {
        user_avatar: action.file
      }

    case userConstants.UPDATE_USER_SUCCESS:
      return {
        post_user: true
      };

    case userConstants.UPDATE_USER_FAILURE:
      return {}
    default:
      return state
  }
}