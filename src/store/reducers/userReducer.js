const INITIAL_STATE = {
  loggedInUser: null,
};

// export function loadUser()
export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_LOGGED_IN_USER':
      return {
        ...state,
        loggedInUser: action.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        loggedInUser: null,
      };
    default:
      return state;
  }
}
