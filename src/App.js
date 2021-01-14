import './App.css';
import React, { useState } from 'react'
import Select from 'react-select'
import { itemsMeta } from './utils/poeninja'
import ItemDetails from './views/ItemDetails'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LazyLoad from 'react-lazyload';
const leagues = [
  { value: 'Standard', label: 'Standard' },
  { value: 'Heist', label: 'Heist' },
]

const DEFAULT_LEAGUE = 'Standard'
function App() {


  const [chosenLeague, setChosenLeague] = useState(DEFAULT_LEAGUE)

  return (
    <div className="App container mx-auto">
      <h1>POE Flip</h1>
      <Select
        options={leagues}
        onChange={(choice) => setChosenLeague(choice.value)}
        defaultValue={leagues[0]}
        />
      <hr />
      <Router>
      <div>

      <div className="menu-items my-4 flex">
        {Object.entries(itemsMeta).map(([k, value]) => {
          return (
            <Link to={value.disabled ? '#' : `/${chosenLeague}/${value.id}`} className="link" key={k}>

              <LazyLoad width={48} height={48}>
                <img class="w-auto h-12" src={value.icon} alt={value.id}/>
              </LazyLoad>
            </Link>
          )
        })}
      </div>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/:league/:item">
            <ItemDetails />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
