import React,{useEffect, useState} from 'react';
import Sidebar from "../../common/sidebar/sidebar"
import './css/user.css'
import { Button} from 'react-bootstrap';
import DataTable,{createTheme,Export } from 'react-data-table-component';
import EditIcon from '@mui/icons-material/DriveFileRenameOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {fetchUsrCd,delUsrCb,deactivateUsrcb} from "../../../redux/api"
import {useDispatch} from 'react-redux'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DoDisturbOffIcon from '@mui/icons-material/DoDisturbOff';
const User=()=>{
    
    let navigate = useNavigate();
    
    const dispatch = useDispatch()
    const [data,setData]=useState()
    const [flag,setFlag]=useState(true)
    
    useEffect(()=>{
        dispatch(
            fetchUsrCd({}, (res) => {
                if(res.status){
                    setData(res.data)
                    
                }else{
                    toast.error(res.msg)
                }                    
            })
                );
    },[flag])


    const columns = [
                {
                name: "S.No",
                cell: (row, index) => index + 1,
                width: "100px"
                },
                {
                name: "First Name",
                selector: "firstName",
                sortable: true,
                width: "150px",
                },
                {
                name: "Last Name",
                selector: "lastName",
                sortable: true, 
                width: "150px",
                },
                {
                    name: "Email Id",
                    selector: "emailId",
                    sortable: true, 
                    width: "150px",
                },{
                    name: "Designation",
                    selector: "designation",
                    sortable: true, 
                    width: "150px",
                },{
                    name: "Date Of Birth",
                    selector: "dob",
                    sortable: true,
                    width: "150px", 
                },{
                    name: "Active status",
                    selector: "activeStatus",
                    sortable: true,
                    width: "150px",
                    cell: (row) => (
                        row.activeStatus ? "true" : "false"
                        ) 
                },{
                    name: "createdAt",
                    selector: "createdAt",
                    sortable: true,
                    width: "150px", 
                },
                {
                    name: "View details",
                    selector: "",
                    sortable: true,
                    width: "100px",
                    cell: (row) => (
                        <div data-tag="allowRowEvents"  className="hover" onClick={()=>{navigate('/user/view/'+ row._id)}}>
                        <RemoveRedEyeIcon/>
                        </div>
                        ),
                    },
                {
                name: "Update details",
                selector: "",
                sortable: true,
                width: "100px",
                cell: (row) => (
                    <div data-tag="allowRowEvents"  className="hover" onClick={()=>{navigate('/user/update/'+ row._id)}}>
                    <EditIcon/>
                    </div>
                    ),
                },{
                    name: "Delete forever",
                    selector: "",
                    sortable: true,
                    width: "100px",
                    cell: (row) => (
                        <div data-tag="allowRowEvents"  className="hover" onClick={()=>{deleteFun(row._id)}}>
                        <DeleteForeverIcon/>
                        </div>
                        ),
                },{
                    name: "Deactivate user",
                    selector: "",
                    sortable: true,
                    width: "100px",
                    cell: (row) => (
                        <div data-tag="allowRowEvents"  className="hover" onClick={()=>{deactivateFn(row._id)}}>
                        <DoDisturbOffIcon/>
                        </div>
                        ),
                    },
                
    ];

    createTheme('dark', {
                background: {
                default: '#F8F8F8',
                },
                divider: {
                    default: 'rgba(0,0,0,.54)',
                },
                text: {
                    primary: 'black',
                    secondary: '#0d6efd',
                    },
                    action: {
                        
                        hover: '#ffff',
                        
                    },
                    
    });

const deleteFun=(e)=>{

    dispatch(
        delUsrCb(e, (res) => {
            if(res.status){
                toast.info(res.msg);
                setFlag(!flag)

            }else{
                toast.error(res.msg)
            }                    
        })
            );

}

const deactivateFn = (e)=>{

    dispatch(
        deactivateUsrcb(e, (res) => {
            if(res.status){
                toast.info(res.msg);
                setFlag(!flag)

            }else{
                toast.error(res.msg)
            }                    
        })
            );
    
}
    return(
        <div  className='content1'>
        <Sidebar/>
        <div className='content'>
        <h2>User Details</h2>
        <Button className='cntBtn' onClick={()=>{navigate("/user/create")}}> create New user</Button>
        <div style={{ position: "absolute", top: 100 , left: 300, width:"1000px","backgroundColor":"#F8F8F8", }}>
        <DataTable
            columns={columns}   
            data={data}
            pagination={true}
            theme="dark" 
            progressPending={false}
            fixedHeaderScrollHeight="300px"
            highlightOnHover={true}
            
        />  
        </div>
        </div>
        </div>
    )

}

export default User