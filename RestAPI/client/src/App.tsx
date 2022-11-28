

import {BrowserRouter as Router, Routes, Route,Outlet} from 'react-router-dom'
import './App.css'
import ListCars from './List'
import Car from './Car'
import {FaCar } from  'react-icons/fa'



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ListCars/>} /> 
            <Route path="car" element={<Car/>} /> 
          </Route>
        </Routes>
      </Router>
      
    </div>
  )
}


function Layout() {
  return (
    <div>
      <span style={{fontSize:'2em', fontWeight:'bold'}}>Cars</span><FaCar style={{float:'right',fontSize:'25px'}}/>
      <hr/>
        <Outlet />
    </div>
    )
  }

export default App
