import React from "react";
import { Encargo } from "./encargo.models";

function Encargo(props:Encargo) {
	return (
        <div>
            <h4 className="style.encargo"> {props.descripcionEncargo} </h4>
        </div>
    )
}

export default Encargo;
