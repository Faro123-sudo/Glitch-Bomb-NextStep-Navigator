import { useState } from 'react'
import LandPage from './pages/landingPage.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LandPage></LandPage>
    </>
  )
}

export default App
