import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./dashboard.css";


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


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export function Dashboard({
  fetchEquipment,
  fetchZones,
  setSearchFilter,
  zones,
  history,
  createWIP,
  getWipDetails,
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

  return (
  <div>
<Card style = {{ marginLeft:'40%',marginTop:'20px',padding:'20px',width:'300px'}}>
      <CardContent style = {{textAlign :'center'}}>
       
        <Typography variant="h5" component="h2">
         NY Loading
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          No of Rakes : 2
        </Typography>
        <Typography variant="body2" component="p">
        No of Wagons : 90
        
          
        </Typography>
      </CardContent>
     
    </Card>
	
	<Card  style = {{marginLeft:'40%', marginTop:'20px',padding:'20px',width:'300px'}}>
      <CardContent  style = {{textAlign :'center'}}>
       
        <Typography variant="h5" component="h2">
         CRM2
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
		 No of Rakes : 2 
        </Typography>
        <Typography variant="body2" component="p">
          No. of Wagons : 90
        </Typography>
      </CardContent>
      
    </Card>
	<Card  style = {{marginLeft:'40%', marginTop:'20px',padding:'20px',width:'300px'}}>
      <CardContent  style = {{textAlign :'center'}}>
       
        <Typography variant="h5" component="h2">
         CRM2
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          No of Rakes : 2
        </Typography>
        <Typography variant="body2" component="p">
          No. of Wagons : 90
        </Typography>
      </CardContent>
      
    </Card>
    <DashboardSection>
    
    </DashboardSection>
	</div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  zones: appSelectFilteredZones(state),
  notifications: appSelectNotifications(state),
  apiCallsInProgress: state.apiCallsInProgress,
});

const mapDispatchToProps = {
  fetchZones: appFetchZonesData,
  fetchEquipment: appFetchAllEquipments,
  setSearchFilter: appSetZonesFilter,
  createWIP: zoneScheduleWIP,
  getWipDetails: zoneFecthWIPdetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
