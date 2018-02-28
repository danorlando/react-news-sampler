import { userConstants } from '../constants';


const initialState =  { loggedIn: false, title: '', sidebarOpen: false, user: null };

export function userReducer(state = initialState, action) {
  switch (action.type) {
      case userConstants.LOGIN_SUCCESS:
          return Object.assign({}, ...state, {
              loggedIn: true
          });
      case userConstants.LOGOUT:
          return Object.assign({}, ...state, {
              loggedIn: false
          });
      case userConstants.LOGIN_FAILURE:
          return Object.assign({}, ...state, {
              loggedIn: false
          });
        case userConstants.AUTH_STATE_CHANGED:
            return Object.assign({}, ...state, {
                user: action.user
            });

  default:
      return state
  }
}
