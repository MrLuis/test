
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
    // CarData might not be a good implementation, since React will do a shallow compare... might need to split all fields into it's own state...
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

    async function handleSave(e: MouseEvent<HTMLButtonElement>  ){
        e.preventDefault;

        const res  = await fetch(`http://localhost:8080/api/cars`,
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(carData)
        })
        .then(function(res1){ return res1.json()})
        .catch(function(res2){ console.error(res2) })
        

        console.log(res);
        if (res.error !== ''){
            alert(`Error updating record: ${res.error} `)
        }
        else {
            alert('Record saved!');
            navigate('/');
        }
    }

    async function handleRemove(e: MouseEvent<HTMLButtonElement>  ){
        e.preventDefault;
        if (confirm('Do you want to remove this record?')){
           
            const res  = await fetch(`http://localhost:8080/api/cars/${carData.Id}`,
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method: "DELETE"
            })
            .then(function(res1){ return res1.json()})
            .catch(function(res2){ console.error(res2) })
            

            console.log(res);
            if (res.error !== ''){
                alert(`Error removing record: ${res.error} `)
            }
            else {
                alert('Record removed!');
                navigate('/');
            }
            
        }
    }

    function onFieldChange(event : React.ChangeEvent<HTMLInputElement>){
        // to support named field in typescript...
        interface IIndexable {
            [key: string]: any;
          }
        const fld = event.target.getAttribute('data-fld')
        const newData = {...carData} as IIndexable;
        newData[fld!] = event.target.value;
        setCarData(newData as CarData);
    }

    return (
        <div className="CarInfo">
            <Link to='/'>Home</Link>
            <h3>Car Information - {carId}</h3> 
            <table>
                <thead>
                    <tr><th>Property</th><th>Value</th></tr>
                </thead>
                <tbody>
                    <tr><td>Name</td><td><input onChange={onFieldChange} value={carData.Name!} data-fld="Name" /></td></tr>
                    <tr><td>Origin</td><td><input onChange={onFieldChange} value={carData.Origin!} data-fld="Origin"/></td></tr>
                    <tr><td>Year</td><td><input onChange={onFieldChange} value={carData.Year!} data-fld="Year"/></td></tr>
                    <tr><td>Displacement</td><td><input onChange={onFieldChange} value={carData.Displacement!} data-fld="Displacement"/></td></tr>
                    <tr><td>Weight (lbs)</td><td><input onChange={onFieldChange} value={carData.Weight_in_lbs!} data-fld="Weight_in_lbs"/></td></tr>
                    <tr><td>Cylinders</td><td><input onChange={onFieldChange} value={carData.Cylinders!} data-fld="Cylinders"/></td></tr>
                    <tr><td>MPG</td><td><input onChange={onFieldChange} value={carData.Miles_per_Gallon!} data-fld="Miles_per_Gallon"/></td></tr>
                    <tr><td>Cylinders</td><td><input onChange={onFieldChange} value={carData.Cylinders!} data-fld="Cylinders"/></td></tr>
                    <tr><td>Horsepower</td><td><input onChange={onFieldChange} value={carData.Horsepower!} data-fld="Horsepower"/></td></tr>
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
