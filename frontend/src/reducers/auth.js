const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
  errors: {},

}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOADING': return { ...state, isLoading: true }
    case 'USER_LOADED': return { ...state, isAuthenticated: true, isLoading: false, user: action.user }
    case 'LOGIN_SUCCESSFUL':
    case 'REGISTRATION_SUCCESSFUL':
      localStorage.setItem("token", action.data.token)
      console.log(action)
      return { ...state, ...action.data, isAuthenticated: true, isLoading: false, user: action.user, errors: {}, }


    case 'AUTHENTICATION_ERROR':
    case 'LOGIN_FAILED':
    case 'REGISTRATION_FAILED':
    case 'LOGOUT_SUCCESSFUL': localStorage.removeItem("token")
      console.log(action)
      return { ...state, errors: action.data, token: null, user: null, isAuthenticated: false, isLoading: false }
    default: return state
  }
}