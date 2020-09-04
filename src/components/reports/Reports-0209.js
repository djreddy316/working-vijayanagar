import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import "./report.css";
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
import WipScheduler from "./scheduleWIP";
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
import ReportTable from "../common/reportTable";
import {fetchReports} from "../../modals/reports/reports-service";


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
  fetchReports,
  reports
}) {


  const searchFilter = (text) => {
    setSearchFilter(text);
  };
	

const reports = [];
  fetchReports();

  console.log(reports);

  return (
  <div>
    <h1 style = {{color:'white'}}> Tally check report </h1>
    <DashboardSection>
      <ReportTable
          rowData={reports}
          requiredElements={[
            "yard",
			"rakenumber",
			"wagonnumber",
			"batchnumber",
			"scannedby",
			"batchwt",
			"size",
			"date"
          ]}
          columnsElements={[
            "Yard Name",
            "Rake number",
            "Wagon Number",
            "Batch Number",
			"Scanned By",
			"Batch Weight",
			"Size",
			"Date"
          ]}
      />
    </DashboardSection>
	</div>
  );
}

const mapStateToProps = (state, ownProps) => ({

  reports: state.reports
});

const mapDispatchToProps = {
   fetchReports: fetchReports
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
