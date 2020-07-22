import axios from 'axios'
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING , GET_DATA_SUCCESS} from "./actionTypes";
export const order = (url, Data, history) => (dispatch) => {
    console.log("userdata")
    console.log(Data)
    axios
        .post("/api/user/Order", Data)
        .then(res => history.push("/order"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const postProducts = (url, Data, history) => (dispatch) => {
    axios
        .post("/api/user/postproducts", Data)
        .then(res => res.send("success"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            
        );
};
export const getProducts = (url , history) =>{
    return(dispatch) => {
        axios.get(url)
        .then(response =>{
            dispatch({
                type : GET_DATA_SUCCESS,
                data : response.data
            });
        })
    }
}