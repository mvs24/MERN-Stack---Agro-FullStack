import { SIGN_IN_USER, SIGN_OUT_USER } from "../actions/types";

const initialState = {
  isAuth: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        isAuth: true
      }
    case SIGN_OUT_USER:
        return {
            isAuth: false
        }
    default: 
        return state;
  }
};
