import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import "./assignment.css";
import Button from '@material-ui/core/Button';


//import Card from "./card/Card";
import Spinner from "../common/Spinner";
import { loadDashboardData } from "../../redux/actions/dashboardAction";

import BarMapZone from "../BarMapZone/BarMapZone";
import BarDefaultSMS from "../BarDefaultSMS/BarDefaultSMS";
import BarAddSearch from "../BarAddSearch/BarAddSearch";
import {
  DashboardSection,
  ZoneOptions,
  AddZoneWrapper,
  AddButton,
  MapImage,
  MainMapView,
} from "./styles";
import {
  appFetchAllEquipments,
  appFetchZonesData,
  zoneScheduleWIP,
  zoneFecthWIPdetails,
} from "../../modals/app/thunk";
import SearchBar from "../common/searchBar";
import {
  appSelectFilteredZones,
  appSelectNotifications,
} from "../../modals/app/selectors";
import { appSetZonesFilter } from "../../modals/app/actions";
import { goToZoneSelectionPage } from "../../Utils/navigationUtils";
import Map from "../assets/Plant-map.jpg";
import { isEmpty } from "lodash";
import {selectUsers} from "../../modals/userManagement/selectors";
import RoasterTable from "../common/roasterTable";
import {fetchRoasters,addRoasters} from "../../modals/roaster/roaster-service";


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: 200,
  },
}));


export function Dashboard({
  fetchEquipment,
  fetchZones,
  setSearchFilter,
  zones,
  history,
  createWIP,
  getWipDetails,
  fetchRoasters,
  roasters,
  addRoasters
}) {
  const [schedulingZone, setSechudulingZone] = useState({});
  const [equipments, setEquipments] = useState([]);
  const [isMapView, setIsMapView] = useState(false);
	const classes = useStyles();
  const fetchREquiredData = async () => {
    fetchZones();
    const { data: equipments } = await fetchEquipment();
    setEquipments(equipments);
  };

  const searchFilter = (text) => {
    setSearchFilter(text);
  };
	
 
  useEffect(() => {
    fetchREquiredData();
  }, []);

  if(roasters && roasters.roasters.length === 0) {
    fetchRoasters();
  }

  console.log('rrr', roasters);

  const invokeAction = (actionType) => {
    console.log('action type', actionType);
  };

  return (
  <div>
    <h1 style = {{color:'white'}}> Roaster Management </h1>
    <DashboardSection>
      <RoasterTable
          rowData={roasters.roasters}
          requiredElements={[
            "yardname",
            "employeeid",
            "shift",
            "date",
			"firstname",
			"lastname",
			"biometricnumber"
          ]}
          columnsElements={[
            "Yard",
            "Employee ID",
            "Shift",
            "Date",
			"First Name",
			"Last Name",
			"Biometric Number"
          ]}
      />
    </DashboardSection>
	</div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  zones: appSelectFilteredZones(state),
  notifications: appSelectNotifications(state),
  apiCallsInProgress: state.apiCallsInProgress,
  roasters: state.roasters
});

const mapDispatchToProps = {
  fetchZones: appFetchZonesData,
  fetchEquipment: appFetchAllEquipments,
  setSearchFilter: appSetZonesFilter,
  createWIP: zoneScheduleWIP,
  getWipDetails: zoneFecthWIPdetails,
  fetchRoasters: fetchRoasters,
  addRoasters:addRoasters
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
