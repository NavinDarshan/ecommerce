import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING , SET_FLASH_MESSAGE , RESET_FLASH_MESSAGE} from "./actionTypes";

export  const registerUser = (url , userData, history) => dispatch => {
    console.log("userdata")
    console.log(userData)
    axios
        .post("/api/user/register", userData)
        .then(res => {
            dispatch({
              type: SET_FLASH_MESSAGE,
              payload: res.data
            })
          })
          .catch(err =>
            console.log(err)
          );
};

export const loginUser = (url , userData) => dispatch => {
    console.log("its userData")
    console.log(userData)
    axios
        .post("/api/user/login", userData)
        .then(res => {
            if (res.data.success) {
              //Save to localStorage
      
              //Set token to localStorage
              const { token } = res.data;
              localStorage.setItem("jwtToken", token);
              //set token to Auth header
              setAuthToken(token);
              //Decode token to get user data
              const decoded = jwt_decode(token);
              //Set current user
              dispatch(setCurrentUser(decoded));
              dispatch({
                type: SET_FLASH_MESSAGE,
                payload: res.data
              })
            }
            else{
              dispatch({
                type: SET_FLASH_MESSAGE,
                payload: res.data
              })
            }
          })
          .catch(err => console.log(err))
};


export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};


export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/')
};

export const resetFlash = () => {
    return {
      type: RESET_FLASH_MESSAGE
    }
  }
