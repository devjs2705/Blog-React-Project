import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { login, logout } from './store/features/authSlice'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import authService from './server/auth'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(
    () => {
      authService.getCurrentUser()
      .then((userData)=>{
        if(userData)
        {
          dispatch(login({userData}))
        }
        else
        {
          dispatch(logout())
        }
      })
      .finally(() => {
        setLoading(false)
      })
    },
    []
  )


  return !loading ?
  <>
    <Header />
    <main>
      <Outlet></Outlet>
    </main>
    <Footer />
  </>
  : null
}

export default App
