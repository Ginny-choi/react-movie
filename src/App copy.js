
import { useEffect, useState} from 'react';



// function App() {
//   const [toDo, setTodo] = useState("");
//   const [toDos, setToDos] = useState([]);
//   const onChange = (event) => setTodo(event.target.value); 
//   const onSubmit = (event) => {
//    event.preventDefault();
//    if(toDo === ""){
//      return;
//    }
//    setTodo("");
//    setToDos((currentArray) => [toDo, ...currentArray]);
//    console.log(toDos);
//  };
//  const deleteList = (idx) => {
//    setToDos((currentToDos) => currentToDos.filter((_,curIndex) => curIndex !==idx))
//  }

//   return (
//     <div>
//     <h1>My To Dos ({toDos.length})</h1>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} type="text" placeholder="Write your to do..."></input>
//         <button>Add to do</button>
//       </form>
//       <hr/>
//       <ul>
//         {toDos.map((item ,idx) => 
//         <li key={idx}>
//         {item}
//         <button onClick={() => deleteList(idx)}>x</button>
//         </li>
//         )}
//       </ul>
//     </div>
//   );
// }

function App(){
  const [loading, setLoading] = useState(true);
  const [coins, setConins] = useState([]) //비어있는 배열을 두어서 최소한 Undefined 를 방지
  const [value , setValue] = useState("");
  const [money , getMoney] = useState(0);
  const [symbol, getSymbol] = useState('');
  const onChange = (event) => setValue(event.target.value);
  const onSelect = (event) => {
    getMoney(event.target.value);
    getSymbol(event.target.options[event.target.selectedIndex].dataset.symbol)
  }
  useEffect(() => { //한번만 실행
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then(response => response.json())
    .then(json => {
      setConins(json);
      setLoading(false);
    });
  }, []) //지켜보는 놈이 없어섷 한번만 실행
  return(
    <div>
      <h1>The Coin! {loading? null : `(${coins.length})`} </h1>
      {loading? <strong>Loading....</strong> : 
      <div>
      <input 
      type="number"
      value={value}
      onChange={onChange}
      placeholder="enter your money"></input> USD
      <select onChange ={onSelect}>
        {coins.map((coin) => 
        <option 
        value={coin.quotes.USD.price} 
        data-symbol={coin.symbol}>
        {coin.name} ({coin.symbol})</option>
        )}
      </select>
     
      <div>
        you wil get ... {value >0 ? `${money / value} ${symbol}` : null }
      </div>
      
      
      </div>}
      
    </div>
  )
}

export default App;
