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
import Clock from 'react-digital-clock';

//import Card from "./card/Card";
import Spinner from "../common/Spinner";
import { loadDashboardData } from "../../redux/actions/dashboardAction";


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

	const [time,setTime] = useState();
  const classes = useStyles();
  const fetchREquiredData = async () => {

  };

  const searchFilter = (text) => {
    setSearchFilter(text);
  };

  useEffect(() => {
    fetchREquiredData();
	const interval = setInterval(() => {
		setTime(Date());
  }, 1000);
	
  }, []);

  return (
  <div>
  <h5 style = {{color:"white",marginLeft:"65%"}}>{time} </h5>
<Card style = {{ marginLeft:'35%',marginTop:'20px',padding:'20px',width:'450px',background:'azure'}}>
      <CardContent style = {{textAlign :'center'}}>
       
        <Typography variant="h5" component="h2" style = {{paddingBottom : "30px",color:"black"}}>
         Yard : North Yard (NY)
         </Typography>
       <Typography variant="body2" component="p" style = {{fontWeight : "500",fontSize:"18px",marginBottom:"20px",color:"black"}}>
		 Total Planned loading - Rakes [0]   Wagons [0]
        </Typography>
        <Typography variant="body2" component="p" style = {{fontWeight : "500",fontSize:"18px",marginBottom:"20px",color:"black"}}>
          <div style = {{marginLeft : "60px"}}>Total Scanned -  Rakes [0]  Wagons [0] </div>
        </Typography>
		<Typography variant="body2" component="p" style = {{fontWeight : "500",fontSize:"18px",marginBottom:"20px",color:"black"}}>
          <div style = {{marginLeft : "35px"}}> Pending for Scan - Rakes [0] Wagons [0] </div>
        </Typography>
      </CardContent>
     
    </Card>
	
	<Card style = {{ marginLeft:'35%',marginTop:'20px',padding:'20px',width:'450px',background:'azure'}}>
      <CardContent  style = {{textAlign :'center'}}>
       
        <Typography variant="h5" component="h2" style = {{paddingBottom : "30px",color:"black"}}>
         Yard : Cold Rolling Mill( CRM2)
        </Typography>
       <Typography variant="body2" component="p" style = {{fontWeight : "500",fontSize:"18px",marginBottom:"20px",color:"black"}}>
		 Total Planned loading - Rakes [0]   Wagons [0]
        </Typography>
        <Typography variant="body2" component="p" style = {{fontWeight : "500",fontSize:"18px",marginBottom:"20px",color:"black"}}>
          <div style = {{marginLeft : "60px"}}>Total Scanned -  Rakes [0]  Wagons [0] </div>
        </Typography>
		<Typography variant="body2" component="p" style = {{fontWeight : "500",fontSize:"18px",marginBottom:"20px",color:"black"}}>
          <div style = {{marginLeft : "35px"}}> Pending for Scan - Rakes [0] Wagons [0] </div>
        </Typography>
      </CardContent>
      
    </Card>
	<Card style = {{ marginLeft:'35%',marginTop:'20px',padding:'20px',width:'450px',background:'azure'}}>
      <CardContent  style = {{textAlign :'center'}}>
       
        <Typography variant="h5" component="h2" style = {{paddingBottom : "30px",color:"black"}}>
         Yard : Hot Strip Mill(HSM2)
         </Typography>
       <Typography variant="body2" component="p" style = {{fontWeight : "500",fontSize:"18px",marginBottom:"20px",color:"black"}}>
		 Total Planned loading - Rakes [0]   Wagons [0]
        </Typography>
        <Typography variant="body2" component="p" style = {{fontWeight : "500",fontSize:"18px",marginBottom:"20px",color:"black"}}>
          <div style = {{marginLeft : "60px"}}>Total Scanned -  Rakes [0]  Wagons [0] </div>
        </Typography>
		<Typography variant="body2" component="p" style = {{fontWeight : "500",fontSize:"18px",marginBottom:"20px",color:"black"}}>
          <div style = {{marginLeft : "35px"}}> Pending for Scan - Rakes [0] Wagons [0] </div>
        </Typography>
      </CardContent>
      
    </Card>
    <DashboardSection>
    
    </DashboardSection>
	</div>
  );
}

const mapStateToProps = (state, ownProps) => ({
 
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
