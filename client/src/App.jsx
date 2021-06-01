import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Routes/Home';
import UpdatePage from './Routes/UpdatePage';
import RestaurantDetailPage from './Routes/RestaurantDetailPage';
import { RestaurantContextProvider } from './Context/RestaurantContext';

const App = () => {
    return(
        <RestaurantContextProvider>
        <div className='container'>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/restaurants/:id/update" component={UpdatePage}/>
                    <Route exact path="/restaurants/:id" component={RestaurantDetailPage}/>
                </Switch>
            </Router>
        </div>
        </RestaurantContextProvider>
    )
}

export default App;