import React,{useEffect, useState} from 'react'
import { useDispatch} from 'react-redux'
import Sidebar from "../../common/sidebar/sidebar"
import {Form,Button, Container} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {fetchSingleComDtl,comUpdatecb,getLatLon} from '../../../redux/api'
import { useNavigate,useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Map from './map'
const View =()=>{

const [companyData,setCompanyData]=useState([])
const [location,setLocation]=useState({})


    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    let navigate = useNavigate();
    let { id } = useParams();
useEffect(()=>{
    
    dispatch(
        fetchSingleComDtl(id, (res) => {
                setCompanyData(res.data[0])
                localStorage.clear()
                var val={
                    langitude:res.data[0].lan,
                    lattitude:res.data[0].lat
                }
                setLocation(val)
                localStorage.setItem("langitude",res.data[0].lan)
                localStorage.setItem("lattitude",res.data[0].lat);
                
        })
            );
},[])



    return(
        <>
        <Sidebar/>
        <div className='content'>
        <h2 style={{paddingTop:"15px"}}>View Company Details </h2>
        <Container style={{ position: "absolute", top: 100 , left: 300, width:"1000px",}}>
        <Form >
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Company Name</Form.Label>
        <Form.Control type="text" placeholder={companyData.companyName} readOnly/>
        </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Company Address</Form.Label>
        <Form.Control type="text" placeholder={companyData.companyAddress} readOnly/>
        <br></br>
        <Form.Control type="text" placeholder={companyData.cityName} readOnly/>
        <br></br>
        <Form.Control type="number" placeholder={companyData.postalCode} readOnly/>
        <br></br>
        <Form.Control type="text" placeholder={companyData.countryName}  readOnly/>
    </Form.Group>

    </Form>
    <h2>Company Location</h2>
    <br></br>
            <Map  location={location}/>
        </Container>
        </div>

        
        
        
        </>
    )
}


export default View