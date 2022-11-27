import React,{useEffect, useState} from 'react'
import { useDispatch} from 'react-redux'
import Sidebar from "../../common/sidebar/sidebar"
import {Form,Button, Container,Col,Row} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {fetchSingleUsrDtl,delUsrCb} from '../../../redux/api'
import { useNavigate,useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const View =()=>{

const [userData,setUserData]=useState([])
const [companyDetail,setCompanyDetail]=useState([])

    const dispatch = useDispatch()

    let { id } = useParams();

    useEffect(()=>{
    
    dispatch(
        fetchSingleUsrDtl(id, (res) => {
            setUserData(res.data[0])
            if(res.data.length == 2 ){
                setCompanyDetail(res.data[1])
            }
            
        })
            );
    },[])




    return(
        <>
        <Sidebar/>
        <div className='content'>
        <h2 style={{paddingTop:"15px"}}>View User Detail </h2>
        <Container style={{ position: "absolute", top: 100 , left: 300, width:"1000px",}}>
            <Form >
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder={userData.firstName} readOnly/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder={userData.lastName} readOnly/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Id</Form.Label>
        <Form.Control type="text" placeholder={userData.emailId} readOnly/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Designation</Form.Label>
        <Form.Control type="text" placeholder={userData.designation} readOnly/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control type="text" placeholder={userData.dob} readOnly/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Active Status</Form.Label>
        <Form.Control type="text" placeholder={userData.activeStatus ? "true" :"false"} readOnly/>
        </Form.Group>

        {companyDetail.length !=0 ? 
        <>
            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Company Name</Form.Label>
        <Form.Control type="text" placeholder={companyDetail.companyName } readOnly/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Company Address</Form.Label>
        <Form.Control type="text" placeholder={companyDetail.companyAddress } readOnly/>
        </Form.Group>
</>
        :
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User is available for open position.You can add this user in any company</Form.Label>
        </Form.Group>
        }
        </Form>
        </Container>
        </div>

        
        
        
        </>
    )
}


export default View