import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Company from "./Components/Company/Company"
import Complex from "./Components/Complex/complex"
import Rooms from './Components/Rooms/Rooms';
import Bank from './Components/Bank/bank';
import Requests from './Components/Requests/Requests';
import Archive from './Components/Archive/Archive';

function App() {
  return (
    <>
      <div className='container'>
        <Home />
        <Switch>
          <Route path="/company" component={Company} />
          <Route path="/complex" component={Complex} />
          <Route path="/room" component={Rooms} />
          <Route path="/bank" component={Bank} />
          <Route path="/request" component={Requests} />
          <Route path="/archive" component={Archive} />
        </Switch>
      </div>
    </>
  );
}

export default App;
