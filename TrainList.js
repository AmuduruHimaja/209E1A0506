// TrainList.js
import React from 'react';
import { Link } from 'react-router-dom';

const TrainList = ({ trains }) => {
  return (
    <div>
      <h1>All Trains</h1>
      <ul>
        {trains.map((train) => (
          <li key={train.id}>
            <Link to={`/train/${train.id}`}>
              {train.name} - Price: {train.price} - Tickets: {train.tickets}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;
