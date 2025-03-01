import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Register from './Components/Register'
import Header from './Components/Header'
import './App.css'
import { ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
      <Router>
        <div className="container">
          <Header/>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  )
}

export default App
