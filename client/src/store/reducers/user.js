import { USER_ERROR, 
         SIGN_IN_USER,
         USER_ERROR_LOGIN,
         GET_USER_DATA,
         SIGN_OUT_USER,
         ADD_PRODUCT_TO_CARD, 
         DECREASE_ITEM_QUANTITY,
         INCREASE_ITEM_QUANTITY,
         REMOVE_ITEM_FROM_CART,
         PAYMENT_SUCCESS,
         INCREASE_ITEM_QUANTITY_ERROR,
         ADD_PRODUCT_TO_CARD_ERROR,
         CHECK_ITEM_QUANTITIES_ERROR,
         DELETE_CARD_ERROR,
         REMOVE_QUANTITY_OF_PRODUCT,
         AUTH
} from "../actions/types";

const initialState = {
    user: null,
    isAuth: false,
    registerError: null,
    loginError: null,
    addProductToCardError: '',
    checkItemQuantitiesError: null,
    isAuthenticated: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_ERROR:
            const registerError = action.payload.err;
            return {
                ...state,
                registerError
            }
        case USER_ERROR_LOGIN:
            const loginError = action.payload;
            return {
                ...state,
                registerError: null,
                loginError
            }
        case SIGN_IN_USER:
            const user = action.payload;
            user.password = undefined;
            user.token = undefined;
            return {
                ...state,
                registerError: null,
                loginError: null,
                user,
                isAuth: true
            }
        case GET_USER_DATA: 
            const userData = action.payload;
            userData.password = undefined;
            userData.token = undefined;
            return {
                ...state,
                user: userData,
                registerError: null,
                loginError: null
            }
        case SIGN_OUT_USER:
            return {
                ...state,
                user: null,
                registerError: null,
                loginError: null,
                isAuth: false
            };
        case ADD_PRODUCT_TO_CARD:
            return {
                ...state,
                user: action.payload
            }
        case DECREASE_ITEM_QUANTITY:
            return {
                ...state,
                user: action.payload,
                controlQuantity: action.control
            }
        case INCREASE_ITEM_QUANTITY:
            return {
                ...state,
                user: action.payload
            }
        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                user: action.payload
            }
        case PAYMENT_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case INCREASE_ITEM_QUANTITY_ERROR:
            return {
                ...state,
                increaseItemQuantityError: action.payload
            }
        case ADD_PRODUCT_TO_CARD_ERROR:
            return {
                ...state,
                addProductToCardError: action.payload
            }
        case CHECK_ITEM_QUANTITIES_ERROR:
            return {
                ...state,
                checkItemQuantitiesError: action.payload
            }
        case DELETE_CARD_ERROR:
            return {
                ...state,
                addProductToCardError: ''
            }
        case REMOVE_QUANTITY_OF_PRODUCT:
            return {
                ...state
            }
        case AUTH:
            return {
                ...state,
                isAuthenticated: action.payload
            }
        default: 
            return state;
    }
};