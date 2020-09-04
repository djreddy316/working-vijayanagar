import axios from "axios";
import * as types from "../userManagement/types";

const baseUrl = `https://xlnlyl43dd.execute-api.ap-south-1.amazonaws.com/dev`;

const fetchReport = `${baseUrl}/loadscandata`;

const SET_REPORTS = "REPORTS";

export const fetchReports = () => async (dispatch) => {
    const {data: reports} = await axios.get(fetchReport);

    dispatch(setReports(reports ? reports.data : []));
};

const setReports = (reports) => {
    return {
        type: SET_REPORTS,
        reports
    }
};

export const initialState = {
    reports: [],
};

export default function fetchReportReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case SET_REPORTS: {
            const {reports} = action;
            return {...state, reports};
        }
        default:
            return state;
    }
}