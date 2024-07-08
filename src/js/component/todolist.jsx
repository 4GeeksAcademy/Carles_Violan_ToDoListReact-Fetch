import { element, func } from 'prop-types';
import React, { useEffect, useState } from 'react';



const ToDoList = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState('');
  const [followers, setfollowers]= useState(0);

  const [characters, setCharacters] = useState([]);
  


//funcion nueva followers
function handleFollowClick(){
  setfollowers(followers +1);
}

//funcion Fetch
function getCharacters(){

  const protocolo = "https";
  const baseURI = "rickandmortyapi.com"
  const ruta = "/api/character"
  const method = "GET"
  const URI = `${protocolo}://${baseURI}${ruta}`
  const opciones = { 
    method,
      // body: {nombre:"Carles_V"}, 
      //  headers: {
      //  "Content-Type": "application/json"}
     }
     

  const promesasPersonajes = fetch(URI , opciones);

  promesasPersonajes
    .then((response) => {
      console.log("----response: ", response);
    return response.json();
   
    })
    .then((data) => {
      console.log("----data: ", data);    
      //return data.results;  
      return data; 
    })
    .catch((error) => {
        console.log("---Oh no! There was a problem: \n",error);
      })

  };

//cogemos el valor del del current item
  const handleInput = e => {
    setCurrentItem(e.target.value);
  };

  const addItem = e => {
    if (e.key === 'Enter' && currentItem !== '') {
//spread operator ...
      setItems([...items, currentItem]);
      setCurrentItem('');
      console.log(items);
    };

  };

  function eliminarElemento(value){
    const result = items.filter((element,index) => index !== value);
    //setItems(result);
  }

  let numberItems = items.length;

  //let characters= [];
//funcion que se ejecuta cuando cargue la página
    useEffect(() => {
      getCharacters(() => {
        //let datos = getCharacters();
        console.log("------characters; ", data);          
        setCharacters(data);
        //characters = data;
      });
    

    }, []);
  
    
  return (
    <div>
      <div className='container'>
        <h1 className='title'>ToDoList</h1>     
          <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">Items</span>
              <input type="text"  value={currentItem} onChange={handleInput} onKeyPress={addItem} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
          </div>      
      <ul className="list-group">
        {items.map((item, index) => (                             
             <li key={index} className="list-group-item">{item}<span className="badge" onClick={() => eliminarElemento(index)}>X</span></li>
        ))}
      </ul>
      <div className='countItems'>{numberItems}   item left</div><br></br>
      <button type='button' className='btn btn-primary' onClick={handleFollowClick}>followers</button>
      <div>{followers}</div>          
      <div className='container text-center mt-5' >
      <div className='row'>
            {characters.map((character, index) => {
                <div key={index} className="col-4 p-2">
                  <div className='p-3 bg-info border border-secondary'>
                    {character.name}
                  </div>
            
                </div>
              }) 
            }
              
      </div>
         </div>
    </div>
    </div>
  )
    
  };

    
export default ToDoList;