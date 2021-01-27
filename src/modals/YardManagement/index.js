import * as types from "./types";

export const initialState = {
  Yard: [],
};

export default function YardManagementReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case types.SET_TOTAL_YARDS:
      {
        const { yard } = action;
        state = { ...state, yard };
      }
      break;
    case types.YARD_SET_NAME_FILTER: {
      const { nameFilter } = action;
      state = { ...state, filters: { ...state.filters, nameFilter } };
    }
    // case y:
    //   // code block
    //   break;
    default:
      return state;
  }
  console.log("State Variable :",state);
  return state;
}
