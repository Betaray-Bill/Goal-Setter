import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../Components/Spinner'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <>
      <section className='heading'>
        <h1>Welcome</h1>
        <p>Goals Dashboard</p>
      </section>
      <section className='content'>
        
      </section>
    </>
  )
}

export default Dashboard