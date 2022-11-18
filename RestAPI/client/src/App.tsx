

import {BrowserRouter as Router, Routes, Route,Outlet} from 'react-router-dom'
import './App.css'
import ListCars from './List'
import Car from './Car'



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
      <h1>Cars</h1>
      <hr/>
        <Outlet />
    </div>
    )
  }

export default App
