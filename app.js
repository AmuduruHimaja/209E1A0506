// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';


import TrainList from './components/TrainList';
import TrainDetails from './components/TrainDetails';

// Rest of the code...
const API_BASE_URL = 'https://api.johndoerailways.com';

function App() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trains`);
      const filteredTrains = filterTrains(response.data);
      setTrains(filteredTrains);
    } catch (error) {
      console.error('Error fetching trains:', error);
    }
  };

  const filterTrains = (trainData) => {
    const now = new Date();
    const filteredTrains = trainData.filter((train) => {
      const departureTime = new Date(train.departureTime);
      const minutesDiff = (departureTime - now) / (1000 * 60);
      return minutesDiff > 30;
    });
    return filteredTrains.sort((a, b) => {
      // Sort by ascending price, descending tickets, and descending departure time
      if (a.price !== b.price) {
        return a.price - b.price;
      }
      if (a.tickets !== b.tickets) {
        return b.tickets - a.tickets;
      }
      const departureTimeA = new Date(a.departureTime);
      const departureTimeB = new Date(b.departureTime);
      return departureTimeB - departureTimeA;
    });
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">All Trains</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/train/:id">
            <TrainDetails />
          </Route>
          <Route path="/">
            <TrainList trains={trains} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
