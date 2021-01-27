import { appShowPushNotification } from "../modals/app/thunk";

export function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

export function vehicleSort(a, b) {
  // Use toUpperCase() to ignore character casing
  const aRegNumber = a.reg_no || "";
  const bRegNumber = b.reg_no || "";
  const nameA = aRegNumber.toUpperCase().replace(/\s/g, "");
  const nameB = bRegNumber.toUpperCase().replace(/\s/g, "");

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

export const handleErrorResponses = (errorResponse) => async (
  dispatch,
  getState
) => {
  const {
    data: { result = {} },
  } = errorResponse;
  if (!Object.keys(result).length) {
    dispatch(
      appShowPushNotification("Something went wrong , please try later")
    );
    return;
  }
  const firstError = Object.keys(result)[0];
  if (!firstError) {
    dispatch(
      appShowPushNotification("Something went wrong , please try later")
    );
    return;
  }
  dispatch(appShowPushNotification(result[firstError][0]));
};
