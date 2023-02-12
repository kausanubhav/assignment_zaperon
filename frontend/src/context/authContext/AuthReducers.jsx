const AuthReducer = (state, action) => {
  switch (action.type) {
    
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        error: false,
        message: "",
      }
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        error: true,
        message: action.payload,
        
      }
    case "REGISTER_START":
      return {
        ...state,
        user: null,
        error: false,
        message: "",
      }
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        error: false,
        message: "",
      }
    case "REGISTER_FAILURE":
      return {
        ...state,
        user: null,
        error: true,
        message: action.payload,
        
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        message: "",
        error:false,
        isLoggedIn:false
      }

      case "LOGGED_IN":
        return {
             ...state,
             isLoggedIn:true
        }

    default:
      return { ...state }
  }
}

export default AuthReducer
