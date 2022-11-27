import React from 'react';
import { Sidebardata } from './sidebarData';
import { useNavigate } from "react-router-dom";
import "./css/sidebar.css"
const Sidebar=()=>{
    const navigate = useNavigate();

    return(
        <div className='sidebar_menu'>
        <ul className='sidebarList'>
        {Sidebardata.map((val,key)=>{
            
            return(
                <li key={val.title} onClick={()=>{navigate(val.link)}} className='row'>
                {""}
                <div className='icon'> {val.icon}</div>
                {''}
                <div className='title'><h6>{val.title}</h6></div>
            </li>
            )
        })}
        </ul>
        </div>
    )
}

export default Sidebar