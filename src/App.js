import React  from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './Component/Auth'
import AdminPage from './Component/AdminPage'
import SuperAdminPage from './Component/SuperAdminPage'
export default function App() {

  return (  
    <div>
      <Routes>
        <Route path='/' element={<Auth />}/>
        <Route path='admin' element={<AdminPage />}/>
        <Route path='super_admin' element={<SuperAdminPage />}/>
      </Routes>
    </div>
  )
}

