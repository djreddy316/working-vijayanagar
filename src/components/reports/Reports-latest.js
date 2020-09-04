import React,{useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';



export default function Reports(){
	
const url = " https://xlnlyl43dd.execute-api.ap-south-1.amazonaws.com/dev/loadscandata";
const [data,setData] = useState([]);
const [loading,setLoading] = useState(true);
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

 const classes = useStyles();
 
useEffect(() => {
    axios.get(url).then(json => setData(json.data.data));
	setLoading(false);
  }, [])

 	return !loading && <div> 
	{
	<TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Yard</TableCell>
            <TableCell align="right">Wagon Number</TableCell>
            <TableCell align="right">Batch Number</TableCell>
            <TableCell align="right">Scanned By</TableCell>
            <TableCell align="right">Date</TableCell>
			<TableCell aling = "right">Image </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.yard}>
              <TableCell component="th" scope="row">
                {row.yard}
              </TableCell>
              <TableCell align="right">{row.wagonnumber}</TableCell>
              <TableCell align="right">{row.batchnumber}</TableCell>
              <TableCell align="right">{row.scannedby}</TableCell>
			   <TableCell align="right">{row.date}</TableCell>
			    <TableCell align="center">{row.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
		

      
	}
	</div>

}
