import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useStorage from './useStorage'
import './List.css'
import useDebounce from './useDebounce'


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
  const [search, setSearch] = useStorage('search','');
  const searchDebounced = useDebounce(search,500);
  
  const [cars, setCars] = useState([]);

  useEffect(()=>{
    async function requestData (){
      const res  = await fetch(`http://localhost:8080/api/cars?q=${search}`);
      const data = await res.json();
      setCars(data);
    }
    requestData();
  },[searchDebounced]);

  return (
    <div className="App">
      <div>
          <div style={{display:'flex',justifyContent:'right', margin: '20px 0' }}>
            <label style={{padding:'10px'}}>Search</label>
            <input value={search} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setSearch(e.target.value ?? '' )}} />
          </div>
        <table className='list'>
          <thead><tr><th>Name</th><th>Origin</th><th>Year</th></tr></thead>
          <tbody>
          {
            cars.map((car: Car) => {
              return (<tr key={car.Id}><td><Link to='car' state={{ carId: car.Id}} >{car.Name}</Link></td><td>{car.Origin}</td><td>{car.Year.substring(0,4)}</td></tr>)
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListCars
