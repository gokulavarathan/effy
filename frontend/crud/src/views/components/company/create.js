import React from 'react'
import { useDispatch} from 'react-redux'
import Sidebar from "../../common/sidebar/sidebar"
import {Form,Button, Container} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {comCreatecb,getLatLon} from '../../../redux/api'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const Create =()=>{
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset, trigger, } = useForm();
    let navigate = useNavigate();
const createFn = async(data) => {


    await dispatch( getLatLon(data, (resp) => {
        if(resp.status == "ZERO_RESULTS"){
            toast.error("Please use proper address.Unable to fetch the location using google api.")
        }else{
        var latitude =resp.results[0].geometry.location.lat
        var longitude =resp.results[0].geometry.location.lng

        data["lat"] = latitude;
        data["lan"] = longitude;



dispatch( comCreatecb(data, (resp) => { 
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
        <h2 style={{paddingTop:"15px"}}>Create New Company</h2>
        <Container style={{ position: "absolute", top: 100 , left: 300, width:"1000px",}}>
        <Form onSubmit={handleSubmit(createFn, onError)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Company Name</Form.Label>
        <Form.Control type="text" placeholder="Enter company name" 
        {...register("companyName", { required: "CompanyName is required" })}
        />
        {errors.companyName && (
            <small style={{ color: "red" }}> {errors.companyName.message} </small>
        )}
        </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Company Address</Form.Label>
        <Form.Control type="text" placeholder="Enter Company Address"
        {...register("companyAddress", { required: "CompanyAddress is required" })}
        />
        
        {errors.companyAddress && (
            <small style={{ color: "red" }}> {errors.companyAddress.message} </small>
        )}
        <br></br>
        <Form.Control type="text" placeholder="Enter City Name"
        {...register("cityName", { required: "cityName is required" })}
        />
        
        {errors.cityName && (
            <small style={{ color: "red" }}> {errors.cityName.message} </small>
        )}
        <br></br>
        <Form.Control type="number" placeholder="Enter ZIP/Postal code"
        {...register("postalCode", { required: "postalCode is required" })}
        />
        
        {errors.postalCode && (
            <small style={{ color: "red" }}> {errors.postalCode.message} </small>
        )}
        <br></br>
        <Form.Control type="text" placeholder="Enter Country Name"
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


export default Create