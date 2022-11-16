import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  type card ={
    value : number,
    revealed: boolean
  }

  const [cards, setCards] = useState<Array<card>>([]);


  function initCards(){
    setCards([
      {value:1,revealed: false},
      {value:3,revealed: false},
      {value:5,revealed: false},
      {value:2,revealed: false},
      {value:5,revealed: false},
      {value:3,revealed: false},
      {value:4,revealed: false},
      {value:1,revealed: false},
      {value:6,revealed: false},
      {value:2,revealed: false},
      {value:4,revealed: false},
      {value:6,revealed: false},
    ])
  }

  useEffect(()=>{
    initCards()
  },[]);

  const handleClick  = (index:number)=> {
    const curr = [...cards];
    curr[index].revealed = true;
    setCards(curr);
  }

  return (
    <div className="App">
     <h1>Cards</h1>
      <div className="deck">
        {
          cards.map(function (item:card, index:number) {
            return <div className="card" key={index} onClick={() =>{handleClick(index)}} >{(item.revealed?item.value:'?')}</div>
          })
        }
      </div>

    </div>
  )
}

export default App
