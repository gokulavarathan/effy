import React,{useEffect, useState} from 'react';
import Sidebar from "../../common/sidebar/sidebar"
import './css/company.css'
import { Button} from 'react-bootstrap';
import DataTable,{createTheme,Export } from 'react-data-table-component';
import EditIcon from '@mui/icons-material/DriveFileRenameOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {fetchComCd,delComCb,rmvUsrCb} from "../../../redux/api"
import {useDispatch} from 'react-redux'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const Company=()=>{
    let navigate = useNavigate();
    
    const dispatch = useDispatch()
    const [data,setData]=useState()
    const [flag,setFlag]=useState(true)
    
    useEffect(()=>{
        dispatch(
            fetchComCd({}, (res) => {
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
                width: "100px",
                cell: (row, index) => index + 1,
                },
                {
                name: "Company Name",
                width: "150px",
                selector: "companyName",
                sortable: true,
                },
                {
                name: "Company Address",
                selector: "companyAddress",
                width: "250px",
                sortable: true, 
                },{
                    name: "View details",
                    selector: "",
                    width: "120px",
                    sortable: true,
                    cell: (row) => (
                        <div data-tag="allowRowEvents"  className="hover" onClick={()=>{navigate('/company/view/'+ row._id)}}>
                        <RemoveRedEyeIcon/>
                        </div>
                        ),
                    },
                {
                name: "Update details",
                selector: "",
                sortable: true,
                width: "150px",
                cell: (row) => (
                    <div data-tag="allowRowEvents"  className="hover" onClick={()=>{navigate('/company/update/'+ row._id)}}>
                    <EditIcon/>
                    </div>
                    ),
                },{
                    name: "Delete forever",
                    selector: "",
                    sortable: true,
                    width: "150px",
                    cell: (row) => (
                        <div data-tag="allowRowEvents"  className="hover" onClick={()=>{deleteFun(row._id)}}>
                        <DeleteForeverIcon/>
                        </div>
                        ),
                    },{
                        name: "createdAt",
                        selector: "createdAt",
                        sortable: true,
                        width: "150px", 
                    },
                {
                name: "Add user",
                width: "120px",
                cell: (row) => (
                    <button className="btn btn-primary btn-sm" id={row.ID} onClick={()=>{navigate('/company/adduser/'+ row._id)}}>
                    Add user
                    </button>
                    ),
                },
                { 
                    name: "Remove user",
                    width: "150px",
                    cell: (row) => (
                        <button className="btn btn-primary btn-sm" id={row.ID} onClick={()=>{navigate('/company/removeuser/'+ row._id)}} >
                        Remove user
                        </button>
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
        delComCb(e, (res) => {
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
        <h2>Company Details</h2>
        <Button className='cntBtn' onClick={()=>{navigate("/company/create")}}> create New company</Button>
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

export default Company