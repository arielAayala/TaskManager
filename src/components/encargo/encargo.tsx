import React from "react";
import { Encargo } from "./encargo.models";
import style from "./encargo.module.css"

function Encargo(props:Encargo) {

    const handleClick=()=>{
        console.log();
        
    }

	return (
        <div className={style.container} onClick={handleClick}>
            <h4> {props.descripcionEncargo} </h4>
            <h4> {props.idUsuarioCreador} </h4>
            <h4> {props.idEncargo} </h4>
        </div>
    )
}

export default Encargo;
