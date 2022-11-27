import React from 'react'
import { useDispatch} from 'react-redux'
import Sidebar from "../../common/sidebar/sidebar"
import {Form,Button, Container} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {userCreatecb} from '../../../redux/api'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const UserCreate =()=>{
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset, trigger, } = useForm();
    let navigate = useNavigate();

const createFn = async(data) => {
    
dispatch( userCreatecb(data, (resp) => { 
        if(resp.status){
            reset();
            toast.success(resp.msg)
            navigate("/user")
        }else{
            toast.error(resp.message)
        }
        }));
};

const onError = (data) => {
};
    return(
        <>
        <Sidebar/>
        <div className='content'>
        <h2 style={{paddingTop:"15px"}}>Create New User</h2>
        <Container style={{ position: "absolute", top: 100 , left: 300, width:"1000px",}}>
        <Form onSubmit={handleSubmit(createFn, onError)}>

    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter first name" 
        {...register("firstName", { required: "FirstName is required" })}
        />
        {errors.firstName && (
            <small style={{ color: "red" }}> {errors.firstName.message} </small>
        )}
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter last name"
        {...register("lastName", { required: "lastName is required" })}
        />
        
        {errors.lastName && (
            <small style={{ color: "red" }}> {errors.lastName.message} </small>
        )}
        
        
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Email Id</Form.Label>
        <Form.Control type="email" placeholder="Enter email id"
        {...register("emailId", { required: "EmailId is required" })}
        />
        
        {errors.emailId && (
            <small style={{ color: "red" }}> {errors.emailId.message} </small>
        )}
        
        
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Designation</Form.Label>
        <Form.Control type="text" placeholder="Enter user designation"
        {...register("designation", { required: "Designation is required" })}
        />
        {errors.designation && (
            <small style={{ color: "red" }}> {errors.designation.message} </small>
        )}
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Date of Birth </Form.Label>
        <Form.Control type="date"  min="1980-05-15" max="2022-05-15"
        {...register("dob", { required: "dob is required" })}
        />
        {errors.dob && (
            <small style={{ color: "red" }}> {errors.dob.message} </small>
        )}
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


export default UserCreate