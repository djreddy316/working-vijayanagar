import axios from "axios";
import * as types from "../userManagement/types";

const baseUrl = `https://xlnlyl43dd.execute-api.ap-south-1.amazonaws.com/dev`;

const fetchRoaster = `${baseUrl}/viewroster`;
const addRoaster = `${baseUrl}/addroster`;

const SET_ROASTERS = "ROASTERS";

export const fetchRoasters = () => async (dispatch) => {
    const {data: roasters} = await axios.get(fetchRoaster);
    console.log("Roaster data ==>", roasters);
    dispatch(setRoasters(roasters ? roasters.data : []));
};

export const addRoasters = () => async (data) => {
    console.log('data', data);
    await axios.post(addRoaster, data);
};


const setRoasters = (roasters) => {
    return {
        type: SET_ROASTERS,
        roasters
    }
};

export const initialState = {
    roasters: [],
};

export default function fetchRoasterReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case SET_ROASTERS: {
            const {roasters} = action;
            return {...state, roasters};
        }
        default:
            return state;
    }
}