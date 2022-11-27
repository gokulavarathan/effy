import React,{useEffect,useState} from "react"
import { useNavigate,useParams } from "react-router-dom";
 import {fetchUsrCd,addUsrcb,rmvUsrCb} from '../../../redux/api'
import { useDispatch} from 'react-redux'
import Select from "react-select";
import Sidebar from "../../common/sidebar/sidebar"
import { toast } from 'react-toastify';
import {Form,Button,Col,Row} from 'react-bootstrap';
import "./css/addUser.css"
const Add=()=>{
    let { id,type } = useParams();
    

    const dispatch = useDispatch()
    const [Options, setOptions] = useState([]);
    const [uniqueId, setUniqueId] = useState("");
    let navigate = useNavigate();
    useEffect(()=>{
        dispatch(
            fetchUsrCd({}, (res) => {
                
                var selectData=[]
                for(var i=0; i<res.data.length; i++){
                    var obj={}
                    obj["value"]=res.data[i]._id;
                    obj["label"]=res.data[i].firstName;
                    selectData.push(obj)
                    if(i+1 == res.data.length){
                        setOptions(selectData)
                        
                    }
                }
                
            })
                );
    },[])

const handleChange=(e)=>{
setUniqueId(e.value)
}
const addusr = async()=>{
    if(uniqueId == ""){
toast.error("Please select user to add")
    }else{
        var data={ "userId": uniqueId }
        await dispatch( addUsrcb(data,id, (resp) => {
            if(resp.status){
                toast.info("User Added Successfully")
                navigate("/company")
            }else{
                toast.error(resp.msg)
            }
        }))
    }
    
}

const removeusr=async()=>{

    if(uniqueId == ""){
        toast.error("Please select user to remove")
            }else{
                var data={ "userId": uniqueId }
                await dispatch(
                    rmvUsrCb(id,data, (res) => {
                        if(res.status){
                            toast.info(res.msg);
                            navigate("/company")
            
                        }else{
                            toast.error(res.msg)
                        }                    
                    })
                )
            }

    
            

}

    return(
        <>
        <Sidebar/>
        <Form>
<Form.Group className="dynamicmb" controlId="formBasicEmail">
        <Form.Label>Select user</Form.Label>
        <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={Options[0]}
        isDisabled={false}
        isLoading={false}
        isClearable={true}
        isRtl={false}
        isSearchable={true}
        name="user Details"
        options={Options}
        onChange={handleChange}
    />        </Form.Group>
        </Form>
        
    
    <Button variant="primary" className="dynamicBtn" type="submit" onClick={ ()=>{type == "adduser" ? addusr() : removeusr()}}>
        Submit
    </Button> 
        
        
    </>
    )
}

export default Add