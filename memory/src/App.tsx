import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  type TCard ={
    index : number,
    value : number,
    revealed: boolean,
    found : boolean | undefined,
    color : string 
  }

  const [wait, setWait] = useState(false); // control button click to ensure proper sequence
  const [correctCount,setCorrectCount]= useState(0);// count of correct pairs
  const [incorrectCount,setIncorrectCount]= useState(0); // count of incorrect pairs
  const [cards, setCards] = useState<Array<TCard>>([]);// array of cards
  const [prevCard, setPrevCard] = useState<TCard | undefined>();// previos card (to compare on next click)

  function initCards(){

    // return slot location on array
    function getSlot(max_val: number){
      let rnd = Math.trunc( Math.random() * (card_count-1));   
      if (rnd >= max_val){
        rnd = 0;
      }
      while (arr[rnd]){
        if (rnd >= max_val){
          rnd = 0;
        }
        else {
          ++rnd
        }
      }
      return rnd;
    }

    const card_count = 20;
    const arr : Array<TCard> = [];
    arr.length = card_count - 1;
    for (var i = 0; i < (card_count/2); i++){
      // first location
      arr[getSlot(card_count-1)] = {index:0, value:i+1,revealed: false, found :false, color: 'grey'}
      // second location
      arr[getSlot(card_count-1)] = {index:0, value:i+1,revealed: false, found :false, color: 'grey'}
    }

    arr.forEach((item,index)=>{item.index = index });

    setCards(arr);

/*  for later testing
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
    */
  }

  useEffect(()=>{
    initCards()
  },[]);

  const handleClick  = (index:number)=> {
    if (wait){
      return;
    }
    setWait(true);
    const currCards = [...cards];
    const currCard = currCards[index];
    if (currCard.found || currCard === prevCard){
      return;
    }

    if (!prevCard){// no card currently selected
      currCard.revealed = true;
      currCard.color = 'blue';
      setCards(currCards);
      setPrevCard(currCard);
      setWait(false);
    }
    else {
      if (prevCard.value === currCard.value ){
        prevCard.found = true;
        currCard.revealed = true;
        currCard.found = true;
        currCard.color = 'green';
        prevCard.color = 'green';
        setCorrectCount((xx)=>{return xx + 1});
        setCards(currCards);
        setPrevCard(undefined);

        if (currCards.filter((item:card)=> {return item.found === false}).length === 0 ){
          setTimeout(()=>{
            alert('Congrats!!!');
            initCards();
            setIncorrectCount(0);
            setCorrectCount(0);
            setWait(false);
          });
        }
        else {
          setWait(false);
        }
      }
      else {
        currCard.color = 'red';
        prevCard.color = 'red';
        currCard.revealed = true;
        setCards(currCards);
        setIncorrectCount(incorrectCount + 1);
        setTimeout(()=>{
          currCard.color = 'grey';
          prevCard.color = 'grey';
          prevCard.revealed = false;
          currCard.revealed = false;
          setCards(currCards);
          setPrevCard(undefined);
          setWait(false);
        },1000)
      }
    }
  }

  return (
    <div className="App">
     <h1>Cards</h1>
     <span className='counter correct_count'>Correct: {correctCount}</span>
     <span className='counter incorrect_count'>Incorrect: {incorrectCount}</span>
      <div className="deck">
        {
          cards.map(function (item:TCard, index:number) {
            return <div style={{borderColor:item.color, color:item.color}} className="card" key={index} onClick={() =>{handleClick(index)}} >{(item.revealed?item.value:'?')}</div>
          })
        }
      </div>

    </div>
  )
}

export default App
