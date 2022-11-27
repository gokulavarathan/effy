import React,{useEffect, useState} from 'react'
import { useDispatch} from 'react-redux'
import Sidebar from "../../common/sidebar/sidebar"
import {Form,Button, Container} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {fetchSingleComDtl,comUpdatecb,getLatLon} from '../../../redux/api'
import { useNavigate,useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const Update =()=>{

const [companyData,setCompanyData]=useState([])

    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    let navigate = useNavigate();
    let { id } = useParams();
useEffect(()=>{
    dispatch(
        fetchSingleComDtl(id, (res) => {
                setCompanyData(res.data[0])
        })
            );
},[id])


const updateFn = async(data) => {
    await dispatch( getLatLon(data, (resp) => {
        if(resp.status == "ZERO_RESULTS"){
            toast.error("Please use proper address.Unable to fetch the location using google api.")
        }else{
            var latitude =resp.results[0].geometry.location.lat
            var longitude =resp.results[0].geometry.location.lng
            data["lat"] = latitude;
            data["lan"] = longitude;
    
            dispatch( comUpdatecb(data,id, (resp) => { 
            if(resp.status){
                reset();
                toast.success(resp.msg)
                navigate("/company")
            }else{
                toast.error(resp.msg)
            }
    
            }));
        }
        
    }))

    
};

const onError = (data) => {
};
    return(
        <>
        <Sidebar/>
        <div className='content'>
        <h2 style={{paddingTop:"15px"}}>Update Company Details</h2>
        <Container style={{ position: "absolute", top: 100 , left: 300, width:"1000px",}}>
        <Form onSubmit={handleSubmit(updateFn, onError)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Company Name</Form.Label>
        <Form.Control type="text" placeholder={companyData.companyName} 
        {...register("companyName", { required: "CompanyName is required" })}
        />
        {errors.companyName && (
            <small style={{ color: "red" }}> {errors.companyName.message} </small>
        )}
        </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Company Address</Form.Label>
        <Form.Control type="text" placeholder={companyData.companyAddress}
        {...register("companyAddress", { required: "CompanyAddress is required" })}
        />
        
        {errors.companyAddress && (
            <small style={{ color: "red" }}> {errors.companyAddress.message} </small>
        )}
        <br></br>
        <Form.Control type="text" placeholder={companyData.cityName}
        {...register("cityName", { required: "cityName is required" })}
        />
        
        {errors.cityName && (
            <small style={{ color: "red" }}> {errors.cityName.message} </small>
        )}
        <br></br>
        <Form.Control type="number" placeholder={companyData.postalCode}
        {...register("postalCode", { required: "postalCode is required" })}
        />
        
        {errors.postalCode && (
            <small style={{ color: "red" }}> {errors.postalCode.message} </small>
        )}
        <br></br>
        <Form.Control type="text" placeholder={companyData.countryName}
        {...register("countryName", { required: "countryName is required" })}
        />
        {errors.countryName && (
            <small style={{ color: "red" }}> {errors.countryName.message} </small>
        )}
        
        <br></br>

    </Form.Group>

    <Button variant="primary" type="submit">
        Submit
    </Button>
    </Form>
        </Container>
        </div>
        </>
    )
}


export default Update