import * as types from "./types.js";


export const setYards = (yard) => {
  console.log("Set Yards : ", yard);
  return {
    type: types.SET_TOTAL_YARDS,
    yard,
  }
};

export const YardSetNameFilter = (nameFilter) => ({
  type: types.YARD_SET_NAME_FILTER,
  nameFilter,
});