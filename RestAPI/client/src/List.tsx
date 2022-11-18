import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './List.css'


type  Car = {
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




function ListCars() {
  const [search, setSearch] = useState('');
  const [cars, setCars] = useState([]);

  useEffect(()=>{
    async function requestData (){
      const res  = await fetch(`http://localhost:8080/api/cars?q=${search}`);
      const data = await res.json();
      setCars(data);
    }
    requestData();
  },[search]);

  return (
    <div className="App">
      <div>
        <label style={{padding:'10px'}}>Search</label>
        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setSearch(e.target.value ?? '' )}} />
        <table>
          <thead><tr><th>Name</th><th>Origin</th><th>Year</th><th>Actions</th></tr></thead>
          <tbody>
          {
            cars.map((car: Car) => {
              return (<tr key={car.Id}><td><Link to='car' state={{ carId: car.Id}} >{car.Name}</Link></td><td>{car.Origin}</td><td>{car.Year.substring(0,4)}</td><td></td></tr>)
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListCars
