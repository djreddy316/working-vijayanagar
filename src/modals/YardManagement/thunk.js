import { selectYard } from "./selectors";
import { setYards } from "./actions";
import axios from "axios";
import { fetchYardUrl, deleteYardUrl, addYardUrl, updateYardUrl } from "./api";
import { appShowPushNotification } from "../app/thunk";

const header = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-api-key" : `${process.env.REACT_APP_API_KEY}`,
  } 
};   
export const deleteYard = (yard) => async (dispatch, getState) => {
  //const yard = selectCamera(getState());
  //console.log(yard);
  //const updatedCameras = camera.filter((list) => list.id !== camera.id);
  //dispatch(setCameras(updatedCameras));
  //api request
  const respone = await axios.post(deleteYardUrl, yard,header);
 
  //console.log("api data ==>", respone);
  dispatch(appShowPushNotification("successfully deleted user"));
  dispatch(fetchYard());
};

export const fetchYard = () => async (dispatch, getState) => {
  //console.log("Header " ,header);
  const { data: yard } = await axios.get(fetchYardUrl,header);
  //console.log("Yards fetched data ==>", yard.data);
  
  dispatch(setYards(yard ? yard.data : []));
};

export const addYard = (yard) => async (dispatch, getState) => {
  try {
    //console.log("add Yard data before post ==>", yard);
    dispatch(appShowPushNotification("adding Yard in Yard management"));
    //console.log('Yard from thunk', JSON.stringify(yard));
    const response = await axios.post(addYardUrl, yard,header);
    //console.log(response);
    dispatch(fetchYard());
    dispatch(appShowPushNotification("successfully added Yard"));
  } catch (err) {
    dispatch(appShowPushNotification("failed to add Yard, try again"));
    //console.error(`failed to add Yard with ${err}`);
  }
};

export const updateYard = (yard) => async (dispatch, getState) => {
  dispatch(appShowPushNotification("updating Yard"));
  try {
    //console.log("updating Yard ==>", yard);
    const updateResponse = await axios.post(updateYardUrl, yard,header);
    dispatch(fetchYard());
    dispatch(appShowPushNotification("successfully updated Yard"));
    //console.log("updated response ==>", updateResponse);
  } catch (err) {
    dispatch(appShowPushNotification("failed to update Yard, try again"));
    //console.error(`failed to update Yard with ${err}`);
  }
};
