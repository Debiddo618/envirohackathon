import { useState } from 'react'
import Notification from './components/Notification/Notification'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Notification/>
    </>
  )
}

export default App
