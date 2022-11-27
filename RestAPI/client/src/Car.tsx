
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState, MouseEvent, useCallback } from "react";

type  CarData = {
    "Id": number,
    "Name":string,
    "Miles_per_Gallon":number,
    "Cylinders":number,
    "Displacement":number,
    "Horsepower":number,
    "Weight_in_lbs":number,
    "Acceleration":number,
    "Year":string,
    "Origin":string
  }
  
const InitialRec :CarData = {
    "Id": 0,
    "Name":"",
    "Miles_per_Gallon":0,
    "Cylinders":0,
    "Displacement":0,
    "Horsepower":0,
    "Weight_in_lbs":0,
    "Acceleration":0,
    "Year":"",
    "Origin":""
} 

export default function Car() {

    const location = useLocation()
    const { carId } = location.state;
    const [carData, setCarData] = useState<CarData>(InitialRec);

    const navigate = useNavigate();

    async function requestData (){
        const res  = await fetch(`http://localhost:8080/api/cars/${carId}`);
        const data = await res.json();
        if(data.length >0){
            setCarData(data[0]);
        }
    }
    
    useEffect(()=>{
        requestData();
    },[]);

    function handleSave(e: MouseEvent<HTMLButtonElement>  ){
        e.preventDefault;
        alert('Functionality not implemented!')
    }

    function handleRemove(e: MouseEvent<HTMLButtonElement>  ){
        e.preventDefault;
        if (confirm('Do you want to remove this record?')){
            alert("Functionality not implemented... but I'll take you home...");
            navigate('/');
            
        }
    }

    return (
        <div className="CarInfo">
            <Link to='/'>Home</Link>
            <h3>Car Information - {carId}</h3> 
            <table>
                <thead>
                    <tr><th>Property</th><th>Value</th> </tr>
                </thead>
                <tbody>
                    <tr><td>Name</td><td>{carData.Name!}</td></tr>
                    <tr><td>Origin</td><td>{carData.Origin!}</td></tr>
                    <tr><td>Year</td><td>{carData.Year!}</td></tr>
                    <tr><td>Displacement</td><td>{carData.Displacement!}</td></tr>
                    <tr><td>Weight (lbs)</td><td>{carData.Weight_in_lbs!}</td></tr>
                    <tr><td>Cylinders</td><td>{carData.Cylinders!}</td></tr>
                    <tr><td>MPG</td><td>{carData.Miles_per_Gallon!}</td></tr>
                    <tr><td>Cylinders</td><td>{carData.Cylinders!}</td></tr>
                    <tr><td>Horsepower</td><td>{carData.Horsepower!}</td></tr>
                </tbody>
            </table>
            <div className="buttons-div">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleRemove}>Remove</button>
            </div>
        </div>
    )
}

function handleSave(e: any, MouseEvent: { new(type: string, eventInitDict?: MouseEventInit | undefined): MouseEvent; prototype: MouseEvent; }) {
    throw new Error("Function not implemented.");
}
