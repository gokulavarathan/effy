import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Helper from "../helper"

const initialState = {
    value:0,
    
    createCompany: [],
    getCompanyData: [],
    companyLatLon:[],
    getSingleCompanyData:[],
    getUserData:[],
    getSingleUserData:[]
};


export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        createCompany: (state, action) => {
        state.createCompany = action.payload;
    },
    companyLatLon:(state, action) => {
        state.companyLatLon = action.payload;
    },
    getCompanyData: (state, action) => {
        state.getCompanyData = action.payload;
    },
    getSingleCompanyData:(state, action) => {
        state.getSingleCompanyData = action.payload;
    },
    getUserData:(state, action) => {
        state.getUserData = action.payload;
    },
    getSingleUserData:(state, action) => {
        state.getSingleUserData = action.payload;
    }
    }
});

export const {increment,createCompany,getCompanyData,companyLatLon,getSingleCompanyData,getUserData,getSingleUserData} = counterSlice.actions;

export default counterSlice.reducer;



export const comCreatecb = (data, callback = () => {}) =>async (dispatch) => {

    var result = await axios.post( "http://localhost:4000/" +"company/", data)
    .then((response) => response.data);
    callback(result);
    dispatch(createCompany(result));
};

export const fetchComCd = ({}, callback = () => {}) => async (dispatch) => {
    var result = await axios
    .get("http://localhost:4000/company/list")
    .then((response) => response.data);
    dispatch(getCompanyData(result));
    callback(result);
};

export const getLatLon = (data, callback = () => {}) =>async (dispatch) => {
var location = data.companyAddress
var googleApi = `https://maps.google.com/maps/api/geocode/json?address=${location}&sensor=false&key=AIzaSyBp68RmeQVmhQRdujiPMyfMonea_C483PY`
    var result = await axios.get(googleApi)
    .then((response) => response.data);
    
    callback(result);
    dispatch(companyLatLon(result));
};

export const fetchSingleComDtl = (data, callback = () => {}) => async (dispatch) => {
    var result = await axios
    .get("http://localhost:4000/company/"+ data)
    .then((response) => response.data);
    dispatch(getSingleCompanyData(result));
    callback(result);
};


export const comUpdatecb = (data,id,callback = () => {}) =>async (dispatch) => {

    var result = await axios.put( "http://localhost:4000/company/update/"+id, data)
    .then((response) => response.data);
    callback(result);
    
};

export const delComCb = (id, callback = () => {}) => async (dispatch) => {
    var result = await axios
    .delete("http://localhost:4000/company/delete/"+id)
    .then((response) => response.data);
    callback(result);
};

export const fetchUsrCd = ({}, callback = () => {}) => async (dispatch) => {
    var result = await axios.get("http://localhost:4000/user/listUser")
    .then((response) => response.data);
    dispatch(getCompanyData(result));
    callback(result);
};


export const userCreatecb = (data, callback = () => {}) =>async (dispatch) => {

    var result = await axios.post( "http://localhost:4000/user/", data)
    .then((response) => response.data);
    dispatch(getUserData(result));

    callback(result);
    
};


export const fetchSingleUsrDtl = (data, callback = () => {}) => async (dispatch) => {
    var result = await axios
    .get("http://localhost:4000/user/"+ data)
    .then((response) => response.data);
    dispatch(getSingleUserData(result));
    callback(result);
};


export const delUsrCb = (id, callback = () => {}) => async (dispatch) => {
    var result = await axios
    .delete("http://localhost:4000/user/delete/"+id)
    .then((response) => response.data);
    callback(result);
};

export const usrUpdatecb = (data,id,callback = () => {}) =>async (dispatch) => {

    var result = await axios.put( "http://localhost:4000/user/update/"+id, data)
    .then((response) => response.data);
    callback(result);
    
};

export const deactivateUsrcb = (id,callback = () => {}) =>async (dispatch) => {

    var result = await axios.put( "http://localhost:4000/user/deactivate/"+id)
    .then((response) => response.data);
    callback(result);
    
};


export const addUsrcb = (data,id,callback = () => {}) =>async (dispatch) => {

    var result = await axios.put( "http://localhost:4000/company/addUser/"+id, data)
    .then((response) => response.data);
    callback(result);
    
};

export const rmvUsrCb = (id,data, callback = () => {}) => async (dispatch) => {
    var result = await axios
    .put("http://localhost:4000/company/removeUser/"+id,data)
    .then((response) => response.data);
    callback(result);
};