import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./actionTypes";

export  const registerUser = (url , userData, history) => dispatch => {
    console.log("userdata")
    console.log(userData)
    axios
        .post("/api/user/register", userData)
        .then(res => {
            dispatch({
              type: actionTypes.SET_FLASH_MESSAGE,
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
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
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
