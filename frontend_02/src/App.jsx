import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const App = () => {
  const [jokes,setJokes] = useState([])
  useEffect(() =>{
    axios.get('/api/jokes')
    .then((res)=>{
      setJokes(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })  
  })

  return (
    <div>
      <h1>Jokes App</h1>
      <p>JOKES: {jokes.length} </p>
      {
        jokes.map((jokes,index) =>(
          <div key={jokes.id}>
            <h2>{jokes.title}</h2>
            <p>{jokes.joke}</p>
          </div>
        ))
      }
    </div>
  )
}

export default App
