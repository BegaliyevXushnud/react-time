import { useState } from 'react'
import './App.css'
import Stopwatch from './component/stopwatch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
<Stopwatch></Stopwatch>
    </div>
  )
}

export default App
