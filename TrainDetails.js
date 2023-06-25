// TrainDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://api.johndoerailways.com';

const TrainDetails = () => {
  const { id } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    fetchTrainDetails();
  }, []);

  const fetchTrainDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/train/${id}`);
      setTrain(response.data);
    } catch (error) {
      console.error('Error fetching train details:', error);
    }
  };

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Train Details</h1>
      <p>Name: {train.name}</p>
      <p>Price: {train.price}</p>
      <p>Tickets: {train.tickets}</p>
      <p>Departure Time: {train.departureTime}</p>
      {/* Add additional train details here */}
    </div>
  );
};

export default TrainDetails;
