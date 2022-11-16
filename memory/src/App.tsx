import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  type card ={
    value : number,
    revealed: boolean,
    found : boolean | undefined,
    color : string 
  }

  const [cards, setCards] = useState<Array<card>>([]);

  const [prevCard, setPrevCard] = useState<card | undefined>();

  function initCards(){
    setCards([
      {value:1,revealed: false, found :false, color: 'grey'},
      {value:3,revealed: false, found :false, color: 'grey'},
      {value:5,revealed: false, found :false, color: 'grey'},
      {value:5,revealed: false, found :false, color: 'grey'},
      {value:3,revealed: false, found :false, color: 'grey'},
      {value:2,revealed: false, found :false, color: 'grey'},
      {value:4,revealed: false, found :false, color: 'grey'},
      {value:1,revealed: false, found :false, color: 'grey'},
      {value:6,revealed: false, found :false, color: 'grey'},
      {value:2,revealed: false, found :false, color: 'grey'},
      {value:4,revealed: false, found :false, color: 'grey'},
      {value:6,revealed: false, found :false, color: 'grey'},
    ])
  }

  useEffect(()=>{
    initCards()
  },[]);

  const handleClick  = (index:number)=> {
    console.log('clicked',index);
    const currCards = [...cards];
    const currCard = currCards[index];
    if (currCard.found){
      return;
    }
  
    if (!prevCard){// no card currently selected

      currCard.revealed = true;
      setCards(currCards);
      setPrevCard(currCard);
    }
    else {
      if (prevCard.value === currCard.value ){
        prevCard.found = true;
        currCard.revealed = true;
        currCard.found = true;
        currCard.color = 'green';
        prevCard.color = 'green';
        setCards(currCards);
        setPrevCard(undefined);

        if (currCards.filter((item:card)=> {return item.found === false}).length === 0 ){
          setTimeout(()=>{
            alert('Congrats!!!');
            initCards()

          });

        }
      }
      else {
        currCard.color = 'red';
        prevCard.color = 'red';
        currCard.revealed = true;
        setCards(currCards);
        setTimeout(()=>{

          currCard.color = 'grey';
          prevCard.color = 'grey';
          prevCard.revealed = false;
          currCard.revealed = false;
          setCards(currCards);
          setPrevCard(undefined);
        },1000)
      }
    }
  }

  return (
    <div className="App">
     <h1>Cards</h1>
      <div className="deck">
        {
          cards.map(function (item:card, index:number) {
            return <div style={{borderColor:item.color, color:item.color}} className="card" key={index} onClick={() =>{handleClick(index)}} >{(item.revealed?item.value:'?')}</div>
          })
        }
      </div>

    </div>
  )
}

export default App
