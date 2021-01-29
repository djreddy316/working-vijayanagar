import React, { Component } from 'react';
//import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
//import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import XLSX from 'xlsx';
import { make_cols } from './make-columns';
import { SheetJSFT } from './types';
import {connect} from "react-redux";
//import {Dashboard} from "../assignment/assignment";
//import {appSelectFilteredZones, appSelectNotifications} from "../../modals/app/selectors";
//import {appFetchAllEquipments, appFetchZonesData, zoneFecthWIPdetails, zoneScheduleWIP} from "../../modals/app/thunk";
//import {appSetZonesFilter} from "../../modals/app/actions";
import {addRoasters, fetchRoasters} from "../../modals/roaster/roaster-service";
import axios from 'axios';
import { appShowPushNotification } from "../../modals/app/thunk";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ExcelReader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            data: [],
            cols: []
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addRoaster = this.addRoaster.bind(this);
        this.notify = this.notify.bind(this);
    }
    
    notify()
    {
        toast.info("Please select a file !");
    }
	addRoaster(data){
		
		axios.post('https://xlnlyl43dd.execute-api.ap-south-1.amazonaws.com/dev/addroster',data).then(resp => {

		console.log(resp.data);

	});
	}

    handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) this.setState({ file: files[0] });
    };

    handleFile() {
        if(this.state.file.length > 0)
        {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);
            /* Update state */
            this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
                 /* console.log('FUN ', JSON.stringify(this.state.data, null, 2));
             addRoasters(JSON.stringify(this.state.data, null, 2));*/
			   this.addRoaster(JSON.stringify(this.state.data, null, 2));
			    console.log('FUN ', JSON.stringify(this.state.data, null, 2));
            });

        };

        if (rABS) {
            reader.readAsBinaryString(this.state.file);
        } else {
            reader.readAsArrayBuffer(this.state.file);
        };
    }
    else {
        this.notify();
       
    }
    }

    render() {
        return (
            <div >
                <input style = {{color:"black",width:"20%",marginLeft:"60%",marginTop:"0px"}} type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
                <input style = {{marginLeft:"85%",marginTop:"-35px"}} type='submit' value="Submit" onClick={this.handleFile} />
                <ToastContainer 
        >
           </ToastContainer>
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = {
    fetchRoasters: fetchRoasters
};

export default connect(mapStateToProps, mapDispatchToProps)(ExcelReader);