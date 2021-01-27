import { createSelector } from "reselect";
import YardManagementReducer from ".";
import { compare } from "../../Utils";

export const selectYard = ({ yard }) => {
	console.log("Selector Yard :",yard);
	return	yard;
	}
export const YardSelectSearchFilter = ( {

    filters: { nameFilter },

}) => {
  return nameFilter;
};

export const YardSelectFilteredList = createSelector(
  [selectYard, YardSelectSearchFilter],
  (yard, nameFilter) => {
    if (!yard.length) return yard;
    yard.sort(compare);
    if (!nameFilter) return yard;
    const filteredyard = yard.filter(
      ({ name }) => name.toUpperCase().indexOf(nameFilter.toUpperCase()) > -1
    );
    return filteredyard;
  }
);
