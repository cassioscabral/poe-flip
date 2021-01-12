import './App.css';
import poeNinjaApi from './api/poeninja'
import { itemTypes, poeNinjaURLBuilder } from './utils/poeninja'
import React, { useEffect, useState } from 'react'

function App() {
  console.log('itemTypes', itemTypes);
  const [items, setItems] = useState({})

  useEffect(() => {
    poeNinjaApi({
      method: 'GET',
      url: poeNinjaURLBuilder('Oil')
    }).then(res => {
      console.log('res', res);
      setItems({
        oil: {
          lines: res.data?.lines,
        }
      })
      return res
    })
  }, [])
  return (
    <div className="App">
      <h1>POE Flip</h1>
      <hr />
      <input type="number" name="oil.min" id="oil-min"/>
      <hr />
      <div className="items">
        {items.oil?.lines.map(i => {
          return (
            <div className="oil-item" style={{display: 'flex'}}>
              <div className="name" style={{marginRight: '10px'}}>{i.name}</div>
              <div className="variation">{i.sparkline.totalChange}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
