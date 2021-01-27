import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
//import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./dashboard.css";
//import Clock from 'react-digital-clock';
//import { Link } from "react-router-dom";
//import Login from '../login/login'
//import Card from "./card/Card";
import Spinner from "../common/Spinner";
import { loadDashboardData } from "../../redux/actions/dashboardAction";
import axios from 'axios';

import {
  DashboardSection,
 // ZoneOptions,
 // AddZoneWrapper,
 // AddButton,
 // MapImage,
  //MainMapView,
} from "./styles";
/* import {
  appFetchAllEquipments,
  appFetchZonesData,
  zoneScheduleWIP,
  zoneFecthWIPdetails,
} from "../../modals/app/thunk"; */
/* import SearchBar from "../common/searchBar";
import {
  appSelectFilteredZones,
  appSelectNotifications,
} from "../../modals/app/selectors";
import { appSetZonesFilter } from "../../modals/app/actions";
import { goToZoneSelectionPage } from "../../Utils/navigationUtils";
import Map from "../assets/Plant-map.jpg"; */
import { isEmpty } from "lodash";

const header = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-api-key" : "DuuBUuTX5j6KIli3Gwvgv9D1vWn3rCap6Kd3AQo2",
  } 
};   

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
  //fetchEquipment,
  //fetchZones,
  setSearchFilter,
  //zones,
  history,
  //createWIP,
  //getWipDetails,
}) {

	const [time,setTime] = useState();
	const [localvalue, setLocalvalue] = useState("");
  const classes = useStyles();
  const [yard,setYard] = useState([]);

  const fetchREquiredData = async () => {
    axios.get('https://7fidxh52z5.execute-api.ap-south-1.amazonaws.com/prod/getyardsall',header)
    .then(res=>{
      setYard(res.data.data);
      console.log(res.data.data);
    })
  };

  const searchFilter = (text) => {
    setSearchFilter(text);
  };

  useEffect( () => {
	  if(localStorage.getItem("role_id")  == undefined)
		history.push("/login")
	else
      setLocalvalue(localStorage.getItem("role_id") );
   }, []);
  
  useEffect(() => {
    fetchREquiredData();
	const interval = setInterval(() => {
    fetchREquiredData();
    setTime(Date());
    console.log("YARD :",yard);
  }, 60000);
	
  }, []);

   return (
  <div>
  <p style = {{color:"white",marginLeft:"65%"}}>{time} </p>
{ yard &&
 ( yard.map((row) => {
  return (
<Card style = {{ marginLeft:'35%',marginTop:'20px',padding:'20px',width:'450px',background:'azure'}}>
      <CardContent style = {{textAlign :'center'}}>
       
        <Typography variant="h5" component="h2" style = {{paddingBottom : "30px",color:"black"}}>
         Yard : {row.name}
         </Typography>
       <Typography variant="body2" component="p" style = {{fontWeight : "500",fontSize:"16px",marginBottom:"20px",color:"black"}}>
		 Total Planned loading - Batches [{row.sapbatch}]   Wagons [{row.sapwagon}]
        </Typography>
        <Typography variant="body2" component="p" style = {{fontWeight : "500",fontSize:"16px",marginBottom:"20px",color:"black"}}>
          <div style = {{marginLeft : "60px"}}>Total Scanned -  Batches [{row.scannedbatch}]  Wagons [{row.scannedwagon}] </div>
        </Typography>
		<Typography variant="body2" component="p" style = {{fontWeight : "500",fontSize:"16px",marginBottom:"20px",color:"black"}}>
          <div style = {{marginLeft : "35px"}}> Pending for Scan - Batches [{row.sapbatch - row.scannedbatch}] Wagons [{row.sapwagon - row.scannedwagon}] </div>
        </Typography>
      </CardContent>
     
    </Card>
  )
} 
))
}
	</div>
  ); 
}

const mapStateToProps = (state, ownProps) => ({
 
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
