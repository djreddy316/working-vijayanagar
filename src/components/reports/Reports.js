import React, {useState, useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { forwardRef } from 'react';
import {DatePicker} from "antd";
//import {Container, Row, Col} from 'reactstrap';
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { AddBox, ArrowDownward, Search, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline,Edit,FilterList,FirstPage,LastPage,Remove,ViewColumn,SaveAlt } from "@material-ui/icons";

import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import {moment} from "moment";
import ExportCSV from "./exportToCSV";
import Spinner from  "../common/Spinner";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function Reports({
    history
  }) {

    const url = " https://7fidxh52z5.execute-api.ap-south-1.amazonaws.com/prod/getreportdata";
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filename,setFilename] = useState("");
		const [localvalue, setLocalvalue] = useState("");
    const useStyles = makeStyles({
        table: {
            minWidth: 650
		}
    });

     useEffect( () => {
	  if(localStorage.getItem("role_id")  == undefined)
			history.push("/login")
	else
      setLocalvalue(localStorage.getItem("role_id") );
   }, []);
	
	const classes = useStyles();
  
  function day_of_the_month(d)
{ 
  return (d < 10 ? '0' : '') + d;
}
	
		
    useEffect(() => {
      var today = new Date();
      let datetoday = today.getFullYear() + '-' + day_of_the_month(today.getMonth() + 1) + '-' + today.getDate();
      //let start = moment().format('YYYY-MM-DD');
      //let end = moment().format('YYYY-MM-DD');
      let todaydate = today.getDate() + '-' + day_of_the_month(today.getMonth() + 1) + '-' + today.getFullYear();
      setFilename('TallyChecker_Report_'+ todaydate)
      console.log(datetoday)
      axios.post(url, {
            "from": datetoday,
            "to": datetoday
        }).then(json => setData(json.data.data));
        setLoading(false);
    }, [])


    const handleEvent = (event, picker) => {
        console.log(picker.startDate);
    }

    const handleCallback = (start, end, label) => {
        let from = start.format('YYYY-MM-DD');
        let to = end.format('YYYY-MM-DD');
        axios.post(url, {
            "from": from,
            "to": to
        }).then(json => setData(json.data.data));
        console.log("from: ",from);
        console.log("to :",to);
        setLoading(false);
    }

	const styles = { width: 260, display: "block", marginBottom: 10 };

 	return !loading ?
   (
   <div> 
	{
		<div>



		<h1 style = {{color:"white",fontSize:"36px",marginLeft:"25px"}}>Loading Tally check Report </h1>

<div>
<div style = {{marginLeft:"10%",marginTop : "20px", zIndex : "999",position:"relative"}}> <ExportCSV csvData={data} fileName={filename} /> </div>
<div style = {{marginLeft:"40%",marginTop:"-60px", maxWidth: "300px",zIndex : "999",position:"relative"}}>
<h5 style = {{color:"white", fontSize:"16px"}}> Chose Date range to get the Report </h5>
<DateRangePicker onEvent={handleEvent} onCallback={handleCallback}  size="sm" style={styles}>
  <input type="text" className="form-control" />
</DateRangePicker>
</div>

</div>
	{
	<div style = {{width:"98%", marginTop:"-50px"}}>
	<MaterialTable style = {{background:"#0F1322",color:"#FFF"}} className={classes.table} size="small" aria-label="a dense table"
	icons={tableIcons}	
	columns={[
	  { title: 'Yard', field: 'yard' },
	  {title: 'SAP Rakenumber',field: 'rakeno'},
	  {title: 'SAP Wagon Number',field: 'wagonno'},
	  { title: 'Loaded Wagon Number', field: 'wagonnumber' },
	  {title: 'SAP Batch Number',field: 'batchno'},
    { title: 'Loaded Batch Number', field: 'batchnumber' },
    { title: 'Weight', field: 'batchwt' },
    { title: 'Size', field: 'size' },
	  {title: 'Scanned By',field: 'scannedby'},
	  {title: 'Image',field: 'url', render: rowData => { return rowData.url ?  <img src={rowData.url} style={{height: 50}}/> : ""}}, 
	  {title: 'Anamoly',field: 'anamoly'},
	   {title: 'Action',field: ''},
	   {title: 'Taken By',field: ''},
	   {title: 'Action time',field: ''},
	]}
	data={data}
	options={{
    search: true,
    searchFieldStyle: { maxWidth: "30%", marginLeft: "65%" },
    pageSize: 50,
    pageSizeOptions: [50, 100, 200, 300],
    showTitle: false,
    toolbar: true,
    paging: true,
	}}
  />
	</div>
	
	
	}
		
	</div>
      
	}
	</div> ) : <Spinner />

}
